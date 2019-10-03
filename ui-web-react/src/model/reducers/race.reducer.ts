import { Races, RaceItemExt, RaceParticipant, RaceItem } from "../types/datatypes";
import Optional from "optional-js";
import {
  RACES_REQUESTED,
  RACES_LOADED,
  RacesLoadedAction,
  SELECTED_RACE_REQUESTED,
  SELECTED_RACE_LOADED,
  SelectedRaceLoadedAction
} from "../actions/actions";
import { AnyAction } from "redux";
import { LoggingService } from "../utils/logging-service";

export const INITIAL_RACES: Races = {
  isFetching: false,
  items: Optional.empty<RaceItem[]>()
};

export const INITIAL_SELECTED_RACE = {
  isFetching: false,
  id: Optional.empty<number>(),
  name: Optional.empty<string>(),
  date: Optional.empty<number>(),
  location: Optional.empty<string>(),
  participants: Optional.empty<RaceParticipant[]>()
};

export function racesReducer(state: Races = INITIAL_RACES, action: AnyAction) {
  LoggingService.getInstance().logReducer(action, state);
  switch (action.type) {
    case RACES_REQUESTED:
      return {
        isFetching: true,
        items: INITIAL_RACES.items
      };
    case RACES_LOADED:
      return {
        isFetching: false,
        items: (action as RacesLoadedAction).items
      };
    default:
      return state;
  }
}

export function selectedRaceReducer(
  state: RaceItemExt = INITIAL_SELECTED_RACE,
  action: AnyAction
) {
  LoggingService.getInstance().logReducer(action, state);
  switch (action.type) {
    case SELECTED_RACE_REQUESTED:
      return {
        ...state,
        isFetching: true
      };
    case SELECTED_RACE_LOADED:
      return {
        ...(action as SelectedRaceLoadedAction).raceItemExt,
        isFetching: false
      };
    default:
      return state;
  }
}
