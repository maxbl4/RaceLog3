import { racesReducer, selectedRaceReducer } from "./race.reducer";
import {
  UNKNOWN_ACTION_TYPE,
  DEFAULT_RACE_ITEM_1,
  DEFAULT_RACE_ITEM_2,
  DEFAULT_RACE_ITEM_EXT,
  DEFAULT_RACE_PARTICIPANT_1,
  DEFAULT_RACE_PARTICIPANT_2
} from "../utils/test.utils";
import {
  RACES_REQUESTED,
  RACES_LOADED,
  SELECTED_RACE_REQUESTED,
  SELECTED_RACE_LOADED
} from "../actions/actions";
import Optional from "optional-js";

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
    expect(raceState.id.isPresent()).toBeFalsy();
    expect(raceState.name.isPresent()).toBeFalsy();
    expect(raceState.date.isPresent()).toBeFalsy();
    expect(raceState.location.isPresent()).toBeFalsy();
    expect(raceState.participants.isPresent()).toBeFalsy();
  });

  it("should return fetching empty state for SELECTED_RACE_REQUESTED action", () => {
    const raceState = selectedRaceReducer(undefined, { type: SELECTED_RACE_REQUESTED });
    expect(raceState.isFetching).toBeTruthy();
    expect(raceState.id.isPresent()).toBeFalsy();
    expect(raceState.name.isPresent()).toBeFalsy();
    expect(raceState.date.isPresent()).toBeFalsy();
    expect(raceState.location.isPresent()).toBeFalsy();
    expect(raceState.participants.isPresent()).toBeFalsy();
  });

  it("should return fetched non-emtpy state for SELECTED_RACE_LOADED action", () => {
    const raceState = selectedRaceReducer(undefined, {
      type: SELECTED_RACE_LOADED,
      raceItemExt: DEFAULT_RACE_ITEM_EXT
    });
    expect(raceState.isFetching).toBeFalsy();
    expect(raceState.id.get()).toEqual(DEFAULT_RACE_ITEM_EXT.id.get());
    expect(raceState.name.get()).toEqual(DEFAULT_RACE_ITEM_EXT.name.get());
    expect(raceState.date.get()).toEqual(DEFAULT_RACE_ITEM_EXT.date.get());
    expect(raceState.location.get()).toEqual(DEFAULT_RACE_ITEM_EXT.location.get());

    expect(raceState.participants.isPresent()).toBeTruthy();
    const items = raceState.participants.orElse([]);
    expect(items).toHaveLength(2);
    expect(items[0]).toEqual(DEFAULT_RACE_PARTICIPANT_1);
    expect(items[1]).toEqual(DEFAULT_RACE_PARTICIPANT_2);
  });
});
