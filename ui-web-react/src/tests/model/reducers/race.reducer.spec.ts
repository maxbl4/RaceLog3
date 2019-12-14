import { racesReducer, selectedRaceReducer } from "../../../model/reducers/race.reducer";
import {
  UNKNOWN_ACTION_TYPE,
  DEFAULT_RACE_ITEM_1,
  DEFAULT_RACE_ITEM_2,
  DEFAULT_RACE_ITEM_EXT,
  compareRaceItems,
  DEFAULT_RACER_PROFILE_3,
  DEFAULT_RACER_PROFILE_1,
  DEFAULT_RACER_PROFILE_2,
  DEFAULT_RACES,
  compareRaces
} from "../../test.utils";
import {
  RACES_REQUESTED,
  RACES_LOADED,
  SELECTED_RACE_REQUESTED,
  SELECTED_RACE_LOADED,
  RACE_PARTICIPANTS_UPDATE_REQUESTED,
  RACE_PARTICIPANTS_UPDATE_FAILED,
  RACE_PARTICIPANTS_UPDATED,
  RACES_REQUEST_FAILED,
  SELECTED_RACE_REQUEST_FAILED
} from "../../../model/actions/race.actions";
import Optional from "optional-js";
import { INITIAL_SELECTED_RACE } from "../../../model/types/datatypes";

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

  it("should return the same state for RACES_REQUEST_FAILED and isFetching='false' action", () => {
    const raceState = racesReducer(DEFAULT_RACES, { type: RACES_REQUEST_FAILED });
    expect(raceState.isFetching).toBeFalsy();
    expect(raceState.items.isPresent()).toBeTruthy();
    compareRaces(raceState, DEFAULT_RACES);
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

  it("should return the same state and isFetching='false' for SELECTED_RACE_REQUEST_FAILED action", () => {
    const raceState = selectedRaceReducer(DEFAULT_RACE_ITEM_EXT, { type: SELECTED_RACE_REQUEST_FAILED });
    expect(raceState.isFetching).toBeFalsy();
    compareRaceItems(raceState, DEFAULT_RACE_ITEM_EXT);
  });

  it("should return fetched non-emtpy state for SELECTED_RACE_LOADED action", () => {
    const raceState = selectedRaceReducer(undefined, {
      type: SELECTED_RACE_LOADED,
      raceItemExt: DEFAULT_RACE_ITEM_EXT
    });
    expect(raceState.isFetching).toBeFalsy();
    compareRaceItems(raceState, DEFAULT_RACE_ITEM_EXT);
  });

  it("should return the same state with isFetching = 'true' for RACE_PARTICIPANTS_UPDATE_REQUESTED action", () => {
    const raceState = selectedRaceReducer(DEFAULT_RACE_ITEM_EXT, {
      type: RACE_PARTICIPANTS_UPDATE_REQUESTED,
      raceID: 1,
      itemsAdded: Optional.of([DEFAULT_RACER_PROFILE_3]),
      itemsRemoved: Optional.of([DEFAULT_RACER_PROFILE_1])
    });
    expect(!!raceState.participants).toBeTruthy();
    expect(raceState.participants.isFetching).toBeTruthy();
    compareRaceItems(raceState, DEFAULT_RACE_ITEM_EXT);
  });

  it("should update participants list for RACE_PARTICIPANTS_UPDATED action", () => {
    const raceState = selectedRaceReducer(DEFAULT_RACE_ITEM_EXT, {
      type: RACE_PARTICIPANTS_UPDATED,
      raceID: 1,
      itemsAdded: Optional.of([DEFAULT_RACER_PROFILE_3]),
      itemsRemoved: Optional.of([DEFAULT_RACER_PROFILE_1])
    });
    expect(!!raceState.participants).toBeTruthy();
    expect(raceState.participants.isFetching).toBeFalsy();
    compareRaceItems(raceState, {
      ...DEFAULT_RACE_ITEM_EXT,
      participants: {
        ...DEFAULT_RACE_ITEM_EXT.participants,
        items: Optional.of([DEFAULT_RACER_PROFILE_2, DEFAULT_RACER_PROFILE_3])
      }
    });
  });

  it("should return the same state with isFetching = 'false' for RACE_PARTICIPANTS_UPDATE_FAILED action", () => {
    const raceState = selectedRaceReducer(DEFAULT_RACE_ITEM_EXT, {
      type: RACE_PARTICIPANTS_UPDATE_FAILED,
      raceID: 1
    });
    expect(!!raceState.participants).toBeTruthy();
    expect(raceState.participants.isFetching).toBeFalsy();
    compareRaceItems(raceState, DEFAULT_RACE_ITEM_EXT);
  });
});
