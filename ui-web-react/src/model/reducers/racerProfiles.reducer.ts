import { RacerProfiles, RacerProfile } from "../types/datatypes";
import Optional from "optional-js";
import { AnyAction } from "redux";
import { LoggingService } from "../utils/logging-service";
import {
  RACER_PROFILES_REQUESTED,
  RACER_PROFILES_LOADED,
  RACER_PROFILES_UPDATED,
  RacerProfilesDataAction
} from "../actions/actions";

export const INITIAL_RACER_PROFILES: RacerProfiles = {
  isFetching: false,
  // items: Optional.empty<RacerProfile[]>()
  items: Optional.of<RacerProfile[]>([
    { uuid: "asdf", userUUID: "asdfadsf", name: "Dima Komarov", bikeNumber: 87 },
    { uuid: "asdf", userUUID: "asdfadsf", name: "Dima Komarov", bikeNumber: 87 }
  ])
};

export function racerProfilesReducer(
  state: RacerProfiles = INITIAL_RACER_PROFILES,
  action: AnyAction
) {
  LoggingService.getInstance().logReducer(action, state);
  switch (action.type) {
    case RACER_PROFILES_REQUESTED:
      return {
        ...state,
        isFetching: true
      };
    case RACER_PROFILES_LOADED:
    case RACER_PROFILES_UPDATED:
      return {
        items: (action as RacerProfilesDataAction).items,
        isFetching: false
      };
    default:
      return state;
  }
}
