import { AnyAction } from "redux";
import { RacerProfile } from "../types/datatypes";
import Optional from "optional-js";

export const RACER_PROFILES_REQUESTED_ALL = "RACER_PROFILES_REQUESTED_ALL";
export const RACER_PROFILES_UPDATE_REQUESTED = "RACER_PROFILES_UPDATE_REQUESTED";
export const RACER_PROFILES_UPDATE_RECEIVED = "RACER_PROFILES_UPDATE_RECEIVED";
export const RACER_PROFILES_REQUEST_FAILED = "RACER_PROFILES_REQUEST_FAILED";

export type RacerProfilesRequestedAction = AnyAction & {
  userUUID: string;
};
export type RacerProfilesDataAction = AnyAction & {
  userUUID: string;
  itemsAdded: Optional<RacerProfile[]>;
  itemsRemoved: Optional<RacerProfile[]>;
  itemsUpdated: Optional<RacerProfile[]>;
};
export type RacerProfilesRequestFailedAction = AnyAction;

export const racerProfilesRequestedAll = (userUUID: string): RacerProfilesRequestedAction => ({
  type: RACER_PROFILES_REQUESTED_ALL,
  userUUID
});
export const racerProfilesUpdateRequested = (
  userUUID: string,
  added: RacerProfile[],
  removed: RacerProfile[],
  updated: RacerProfile[]
): RacerProfilesDataAction =>
  racerProfilesUpdate(RACER_PROFILES_UPDATE_REQUESTED, userUUID, added, removed, updated);
export const racerProfilesUpdateReceived = (
  userUUID: string,
  added: RacerProfile[],
  removed: RacerProfile[],
  updated: RacerProfile[]
): RacerProfilesDataAction =>
  racerProfilesUpdate(RACER_PROFILES_UPDATE_RECEIVED, userUUID, added, removed, updated);
const racerProfilesUpdate = (
  type: string,
  userUUID: string,
  added: RacerProfile[],
  removed: RacerProfile[],
  updated: RacerProfile[]
): RacerProfilesDataAction => ({
  type,
  userUUID,
  itemsAdded: Optional.of(added),
  itemsRemoved: Optional.of(removed),
  itemsUpdated: Optional.of(updated)
});
export const racerProfilesRequestFailed = (): RacerProfilesRequestFailedAction => ({
  type: RACER_PROFILES_REQUEST_FAILED
});
