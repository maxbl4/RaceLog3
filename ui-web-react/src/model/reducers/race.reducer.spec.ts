import { racesReducer, selectedRaceReducer, INITIAL_SELECTED_RACE } from "./race.reducer";
import {
  UNKNOWN_ACTION_TYPE,
  DEFAULT_RACE_ITEM_1,
  DEFAULT_RACE_ITEM_2,
  DEFAULT_RACE_ITEM_EXT
} from "../utils/test.utils";
import {
  RACES_REQUESTED,
  RACES_LOADED,
  SELECTED_RACE_REQUESTED,
  SELECTED_RACE_LOADED
} from "../actions/actions";
import Optional from "optional-js";
import { RaceItemExt } from "../types/datatypes";

describe("race.reducer - racesReducer", () => {
  it("should return default state for unknown action", () => {
    const raceState = racesReducer(undefined, { type: UNKNOWN_ACTION_TYPE });
    expect(raceState.isFetching).toBeFalsy();
    expect(raceState.items.isPresent()).toBeFalsy();
  });

  it("should return fetching empty state for RACES_REQUESTED action", () => {
    const raceState = racesReducer(undefined, { type: RACES_REQUESTED });
    expect(raceState.isFetching).toBeTruthy();
    expect(raceState.items.isPresent()).toBeFalsy();
  });

  it("should return fetched non-emtpy state for RACES_LOADED action", () => {
    let items = [DEFAULT_RACE_ITEM_1, DEFAULT_RACE_ITEM_2];
    const raceState = racesReducer(undefined, { type: RACES_LOADED, items: Optional.of(items) });
    expect(raceState.isFetching).toBeFalsy();
    expect(raceState.items.isPresent()).toBeTruthy();
    items = raceState.items.orElse([]);
    expect(items).toHaveLength(2);
    expect(items[0]).toEqual(DEFAULT_RACE_ITEM_1);
    expect(items[1]).toEqual(DEFAULT_RACE_ITEM_2);
  });
});

describe("race.reducer - selectedRaceReducer", () => {
  it("should return default state for unknown action", () => {
    const raceState = selectedRaceReducer(undefined, { type: UNKNOWN_ACTION_TYPE });
    expect(raceState.isFetching).toBeFalsy();
    compareRaceItems(raceState, INITIAL_SELECTED_RACE);
  });

  it("should return fetching empty state for SELECTED_RACE_REQUESTED action", () => {
    const raceState = selectedRaceReducer(undefined, { type: SELECTED_RACE_REQUESTED });
    expect(raceState.isFetching).toBeTruthy();
    compareRaceItems(raceState, INITIAL_SELECTED_RACE);
  });

  it("should return fetched non-emtpy state for SELECTED_RACE_LOADED action", () => {
    const raceState = selectedRaceReducer(undefined, {
      type: SELECTED_RACE_LOADED,
      raceItemExt: DEFAULT_RACE_ITEM_EXT
    });
    expect(raceState.isFetching).toBeFalsy();
    compareRaceItems(raceState, DEFAULT_RACE_ITEM_EXT);
  });

  function compareRaceItems(ri1: RaceItemExt, ri2: RaceItemExt): void {
    expect(ri1.id).toEqual(ri2.id);
    expect(ri1.name).toEqual(ri2.name);
    expect(ri1.date).toEqual(ri2.date);
    expect(ri1.location).toEqual(ri2.location);
    expect(ri1.description).toEqual(ri2.description);
    if (ri1.participants.isPresent()) {
      const items1 = ri1.participants.orElse([]);
      const items2 = ri2.participants.orElse([]);
      expect(items1.length).toEqual(items2.length);
      for (let i = 0; i < items1.length; i++) {
        expect(items1[0]).toEqual(items2[0]);
      }
    } else {
      expect(ri2.participants.isPresent()).toBeFalsy();
    }
  }
});
