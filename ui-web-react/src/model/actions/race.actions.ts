import { AnyAction } from "redux";
import { RaceItem, RaceItemExt, RacerProfile } from "../types/datatypes";
import Optional from "optional-js";
import { RaceState } from "../types/races.model";

export const RACES_REQUESTED = "RACES_REQUESTED";
export const RACES_REQUEST_FAILED = "RACES_REQUEST_FAILED";
export const RACES_LOADED = "RACES_LOADED";

export const SELECTED_RACE_REQUESTED = "SELECTED_RACE_REQUESTED";
export const SELECTED_RACE_REQUEST_FAILED = "SELECTED_RACE_REQUEST_FAILED";
export const SELECTED_RACE_LOADED = "SELECTED_RACE_LOADED";

export const RACE_PARTICIPANTS_UPDATE_REQUESTED = "RACE_PARTICIPANTS_UPDATE_REQUESTED";
export const RACE_PARTICIPANTS_UPDATED = "RACE_PARTICIPANTS_UPDATED";
export const RACE_PARTICIPANTS_UPDATE_FAILED = "RACE_PARTICIPANTS_UPDATE_FAILED";

export const RACE_RESULTS_SUBSCRIPTION_STARTED = "RACE_RESULTS_SUBSCRIPTION_STARTED";
export const RACE_RESULTS_SUBSCRIPTION_STOPPED = "RACE_RESULTS_SUBSCRIPTION_STOPPED";

export type RacesRequestedAction = AnyAction;
export type RacesLoadedAction = AnyAction & {
  items: Optional<RaceItem[]>;
};

export type SelectedRaceRequestedAction = AnyAction & {
  id: number;
};
export type SelectedRaceLoadedAction = AnyAction & {
  raceItemExt: RaceItemExt;
};
export type RaceParticipantsAction = AnyAction & {
  userUUID: string;
  raceID: number;
  itemsAdded: Optional<RacerProfile[]>;
  itemsRemoved: Optional<RacerProfile[]>;
};
export type RaceParticipantsUpdateFailedAction = AnyAction & {
  raceID: number;
};

export type RaceResultsSubscriptionAction = AnyAction & {
  raceUUID: string;
};

export const racesRequested = (): RacesRequestedAction => ({
  type: RACES_REQUESTED
});
export const racesRequestFailed = (): RacesRequestedAction => ({
  type: RACES_REQUEST_FAILED
});
export const racesLoaded = (items: RaceItem[]): RacesLoadedAction => ({
  type: RACES_LOADED,
  items: Optional.of(items)
});
const raceParticipantsFactory = (type: string) => (
  userUUID: string,
  raceID: number,
  added: RacerProfile[],
  removed: RacerProfile[]
): RaceParticipantsAction => ({
  type,
  userUUID,
  raceID,
  itemsAdded: Optional.of(added),
  itemsRemoved: Optional.of(removed)
});
export const raceParticipantsUpdateRequested = raceParticipantsFactory(
  RACE_PARTICIPANTS_UPDATE_REQUESTED
);
export const raceParticipantsUpdated = raceParticipantsFactory(RACE_PARTICIPANTS_UPDATED);
export const raceParticipantsUpdateFailed = (
  raceID: number
): RaceParticipantsUpdateFailedAction => ({
  type: RACE_PARTICIPANTS_UPDATE_FAILED,
  raceID
});

export const selectedRaceRequested = (id: number): SelectedRaceRequestedAction => ({
  type: SELECTED_RACE_REQUESTED,
  id: id
});
export const selectedRaceRequestFailed = (id: number): SelectedRaceRequestedAction => ({
  type: SELECTED_RACE_REQUEST_FAILED,
  id: id
});
export const selectedRaceLoaded = (raceItemExt: RaceItemExt): SelectedRaceLoadedAction => ({
  type: SELECTED_RACE_LOADED,
  raceItemExt: raceItemExt
});

export const raceResultsSubscriptionStarted = (
  raceUUID: string
): RaceResultsSubscriptionAction => ({
  type: RACE_RESULTS_SUBSCRIPTION_STARTED,
  raceUUID
});

export const raceResultsSubscriptionStopped = (
  raceUUID: string
): RaceResultsSubscriptionAction => ({
  type: RACE_RESULTS_SUBSCRIPTION_STOPPED,
  raceUUID
});

export const needToSubscribeToRaceResults = (state: RaceState): boolean =>
  state === RaceState.STARTED || state === RaceState.STOPED;
