import { ITransport } from "./transport";
import Optional from "optional-js";
import { UserInfo, RacerProfile, RaceItem, RaceItemExt } from "../types/datatypes";
import {
  DEFAULT_USER_INFO,
  DEFAULT_RACER_PROFILE_1,
  DEFAULT_RACER_PROFILE_2,
  DEFAULT_RACE_ITEM_1,
  DEFAULT_RACE_ITEM_2,
  DEFAULT_RACE_ITEM_EXT
} from "../../tests/test.utils";

export class FakeApi implements ITransport {
  login(userName: string, userPassword: string): Promise<any> {
    return new Promise<any>(resolve => resolve());
  }
  logout(): Promise<any> {
    return new Promise<any>(resolve => resolve());
  }
  aboutMe(): Promise<Optional<UserInfo>> {
    return new Promise<Optional<UserInfo>>(resolve => resolve(Optional.of(DEFAULT_USER_INFO)));
  }
  register(userInfo: UserInfo): Promise<Optional<UserInfo>> {
    return new Promise<Optional<UserInfo>>(resolve => resolve(Optional.of(userInfo)));
  }
  requestRacerProfiles(userUUID: string): Promise<Optional<RacerProfile[]>> {
    return new Promise<Optional<RacerProfile[]>>(resolve =>
      resolve(Optional.of([DEFAULT_RACER_PROFILE_1, DEFAULT_RACER_PROFILE_2]))
    );
  }
  updateRacerProfiles(
    userUUID: string,
    added: RacerProfile[],
    removed: RacerProfile[],
    updated: RacerProfile[]
  ): Promise<any> {
    return new Promise<any>(resolve => resolve());
  }
  requestRaces(): Promise<Optional<RaceItem[]>> {
    return new Promise<Optional<RaceItem[]>>(resolve =>
      resolve(Optional.of([DEFAULT_RACE_ITEM_1, DEFAULT_RACE_ITEM_2]))
    );
  }
  requestSelectedRace(raceID: number): Promise<Optional<RaceItemExt>> {
    return new Promise<Optional<RaceItemExt>>(resolve =>
      resolve(Optional.of(DEFAULT_RACE_ITEM_EXT))
    );
  }
  updateRaceParticipants(
    userUUID: string,
    raceID: number,
    added: RacerProfile[],
    removed: RacerProfile[]
  ): Promise<any> {
    return new Promise<any>(resolve => resolve());
  }
}
