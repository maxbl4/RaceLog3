import { ITransport } from "./transport";
import Optional from "optional-js";
import { UserInfo, RacerProfile, RaceItem, RaceItemExt, StoredState } from "../types/datatypes";
import { DEFAULT_STORED_STATE } from "../../tests/test.utils";

export class FakeApi implements ITransport {
  private fakeStoredState: StoredState = {
    ...DEFAULT_STORED_STATE
  };

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
    this.fakeStoredState.racerProfiles.items = Optional.of(
      this.processRacerProfiles(
        this.fakeStoredState.racerProfiles.items.orElse([]),
        added,
        removed,
        updated
      )
    );
    return new Promise<any>(resolve => resolve());
  }
  requestRaces(): Promise<Optional<RaceItem[]>> {
    return new Promise<Optional<RaceItem[]>>(resolve => resolve(this.fakeStoredState.races.items));
  }
  requestSelectedRace(raceID: number): Promise<Optional<RaceItemExt>> {
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
}
