import { AnyAction } from "redux";
import Optional from "optional-js";
import { RacerProfile } from "../types/datatypes";

export const RACE_PARTICIPANTS_UPDATE_REQUESTED = "RACE_PARTICIPANTS_UPDATE_REQUESTED";
export const RACE_PARTICIPANTS_UPDATED = "RACE_PARTICIPANTS_UPDATED";
export const RACE_PARTICIPANTS_UPDATE_FAILED = "RACE_PARTICIPANTS_UPDATE_FAILED";

export type RaceParticipantsAction = AnyAction & {
  userUUID: string;
  raceID: number;
  itemsAdded: Optional<RacerProfile[]>;
  itemsRemoved: Optional<RacerProfile[]>;
};

export type RaceParticipantsUpdateFailedAction = AnyAction & {
  raceID: number;
};

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
