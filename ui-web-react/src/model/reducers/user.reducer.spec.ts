import { userReducer, INITIAL_USER_INFO } from "./user.reducer";
import { UNKNOWN_ACTION_TYPE, DEFAULT_USER_INFO } from "../utils/test.utils";
import {
  USER_LOGIN,
  USER_REGISTRATION,
  USER_LOGOUT,
  USER_AUTHORIZED_FAIL,
  USER_AUTHORIZED_OK
} from "../actions/actions";
import Optional from "optional-js";

describe("user.reducer - userReducer", () => {
  it("should return default state for unknown action", () => {
    const raceState = userReducer(undefined, { type: UNKNOWN_ACTION_TYPE });
    expect(raceState.isFetching).toBeFalsy();
    expect(raceState.info.isPresent()).toBeFalsy();
  });

  it("should return fetching empty state for USER_LOGIN action", () => {
    const raceState = userReducer(undefined, { type: USER_LOGIN });
    expect(raceState.isFetching).toBeTruthy();
    expect(raceState.info.isPresent()).toBeFalsy();
  });

  it("should return fetching empty state for USER_REGISTRATION action", () => {
    const raceState = userReducer(undefined, { type: USER_REGISTRATION });
    expect(raceState.isFetching).toBeTruthy();
    expect(raceState.info.isPresent()).toBeFalsy();
  });

  it("should return fetched empty state for USER_LOGOUT action", () => {
    const raceState = userReducer(undefined, { type: USER_LOGOUT });
    expect(raceState.isFetching).toBeFalsy();
    expect(raceState.info.isPresent()).toBeFalsy();
  });

  it("should return fetched empty state for USER_AUTHORIZED_FAIL action", () => {
    const raceState = userReducer(undefined, { type: USER_AUTHORIZED_FAIL });
    expect(raceState.isFetching).toBeFalsy();
    expect(raceState.info.isPresent()).toBeFalsy();
  });

  it("should return fetched non-empty state for USER_AUTHORIZED_OK action", () => {
    const raceState = userReducer(undefined, {
      type: USER_AUTHORIZED_OK,
      userInfo: Optional.of(DEFAULT_USER_INFO)
    });
    expect(raceState.isFetching).toBeFalsy();
    expect(raceState.info.isPresent()).toBeTruthy();
    const user = raceState.info.orElse(INITIAL_USER_INFO);
    expect(user.id).toEqual(DEFAULT_USER_INFO.id);
    expect(user.name).toEqual(DEFAULT_USER_INFO.name);
    expect(user.password).toEqual(DEFAULT_USER_INFO.password);
    expect(user.email).toEqual(DEFAULT_USER_INFO.email);
    expect(user.bikeNumber).toEqual(DEFAULT_USER_INFO.bikeNumber);
    expect(user.role).toEqual(DEFAULT_USER_INFO.role);
    expect(user.classCompetition).toEqual(DEFAULT_USER_INFO.classCompetition);
    expect(user.raceStatistics.isPresent()).toBeFalsy();
  });
});
