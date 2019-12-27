import { ITransport } from "./transport";
import Optional from "optional-js";
import { Observable } from "rxjs";
import {
  UserInfo,
  RacerProfile,
  RaceItem,
  RaceItemExt,
  StoredState,
  RaceResults
} from "../types/datatypes";
import {
  DEFAULT_NON_AUTHORIZED_STORED_STATE,
  DEFAULT_RACE_ITEM_EXT_1,
  DEFAULT_RACE_ITEM_EXT_2,
  DEFAULT_RACE_ITEM_EXT_3,
  DEFAULT_RACE_ITEM_EXT_4,
  DEFAULT_USER_INFO
} from "../../tests/test.utils";

export class FakeApi implements ITransport {
  private fakeStoredState: StoredState;
  private racesInfo: Map<number, RaceItemExt>;

  constructor() {
    this.fakeStoredState = {
      ...DEFAULT_NON_AUTHORIZED_STORED_STATE
    };

    this.racesInfo = new Map<number, RaceItemExt>();
    this.racesInfo.set(DEFAULT_RACE_ITEM_EXT_1.id, DEFAULT_RACE_ITEM_EXT_1);
    this.racesInfo.set(DEFAULT_RACE_ITEM_EXT_2.id, DEFAULT_RACE_ITEM_EXT_2);
    this.racesInfo.set(DEFAULT_RACE_ITEM_EXT_3.id, DEFAULT_RACE_ITEM_EXT_3);
    this.racesInfo.set(DEFAULT_RACE_ITEM_EXT_4.id, DEFAULT_RACE_ITEM_EXT_4);
  }

  private processRacerProfiles = (
    srcList: RacerProfile[],
    added: RacerProfile[],
    removed: RacerProfile[],
    updated: RacerProfile[]
  ): RacerProfile[] => {
    return [...srcList]
      .filter(profile => removed.find(rem => rem.uuid === profile.uuid) === undefined)
      .map(profile =>
        Optional.ofNullable(updated.find(upd => upd.uuid === profile.uuid)).orElse(profile)
      )
      .concat(added);
  };

  login(userName: string, userPassword: string): Promise<any> {
    this.fakeStoredState.user.info = Optional.of({
      ...DEFAULT_USER_INFO,
      email: userName,
      password: userPassword
    });
    return new Promise<any>(resolve => resolve());
  }
  logout(): Promise<any> {
    return new Promise<any>(resolve => resolve());
  }
  aboutMe(): Promise<Optional<UserInfo>> {
    return new Promise<Optional<UserInfo>>(resolve => resolve(this.fakeStoredState.user.info));
  }
  register(userInfo: UserInfo): Promise<Optional<UserInfo>> {
    this.fakeStoredState.user.info = Optional.of(userInfo);
    return new Promise<Optional<UserInfo>>(resolve => resolve(this.fakeStoredState.user.info));
  }
  requestRacerProfiles(userUUID: string): Promise<Optional<RacerProfile[]>> {
    return new Promise<Optional<RacerProfile[]>>(resolve =>
      resolve(this.fakeStoredState.racerProfiles.items)
    );
  }
  updateRacerProfiles(
    userUUID: string,
    added: RacerProfile[],
    removed: RacerProfile[],
    updated: RacerProfile[]
  ): Promise<any> {
    const newList = this.processRacerProfiles(
      this.fakeStoredState.racerProfiles.items.orElse([]),
      added,
      removed,
      updated
    );

    this.racesInfo.forEach(value => {
      let newProfiles: RacerProfile[] = [];
      value.participants.items.ifPresent(profiles => {
        newProfiles = [...profiles]
          .filter(profile => removed.find(curr => curr.uuid === profile.uuid) === undefined)
          .map(profile =>
            Optional.ofNullable(updated.find(upd => upd.uuid === profile.uuid)).orElse(profile)
          );
      });
      value.participants.items =
        newProfiles.length === 0 ? Optional.empty<RacerProfile[]>() : Optional.of(newProfiles);
    });

    this.fakeStoredState.racerProfiles.items =
      newList.length === 0 ? Optional.empty<RacerProfile[]>() : Optional.of(newList);

    return new Promise<any>(resolve => resolve());
  }
  requestRaces(): Promise<Optional<RaceItem[]>> {
    return new Promise<Optional<RaceItem[]>>(resolve => resolve(this.fakeStoredState.races.items));
  }
  requestSelectedRace(raceID: number): Promise<Optional<RaceItemExt>> {
    Optional.ofNullable(this.racesInfo.get(raceID)).ifPresent(
      raceInfo => (this.fakeStoredState.selectedRace = raceInfo)
    );
    return new Promise<Optional<RaceItemExt>>(resolve =>
      resolve(Optional.of(this.fakeStoredState.selectedRace))
    );
  }
  updateRaceParticipants(
    userUUID: string,
    raceID: number,
    added: RacerProfile[],
    removed: RacerProfile[]
  ): Promise<any> {
    this.fakeStoredState.selectedRace.participants.items = Optional.of(
      this.processRacerProfiles(
        this.fakeStoredState.selectedRace.participants.items.orElse([]),
        added,
        removed,
        []
      )
    );
    return new Promise<any>(resolve => resolve());
  }
  subscribeToRaceResults(userUUID: string, raceID: number): Observable<Optional<RaceResults[]>> {
    throw new Error("Method not implemented.");
  }

  async unsubscribeFromRaceResults(userUUID: string, raceID: number): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
