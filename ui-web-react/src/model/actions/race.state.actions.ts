import { AnyAction } from "redux";
import { RaceState } from "../types/races.model";

export const RACE_CHANGE_STATE_REQUESTED = "RACE_CHANGE_STATE_REQUESTED";
export const RACE_CHANGE_STATE_SUCCESS = "RACE_CHANGE_STATE_SUCCESS";
export const RACE_CHANGE_STATE_FAILED = "RACE_CHANGE_STATE_FAILED";

export type RaceChangeStateAction = AnyAction & {
  raceID: number;
  state: RaceState;
};

const raceChangeStateFactory = (type: string) => (
  raceID: number,
  state: RaceState
): RaceChangeStateAction => ({
  type,
  raceID,
  state
});

export const raceChangeStateRequested = raceChangeStateFactory(RACE_CHANGE_STATE_REQUESTED);

export const raceChangeStateSuccess = raceChangeStateFactory(RACE_CHANGE_STATE_SUCCESS);

export const raceChangeStateFailed = (): AnyAction => ({
  type: RACE_CHANGE_STATE_FAILED
});
