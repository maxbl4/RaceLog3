import Optional from "optional-js";
import { UserInfo, RacerProfile, RaceItem, RaceItemExt } from "../types/datatypes";
import { timeout } from "promise-timeout";
import { DEFAULT_TIMEOUT } from "../utils/constants";

export interface ITransport {
  login(userName: string, userPassword: string): Promise<any>;
  logout(): Promise<any>;
  aboutMe(): Promise<Optional<UserInfo>>;
  register(userInfo: UserInfo): Promise<Optional<UserInfo>>;
  requestRacerProfiles(userUUID: string): Promise<Optional<RacerProfile[]>>;
  updateRacerProfiles(
    userUUID: string,
    added: RacerProfile[],
    removed: RacerProfile[],
    updated: RacerProfile[]
  ): Promise<any>;
  requestRaces(): Promise<Optional<RaceItem[]>>;
  requestSelectedRace(raceID: number): Promise<Optional<RaceItemExt>>;
  updateRaceParticipants(
    userUUID: string,
    raceID: number,
    added: RacerProfile[],
    removed: RacerProfile[]
  ): Promise<any>;
}

export class TimeoutTransport implements ITransport {
  private transport: ITransport;

  constructor(transport: ITransport) {
    this.transport = transport;
  }

  login(userName: string, userPassword: string): Promise<any> {
    return timeout(this.transport.login(userName, userPassword), DEFAULT_TIMEOUT);
  }
  logout(): Promise<any> {
    return timeout(this.transport.logout(), DEFAULT_TIMEOUT);
  }
  aboutMe(): Promise<Optional<UserInfo>> {
    return timeout(this.transport.aboutMe(), DEFAULT_TIMEOUT);
  }
  register(userInfo: UserInfo): Promise<Optional<UserInfo>> {
    return timeout(this.transport.register(userInfo), DEFAULT_TIMEOUT);
  }
  requestRacerProfiles(userUUID: string): Promise<Optional<RacerProfile[]>> {
    return timeout(this.transport.requestRacerProfiles(userUUID), DEFAULT_TIMEOUT);
  }
  updateRacerProfiles(
    userUUID: string,
    added: RacerProfile[],
    removed: RacerProfile[],
    updated: RacerProfile[]
  ): Promise<any> {
    return timeout(
      this.transport.updateRacerProfiles(userUUID, added, removed, updated),
      DEFAULT_TIMEOUT
    );
  }
  requestRaces(): Promise<Optional<RaceItem[]>> {
    return timeout(this.transport.requestRaces(), DEFAULT_TIMEOUT);
  }
  requestSelectedRace(raceID: number): Promise<Optional<RaceItemExt>> {
    return timeout(this.transport.requestSelectedRace(raceID), DEFAULT_TIMEOUT);
  }
  updateRaceParticipants(
    userUUID: string,
    raceID: number,
    added: RacerProfile[],
    removed: RacerProfile[]
  ): Promise<any> {
    return timeout(
      this.transport.updateRaceParticipants(userUUID, raceID, added, removed),
      DEFAULT_TIMEOUT
    );
  }
}

export class TransportService implements ITransport {
  private static instance: TransportService;

  public static getInstance(): TransportService {
    if (!TransportService.instance) {
      throw new Error("Transport service has not been initialized");
    }

    return TransportService.instance;
  }

  public static setInstance(innerTransport: ITransport): void {
    if (TransportService.instance) {
      throw new Error("Transport service has been already initialized");
    }

    TransportService.instance = new TransportService(innerTransport);
  }

  private transport: ITransport;

  private constructor(transport: ITransport) {
    this.transport = transport;
  }

  login(userName: string, userPassword: string): Promise<any> {
    return this.transport.login(userName, userPassword);
  }
  logout(): Promise<any> {
    return this.transport.logout();
  }
  aboutMe(): Promise<Optional<UserInfo>> {
    return this.transport.aboutMe();
  }
  register(userInfo: UserInfo): Promise<Optional<UserInfo>> {
    return this.transport.register(userInfo);
  }
  requestRacerProfiles(userUUID: string): Promise<Optional<RacerProfile[]>> {
    return this.transport.requestRacerProfiles(userUUID);
  }
  updateRacerProfiles(
    userUUID: string,
    added: RacerProfile[],
    removed: RacerProfile[],
    updated: RacerProfile[]
  ): Promise<any> {
    return this.transport.updateRacerProfiles(userUUID, added, removed, updated);
  }
  requestRaces(): Promise<Optional<RaceItem[]>> {
    return this.transport.requestRaces();
  }
  requestSelectedRace(raceID: number): Promise<Optional<RaceItemExt>> {
    return this.transport.requestSelectedRace(raceID);
  }
  updateRaceParticipants(
    userUUID: string,
    raceID: number,
    added: RacerProfile[],
    removed: RacerProfile[]
  ): Promise<any> {
    return this.transport.updateRaceParticipants(userUUID, raceID, added, removed);
  }
}

export async function loginApiRequest(userName: string, userPassword: string) {
  return await TransportService.getInstance().login(userName, userPassword);
}

export async function logoutApiRequest() {
  return await TransportService.getInstance().logout();
}

export async function aboutMeApiRequest() {
  return await TransportService.getInstance().aboutMe();
}

export async function registerApiRequest(userInfo: UserInfo) {
  return await TransportService.getInstance().register(userInfo);
}

export async function requestRacerProfilesApiRequest(userUUID: string) {
  return await TransportService.getInstance().requestRacerProfiles(userUUID);
}

export async function updateRacerProfilesApiRequest(
  userUUID: string,
  added: RacerProfile[],
  removed: RacerProfile[],
  updated: RacerProfile[]
) {
  return await TransportService.getInstance().updateRacerProfiles(
    userUUID,
    added,
    removed,
    updated
  );
}

export async function requestRacesApiRequest() {
  return await TransportService.getInstance().requestRaces();
}

export async function requestSelectedRaceApiRequest(raceID: number) {
  return await TransportService.getInstance().requestSelectedRace(raceID);
}

export async function updateRaceParticipantsApiRequest(
  userUUID: string,
  raceID: number,
  added: RacerProfile[],
  removed: RacerProfile[]
) {
  return await TransportService.getInstance().updateRaceParticipants(
    userUUID,
    raceID,
    added,
    removed
  );
}
