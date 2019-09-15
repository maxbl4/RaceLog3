import { AnyAction, combineReducers } from "redux";
import { News, Races, StoredState, User } from "../types/datatypes";
import {
  NEWS_LOADED,
  NEWS_REQUESTED,
  NewsLoadedAction,
  RACES_LOADED,
  RACES_REQUESTED,
  RacesLoadedAction
} from "../actions/actions";
import { none } from "../utils/optional";

export const INITIAL_USER: User = {
  isFetching: false,
  info: none
};

export const INITIAL_NEWS: News = {
  isFetching: false,
  items: none
};

export const INITIAL_RACES: Races = {
  isFetching: false,
  items: none
};

function userReducer(state: User = INITIAL_USER, action: AnyAction) {
  return state;
}

function newsReducer(state: News = INITIAL_NEWS, action: AnyAction) {
  switch (action.type) {
    case NEWS_REQUESTED:
      return {
        isFetching: true,
        items: INITIAL_NEWS.items
      };
    case NEWS_LOADED:
      return {
        isFetching: false,
        items: (action as NewsLoadedAction).items
      };
    default:
      return state;
  }
}

function racesReducer(state: Races = INITIAL_RACES, action: AnyAction) {
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

const raceLogAppState = combineReducers<StoredState>({
  user: userReducer,
  news: newsReducer,
  races: racesReducer
});

export default raceLogAppState;
