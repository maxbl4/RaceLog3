import { News, NewsItemExt, NewsItem } from "../types/datatypes";
import { AnyAction } from "redux";
import {
  NEWS_REQUESTED,
  NEWS_LOADED,
  NewsLoadedAction,
  SELECTED_NEWS_REQUESTED,
  SELECTED_NEWS_LOADED,
  SelectedNewsLoadedAction
} from "../actions/actions";
import Optional from "optional-js";
import { LoggingService } from "../utils/logging-service";

export const INITIAL_NEWS: News = {
  isFetching: false,
  items: Optional.empty<NewsItem[]>()
};

export const INITIAL_SELECTED_NEWS = {
  isFetching: false,
  id: Optional.empty<number>(),
  header: Optional.empty<string>(),
  date: Optional.empty<number>(),
  text: Optional.empty<string>()
};

export function newsReducer(state: News = INITIAL_NEWS, action: AnyAction) {
  LoggingService.getInstance().logReducer(action, state);
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

export function selectedNewsReducer(
  state: NewsItemExt = INITIAL_SELECTED_NEWS,
  action: AnyAction
) {
  LoggingService.getInstance().logReducer(action, state);
  switch (action.type) {
    case SELECTED_NEWS_REQUESTED:
      return {
        ...state,
        isFetching: true
      };
    case SELECTED_NEWS_LOADED:
      return {
        ...(action as SelectedNewsLoadedAction).newsItemExt,
        isFetching: false
      };
    default:
      return state;
  }
}
