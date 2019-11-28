import {
  UNKNOWN_ACTION_TYPE,
  DEFAULT_RACER_PROFILE_1,
  DEFAULT_RACER_PROFILE_2,
  DEFAULT_RACER_PROFILE_3,
  DEFAULT_RACER_PROFILE_4,
  compareProfiles
} from "../utils/test.utils";
import { racerProfilesReducer } from "./racerProfiles.reducer";
import {
  RACER_PROFILES_REQUESTED_ALL,
  RACER_PROFILES_UPDATE_REQUESTED,
  RACER_PROFILES_UPDATE_RECEIVED,
  RACER_PROFILES_REQUEST_FAILED
} from "../actions/racerProfiles.actions";
import Optional from "optional-js";
import { RacerProfile } from "../types/datatypes";

describe("racerProfiles.reducer - racerProfilesReducer", () => {
  it("should return default state for unknown action", () => {
    const rpState = racerProfilesReducer(undefined, { type: UNKNOWN_ACTION_TYPE });
    expect(rpState.isFetching).toBeFalsy();
    expect(rpState.items.isPresent()).toBeFalsy();
  });

  it("should return the same state and isFetching = true for RACER_PROFILES_REQUESTED_ALL action", () => {
    const rpState = racerProfilesReducer(
      {
        isFetching: false,
        items: Optional.of([DEFAULT_RACER_PROFILE_1, DEFAULT_RACER_PROFILE_2])
      },
      { type: RACER_PROFILES_REQUESTED_ALL }
    );
    expect(rpState.isFetching).toBeTruthy();
    expect(rpState.items.isPresent()).toBeTruthy();
    const profiles: RacerProfile[] = rpState.items.get();
    expect(profiles.length).toEqual(2);
    compareProfiles(profiles[0], DEFAULT_RACER_PROFILE_1);
    compareProfiles(profiles[1], DEFAULT_RACER_PROFILE_2);
  });

  it("should return the same state and isFetching = true for RACER_PROFILES_UPDATE_REQUESTED action", () => {
    const rpState = racerProfilesReducer(
      {
        isFetching: false,
        items: Optional.of([DEFAULT_RACER_PROFILE_1])
      },
      {
        type: RACER_PROFILES_UPDATE_REQUESTED,
        added: Optional.of([DEFAULT_RACER_PROFILE_2]),
        removed: Optional.of([DEFAULT_RACER_PROFILE_3]),
        updated: Optional.of([DEFAULT_RACER_PROFILE_4])
      }
    );
    expect(rpState.isFetching).toBeTruthy();
    expect(rpState.items.isPresent()).toBeTruthy();
    const profiles: RacerProfile[] = rpState.items.get();
    expect(profiles.length).toEqual(1);
    compareProfiles(profiles[0], DEFAULT_RACER_PROFILE_1);
  });

  it("should return the new state and isFetching = false for RACER_PROFILES_UPDATE_RECEIVED action", () => {
    const rpState = racerProfilesReducer(
      {
        isFetching: true,
        items: Optional.of([DEFAULT_RACER_PROFILE_1, DEFAULT_RACER_PROFILE_2])
      },
      {
        type: RACER_PROFILES_UPDATE_RECEIVED,
        itemsAdded: Optional.of([DEFAULT_RACER_PROFILE_3, DEFAULT_RACER_PROFILE_4]),
        itemsRemoved: Optional.of([DEFAULT_RACER_PROFILE_2]),
        itemsUpdated: Optional.of([DEFAULT_RACER_PROFILE_1])
      }
    );
    expect(rpState.isFetching).toBeFalsy();
    expect(rpState.items.isPresent()).toBeTruthy();
    const profiles: RacerProfile[] = rpState.items.get();
    expect(profiles.length).toEqual(3);
    compareProfiles(profiles[0], DEFAULT_RACER_PROFILE_3);
    compareProfiles(profiles[1], DEFAULT_RACER_PROFILE_4);
    compareProfiles(profiles[2], DEFAULT_RACER_PROFILE_1);
  });

  it("should return the non empty state and isFetching = false for RACER_PROFILES_UPDATE_RECEIVED action for initial request", () => {
    const rpState = racerProfilesReducer(
      {
        isFetching: true,
        items: Optional.empty<RacerProfile[]>()
      },
      {
        type: RACER_PROFILES_UPDATE_RECEIVED,
        itemsAdded: Optional.of([DEFAULT_RACER_PROFILE_1, DEFAULT_RACER_PROFILE_2]),
        itemsRemoved: Optional.empty<RacerProfile[]>(),
        itemsUpdated: Optional.empty<RacerProfile[]>()
      }
    );
    expect(rpState.isFetching).toBeFalsy();
    expect(rpState.items.isPresent()).toBeTruthy();
    const profiles: RacerProfile[] = rpState.items.get();
    expect(profiles.length).toEqual(2);
    compareProfiles(profiles[0], DEFAULT_RACER_PROFILE_1);
    compareProfiles(profiles[1], DEFAULT_RACER_PROFILE_2);
  });

  it("should return the empty state and isFetching = false for RACER_PROFILES_UPDATE_RECEIVED action for delete all profiles request", () => {
    const rpState = racerProfilesReducer(
      {
        isFetching: true,
        items: Optional.of([DEFAULT_RACER_PROFILE_1, DEFAULT_RACER_PROFILE_2])
      },
      {
        type: RACER_PROFILES_UPDATE_RECEIVED,
        itemsAdded: Optional.empty<RacerProfile[]>(),
        itemsRemoved: Optional.of([DEFAULT_RACER_PROFILE_1, DEFAULT_RACER_PROFILE_2]),
        itemsUpdated: Optional.empty<RacerProfile[]>()
      }
    );
    expect(rpState.isFetching).toBeFalsy();
    expect(rpState.items.isPresent()).toBeFalsy();
  });

  it("should return the same state and isFetching = false for RACER_PROFILES_REQUEST_FAILED action", () => {
    const rpState = racerProfilesReducer(
      {
        isFetching: true,
        items: Optional.of([DEFAULT_RACER_PROFILE_2])
      },
      { type: RACER_PROFILES_REQUEST_FAILED }
    );
    expect(rpState.isFetching).toBeFalsy();
    expect(rpState.items.isPresent()).toBeTruthy();
    const profiles: RacerProfile[] = rpState.items.get();
    expect(profiles.length).toEqual(1);
    compareProfiles(profiles[0], DEFAULT_RACER_PROFILE_2);
  });
});
