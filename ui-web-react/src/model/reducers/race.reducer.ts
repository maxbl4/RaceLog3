import { Races, RaceItemExt, RaceItem, RacerProfile } from "../types/datatypes";
import Optional from "optional-js";
import {
  RACES_REQUESTED,
  RACES_LOADED,
  RacesLoadedAction,
  SELECTED_RACE_REQUESTED,
  SELECTED_RACE_LOADED,
  SelectedRaceLoadedAction,
  RACE_PARTICIPANTS_UPDATE_REQUESTED,
  RACE_PARTICIPANTS_UPDATED,
  RaceParticipantsAction,
  RACE_PARTICIPANTS_UPDATE_FAILED
} from "../actions/actions";
import { AnyAction } from "redux";
import { LoggingService } from "../utils/logging-service";
import { DEFAULT_DATE, DEFAULT_ID } from "../utils/constants";

export const INITIAL_RACES: Races = {
  isFetching: false,
  items: Optional.empty<RaceItem[]>()
};

export const INITIAL_SELECTED_RACE: RaceItemExt = {
  isFetching: false,
  id: DEFAULT_ID,
  name: "",
  date: DEFAULT_DATE,
  location: "",
  description: "",
  participants: {
    isFetching: false,
    items: Optional.empty<RacerProfile[]>()
  }
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

export function selectedRaceReducer(state: RaceItemExt = INITIAL_SELECTED_RACE, action: AnyAction) {
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
    case RACE_PARTICIPANTS_UPDATE_REQUESTED:
      return {
        ...state,
        participants: {
          ...state.participants,
          isFetching: true
        }
      };
    case RACE_PARTICIPANTS_UPDATED:
      return {
        ...state,
        participants: {
          isFetching: false,
          items: processRaceParticipants(state.participants.items, action as RaceParticipantsAction)
        }
      };
    case RACE_PARTICIPANTS_UPDATE_FAILED:
      return {
        ...state,
        participants: {
          ...state.participants,
          isFetching: false
        }
      };
    default:
      return state;
  }
}

function processRaceParticipants(
  currentItems: Optional<RacerProfile[]>,
  action: RaceParticipantsAction
): Optional<RacerProfile[]> {
  const removed = action.itemsRemoved.orElse([]);

  let items = currentItems.orElse([]);
  items = items.filter(item => removed.find(curr => item.uuid === curr.uuid) === undefined);
  items = items.concat(action.itemsAdded.orElse([]));
  return items.length === 0 ? Optional.empty<RacerProfile[]>() : Optional.of(items);
}
