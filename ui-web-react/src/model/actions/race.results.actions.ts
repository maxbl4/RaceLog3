import Optional from "optional-js";
import { RacerResults } from "../types/datatypes";
import { AnyAction } from "redux";
import { RaceState } from "../types/races.model";

export const RACE_RESULTS_SUBSCRIPTION_STARTED = "RACE_RESULTS_SUBSCRIPTION_STARTED";
export const RACE_RESULTS_SUBSCRIPTION_STOPPED = "RACE_RESULTS_SUBSCRIPTION_STOPPED";
export const RACE_RESULTS_SUBSCRIPTION_DATA_RECEIVED = "RACE_RESULTS_SUBSCRIPTION_DATA_RECEIVED";
export const RACE_RESULTS_SUBSCRIPTION_FAILED = "RACE_RESULTS_SUBSCRIPTION_FAILED";

export type RaceResultsSubscriptionAction = AnyAction & {
  userUUID: string;
  raceID: number;
};
export type RaceResultsSubscriptionDataAction = AnyAction & {
  data: Optional<RacerResults[]>;
};

const raceResultsSubscriptionFactory = (type: string) => (
  userUUID: string,
  raceID: number
): RaceResultsSubscriptionAction => ({
  type,
  userUUID,
  raceID
});

export const raceResultsSubscriptionStarted = raceResultsSubscriptionFactory(
  RACE_RESULTS_SUBSCRIPTION_STARTED
);

export const raceResultsSubscriptionStopped = raceResultsSubscriptionFactory(
  RACE_RESULTS_SUBSCRIPTION_STOPPED
);

export const raceResultsSubscriptionFailed = (): AnyAction => ({
  type: RACE_RESULTS_SUBSCRIPTION_FAILED
});

export const raceResultsSubscriptionDataReceived = (
  data: Optional<RacerResults[]>
): RaceResultsSubscriptionDataAction => ({
  type: RACE_RESULTS_SUBSCRIPTION_DATA_RECEIVED,
  data
});

export const needToSubscribeToRaceResults = (state: RaceState): boolean =>
  state === RaceState.STARTED || state === RaceState.STOPPED;
