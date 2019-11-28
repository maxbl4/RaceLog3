import { RacerProfiles, RacerProfile } from "../types/datatypes";
import Optional from "optional-js";
import { AnyAction } from "redux";
import { LoggingService } from "../utils/logging-service";
import {
  RacerProfilesDataAction,
  RACER_PROFILES_REQUESTED_ALL,
  RACER_PROFILES_UPDATE_REQUESTED,
  RACER_PROFILES_REQUEST_FAILED,
  RACER_PROFILES_UPDATE_RECEIVED
} from "../actions/racerProfiles.actions";

export const INITIAL_RACER_PROFILES: RacerProfiles = {
  isFetching: false,
  items: Optional.empty<RacerProfile[]>()
};

export function racerProfilesReducer(
  state: RacerProfiles = INITIAL_RACER_PROFILES,
  action: AnyAction
) {
  LoggingService.getInstance().logReducer(action, state);
  switch (action.type) {
    case RACER_PROFILES_REQUESTED_ALL:
    case RACER_PROFILES_UPDATE_REQUESTED:
      return {
        ...state,
        isFetching: true
      };
    case RACER_PROFILES_UPDATE_RECEIVED:
      return {
        items: processProfiles(action as RacerProfilesDataAction),
        isFetching: false
      };
    case RACER_PROFILES_REQUEST_FAILED:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
}

function processProfiles(action: RacerProfilesDataAction): Optional<RacerProfile[]> {
  let result: RacerProfile[] = [];
  action.itemsAdded.ifPresent(profiles => result = result.concat(profiles));
  action.itemsUpdated.ifPresent(profiles => result = result.concat(profiles));
  return result.length > 0 ? Optional.of(result) : Optional.empty<RacerProfile[]>();
}
