import {
  MESH_API_LOGIN,
  MESH_API_LOGOUT,
  MESH_API_ABOUT_ME,
  getServerURL,
  MESH_API_USERS,
  RACE_RESULTS_DATA
} from "../utils/constants";
import { LoggingService } from "../utils/logging-service";
import Optional from "optional-js";
import { UserInfo, RacerProfile, RaceItem, RaceItemExt, RacerResults } from "../types/datatypes";
import { ITransport } from "./transport";
import * as Cookies from "js-cookie";
import { COOKIE_MESH_TOKEN } from "../utils/constants";
import { INITIAL_USER_INFO } from "../types/datatypes";
import { EventChannel, eventChannel } from "redux-saga";
import { RaceState } from "../types/races.model";

type CMSResponse = {
  success: boolean;
  body: any;
  rejectReason?: string;
};

type HeaderField = {
  name: string;
  value: string;
};

async function meshLogin(userName: string, userPassword: string): Promise<CMSResponse> {
  return executeQuery(MESH_API_LOGIN, "GET", [
    { name: "Authorization", value: "Basic " + btoa(`${userName}:${userPassword}`) }
  ]);
}

async function meshLogout(token: string): Promise<CMSResponse> {
  return executeQuery(MESH_API_LOGOUT, "GET", [
    { name: "Authorization", value: `Bearer ${token}` }
  ]);
}

async function meshAboutMe(token: string): Promise<CMSResponse> {
  return executeQuery(MESH_API_ABOUT_ME, "GET", [
    { name: "Authorization", value: `Bearer ${token}` }
  ]);
}

async function meshRegister(userInfo: UserInfo): Promise<CMSResponse> {
  return executeQuery(
    MESH_API_USERS,
    "POST",
    [{ name: "Content-Type", value: "application/json" }],
    {
      username: userInfo.email,
      password: userInfo.password,
      firstname: userInfo.name,
      emailAddress: userInfo.email
    }
  );
}

async function executeQuery(
  apiPath: string,
  method: string,
  headerFields: HeaderField[],
  body?: any
): Promise<CMSResponse> {
  const headers = new Headers();
  headerFields.forEach(field => headers.append(field.name, field.value));

  const request = new Request(getServerURL() + apiPath, {
    method: method,
    headers: headers,
    body: body ? JSON.stringify(body) : undefined
  });

  LoggingService.getInstance().info(
    `Sending request: ${JSON.stringify({
      url: request.url,
      method: request.method,
      headers: JSON.stringify(headerFields),
      body: JSON.stringify(body)
    })}`
  );

  const response: Response = await fetch(request);
  const jsonResponse = await response.json();

  LoggingService.getInstance().info(`Response received: ${JSON.stringify(jsonResponse)}`);

  return new Promise<CMSResponse>(resolve =>
    resolve({
      success: response.ok,
      body: jsonResponse
    })
  );
}

export class MeshApi implements ITransport {
  private channel: EventChannel<Optional<RacerResults[]>>;
  private eventSource: EventSource;

  constructor() {
    this.eventSource = new EventSource(getServerURL());
    this.channel = {
      take: () => {},
      flush: () => {},
      close: () => {}
    };
  }

  async login(userName: string, userPassword: string): Promise<any> {
    const res = await meshLogin(userName, userPassword);
    return new Promise<string>((resolve, reject) => {
      if (res.success) {
        Cookies.set(COOKIE_MESH_TOKEN, res.body.token);
        resolve();
      } else {
        Cookies.remove(COOKIE_MESH_TOKEN);
        reject(res.rejectReason);
      }
    });
  }

  async logout(): Promise<any> {
    const token = Cookies.get(COOKIE_MESH_TOKEN);
    if (token) {
      const res = await meshLogout(token);
      return new Promise<string>((resolve, reject) => {
        if (res.success) {
          Cookies.remove(COOKIE_MESH_TOKEN);
          resolve();
        } else {
          reject(res.rejectReason);
        }
      });
    } else {
      return new Promise<any>(resolve => resolve());
    }
  }

  async aboutMe(): Promise<Optional<UserInfo>> {
    const token = Cookies.get(COOKIE_MESH_TOKEN);
    if (token) {
      const res = await meshAboutMe(token);
      return new Promise<Optional<UserInfo>>((resolve, reject) => {
        if (res.success) {
          resolve(
            Optional.of<UserInfo>({
              ...INITIAL_USER_INFO,
              ...res.body
            })
          );
        } else {
          reject(res.rejectReason);
        }
      });
    }
    return new Promise<Optional<UserInfo>>(resolve => resolve(Optional.empty<UserInfo>()));
  }

  async register(userInfo: UserInfo): Promise<Optional<UserInfo>> {
    Cookies.remove(COOKIE_MESH_TOKEN);
    const res = await meshRegister(userInfo);
    return new Promise<Optional<UserInfo>>((resolve, reject) => {
      if (res.success) {
        resolve(
          Optional.of<UserInfo>({
            ...INITIAL_USER_INFO,
            ...res.body
          })
        );
      } else {
        reject(res.rejectReason);
      }
    });
  }

  async requestRacerProfiles(userUUID: string): Promise<Optional<RacerProfile[]>> {
    throw new Error("Method not implemented.");
  }

  async updateRacerProfiles(
    userUUID: string,
    added: RacerProfile[],
    removed: RacerProfile[],
    updated: RacerProfile[]
  ): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async requestRaces(): Promise<Optional<RaceItem[]>> {
    throw new Error("Method not implemented.");
  }

  async requestSelectedRace(raceID: number): Promise<Optional<RaceItemExt>> {
    throw new Error("Method not implemented.");
  }

  async updateRaceParticipants(
    userUUID: string,
    raceID: number,
    added: RacerProfile[],
    removed: RacerProfile[]
  ): Promise<any> {
    throw new Error("Method not implemented.");
  }

  // Exmaples could be find here:
  // https://medium.com/javascript-in-plain-english/real-time-data-with-redux-saga-event-channels-and-socket-io-ad6e64dbefd9?
  // https://github.com/slava-lu/saga-socket-example
  // or here
  // https://dzone.com/articles/react-in-real-time
  // https://github.com/RestDB/clientexamples/tree/master/realtime-react

  subscribeToRaceResults(userUUID: string, raceID: number): EventChannel<Optional<RacerResults[]>> {
    // We could leave this solution as is, or implement PING and queries for results on some events
    this.channel = eventChannel(emitter => {
      const dataHandler = (data: Event) => {
        emitter(this.extractRaceResults(data));
      };
      this.eventSource.addEventListener(RACE_RESULTS_DATA, dataHandler);
      return () => {
        this.eventSource.removeEventListener(RACE_RESULTS_DATA, dataHandler);
      };
    });

    return this.channel;
  }

  extractRaceResults = (data: Event): Optional<RacerResults[]> => {
    // TODO
    return Optional.empty<RacerResults[]>();
  };

  async unsubscribeFromRaceResults(userUUID: string, raceID: number): Promise<any> {
    return new Promise<any>(resolve => {
      this.channel.close();
      resolve();
    });
  }

  async changeRaceState(raceID: number, state: RaceState): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
