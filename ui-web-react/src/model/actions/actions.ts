import { AnyAction } from "redux";
import { NewsItem, RaceItem } from "../types/datatypes";

export const NEWS_REQUESTED = "NEWS_REQUESTED";
export const NEWS_LOADED = "NEWS_LOADED";

export const RACES_REQUESTED = "RACES_REQUESTED";
export const RACES_LOADED = "RACES_LOADED";

export type NewsRequestedAction = AnyAction;
export type NewsLoadedAction = AnyAction & {
  items: NewsItem[];
};

export type RacesRequestedAction = AnyAction;
export type RacesLoadedAction = AnyAction & {
  items: RaceItem[];
};

export const newsRequested = (): NewsRequestedAction => ({
  type: NEWS_REQUESTED
});
export const newsLoaded = (items: NewsItem[]): NewsLoadedAction => ({
  type: NEWS_LOADED,
  items: items
});

export const racesRequested = (): RacesRequestedAction => ({
  type: RACES_REQUESTED
});
export const racesLoaded = (items: RaceItem[]): RacesLoadedAction => ({
  type: RACES_LOADED,
  items: items
});
