import { newsReducer, selectedNewsReducer } from "./news.reducer";
import {
  UNKNOWN_ACTION_TYPE,
  DEFAULT_NEWS_ITEM_1,
  DEFAULT_NEWS_ITEM_2,
  DEFAULT_NEWS_ITEM_EXT
} from "../utils/test.utils";
import {
  NEWS_REQUESTED,
  NEWS_LOADED,
  SELECTED_NEWS_REQUESTED,
  SELECTED_NEWS_LOADED
} from "../actions/actions";
import Optional from "optional-js";

describe("news.reducer - newsReducer", () => {
  it("should return default state for unknown action", () => {
    const newsState = newsReducer(undefined, { type: UNKNOWN_ACTION_TYPE });
    expect(newsState.isFetching).toBeFalsy();
    expect(newsState.items.isPresent()).toBeFalsy();
  });

  it("should return fetching empty state for NEWS_REQUESTED action", () => {
    const newsState = newsReducer(undefined, { type: NEWS_REQUESTED });
    expect(newsState.isFetching).toBeTruthy();
    expect(newsState.items.isPresent()).toBeFalsy();
  });

  it("should return fetched non-emtpy state for NEWS_LOADED action", () => {
    let items = [DEFAULT_NEWS_ITEM_1, DEFAULT_NEWS_ITEM_2];
    const newsState = newsReducer(undefined, { type: NEWS_LOADED, items: Optional.of(items) });
    expect(newsState.isFetching).toBeFalsy();
    expect(newsState.items.isPresent()).toBeTruthy();
    items = newsState.items.orElse([]);
    expect(items).toHaveLength(2);
    expect(items[0]).toEqual(DEFAULT_NEWS_ITEM_1);
    expect(items[1]).toEqual(DEFAULT_NEWS_ITEM_2);
  });
});

describe("news.reducer - selectedNewsReducer", () => {
  it("should return default state for unknown action", () => {
    const newsState = selectedNewsReducer(undefined, { type: UNKNOWN_ACTION_TYPE });
    expect(newsState.isFetching).toBeFalsy();
    expect(newsState.id.isPresent()).toBeFalsy();
    expect(newsState.header.isPresent()).toBeFalsy();
    expect(newsState.date.isPresent()).toBeFalsy();
    expect(newsState.text.isPresent()).toBeFalsy();
  });

  it("should return fetching empty state for SELECTED_NEWS_REQUESTED action", () => {
    const newsState = selectedNewsReducer(undefined, { type: SELECTED_NEWS_REQUESTED });
    expect(newsState.isFetching).toBeTruthy();
    expect(newsState.id.isPresent()).toBeFalsy();
    expect(newsState.header.isPresent()).toBeFalsy();
    expect(newsState.date.isPresent()).toBeFalsy();
    expect(newsState.text.isPresent()).toBeFalsy();
  });

  it("should return fetched non-emtpy state for SELECTED_NEWS_LOADED action", () => {
    const newsState = selectedNewsReducer(undefined, {
      type: SELECTED_NEWS_LOADED,
      newsItemExt: DEFAULT_NEWS_ITEM_EXT
    });
    expect(newsState.isFetching).toBeFalsy();
    expect(newsState.id.get()).toEqual(DEFAULT_NEWS_ITEM_EXT.id.get());
    expect(newsState.header.get()).toEqual(DEFAULT_NEWS_ITEM_EXT.header.get());
    expect(newsState.date.get()).toEqual(DEFAULT_NEWS_ITEM_EXT.date.get());
    expect(newsState.text.get()).toEqual(DEFAULT_NEWS_ITEM_EXT.text.get());
  });
});
