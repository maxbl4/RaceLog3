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
  compareRaces,
  DEFAULT_USER_INFO,
  DEFAULT_RACER_RESULTS_1,
  DEFAULT_RACER_RESULTS_2,
  compareRaceResults,
  compareRaceParticipants
} from "../../test.utils";
import {
  RACES_REQUESTED,
  RACES_LOADED,
  SELECTED_RACE_REQUESTED,
  SELECTED_RACE_LOADED,
  RACES_REQUEST_FAILED,
  SELECTED_RACE_REQUEST_FAILED
} from "../../../model/actions/race.actions";
import Optional from "optional-js";
import { INITIAL_SELECTED_RACE, RaceItemExt, RacerResults } from "../../../model/types/datatypes";
import {
  RACE_PARTICIPANTS_UPDATE_REQUESTED,
  RACE_PARTICIPANTS_UPDATED,
  RACE_PARTICIPANTS_UPDATE_FAILED
} from "../../../model/actions/race.participants.actions";
import {
  RACE_CHANGE_STATE_REQUESTED,
  RACE_CHANGE_STATE_FAILED,
  RACE_CHANGE_STATE_SUCCESS
} from "../../../model/actions/race.state.actions";
import { RaceState } from "../../../model/types/races.model";
import {
  RACE_RESULTS_SUBSCRIPTION_STARTED,
  RACE_RESULTS_SUBSCRIPTION_FAILED,
  RACE_RESULTS_SUBSCRIPTION_DATA_RECEIVED,
  RACE_RESULTS_SUBSCRIPTION_STOPPED
} from "../../../model/actions/race.results.actions";

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
    const raceState = selectedRaceReducer(DEFAULT_RACE_ITEM_EXT, {
      type: SELECTED_RACE_REQUEST_FAILED
    });
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
    compareRaceParticipants(raceState.participants, {
      ...DEFAULT_RACE_ITEM_EXT.participants,
      isFetching: true
    });
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

  it("should return the same race state for RACE_CHANGE_STATE_REQUESTED action", () => {
    const raceState = selectedRaceReducer(DEFAULT_RACE_ITEM_EXT, {
      type: RACE_CHANGE_STATE_REQUESTED,
      raceID: 1,
      state: RaceState.NOT_STARTED
    });
    compareRaceItems(raceState, DEFAULT_RACE_ITEM_EXT);
  });

  it("should return the same race state for RACE_CHANGE_STATE_FAILED action", () => {
    const raceState = selectedRaceReducer(DEFAULT_RACE_ITEM_EXT, {
      type: RACE_CHANGE_STATE_FAILED
    });
    compareRaceItems(raceState, DEFAULT_RACE_ITEM_EXT);
  });

  it("should return new race state for RACE_CHANGE_STATE_SUCCESS action", () => {
    const state = RaceState.STARTED;
    const raceState = selectedRaceReducer(DEFAULT_RACE_ITEM_EXT, {
      type: RACE_CHANGE_STATE_SUCCESS,
      raceID: 1,
      state
    });
    compareRaceItems(raceState, {
      ...DEFAULT_RACE_ITEM_EXT,
      state
    });
  });

  it("should return fitching (true) state with emtpy results for RACE_RESULTS_SUBSCRIPTION_STARTED action", () => {
    const raceState = selectedRaceReducer(DEFAULT_RACE_ITEM_EXT, {
      type: RACE_RESULTS_SUBSCRIPTION_STARTED,
      userUUID: DEFAULT_USER_INFO.uuid,
      raceID: 1
    });
    expect(raceState.results.isFetching).toBeTruthy();
    expect(raceState.results.items.isPresent()).toBeFalsy();
  });

  it("should return fitching (true) state with some results for RACE_RESULTS_SUBSCRIPTION_DATA_RECEIVED action", () => {
    const reduceAndCheck = (state: RaceItemExt, data: Optional<RacerResults[]>): RaceItemExt => {
      const raceState = selectedRaceReducer(state, {
        type: RACE_RESULTS_SUBSCRIPTION_DATA_RECEIVED,
        data
      });
      expect(raceState.results.isFetching).toBeTruthy();
      compareRaceResults(raceState.results, {
        isFetching: true,
        items: data
      });
      return raceState;
    };

    let state = reduceAndCheck(
      DEFAULT_RACE_ITEM_EXT,
      Optional.of([
        {
          ...DEFAULT_RACER_RESULTS_1,
          position: Optional.of(1),
          laps: Optional.of(17)
        },
        {
          ...DEFAULT_RACER_RESULTS_2,
          position: Optional.of(2),
          laps: Optional.of(17)
        }
      ])
    );
    reduceAndCheck(
      state,
      Optional.of([
        {
          ...DEFAULT_RACER_RESULTS_1,
          position: Optional.of(2),
          laps: Optional.of(23)
        },
        {
          ...DEFAULT_RACER_RESULTS_2,
          position: Optional.of(1),
          laps: Optional.of(22)
        }
      ])
    );
  });

  it("should return fitched (false) state with emtpy results for RACE_RESULTS_SUBSCRIPTION_FAILED action", () => {
    const raceState = selectedRaceReducer(DEFAULT_RACE_ITEM_EXT, {
      type: RACE_RESULTS_SUBSCRIPTION_FAILED
    });
    expect(raceState.results.isFetching).toBeFalsy();
    expect(raceState.results.items.isPresent()).toBeFalsy();
  });

  it("should return fitched (false) state with some results for RACE_RESULTS_SUBSCRIPTION_STOPPED action", () => {
    const raceState = selectedRaceReducer(DEFAULT_RACE_ITEM_EXT, {
      type: RACE_RESULTS_SUBSCRIPTION_STOPPED,
      userUUID: DEFAULT_USER_INFO.uuid,
      raceID: 1
    });
    expect(raceState.results.isFetching).toBeFalsy();
    compareRaceResults(raceState.results, {
      isFetching: false,
      items: DEFAULT_RACE_ITEM_EXT.results.items
    });
  });
});
