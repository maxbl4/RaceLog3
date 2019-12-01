import { userReducer } from "../../../model/reducers/user.reducer";
import { UNKNOWN_ACTION_TYPE, DEFAULT_USER_INFO } from "../../test.utils";
import {
  USER_LOGIN,
  USER_REGISTRATION,
  USER_LOGOUT,
  USER_AUTHORIZED_FAIL,
  USER_AUTHORIZED_OK
} from "../../../model/actions/user.actions";
import Optional from "optional-js";
import { INITIAL_USER_INFO } from "../../../model/types/datatypes";

describe("user.reducer - userReducer", () => {
  it("should return default state for unknown action", () => {
    const userState = userReducer(undefined, { type: UNKNOWN_ACTION_TYPE });
    expect(userState.isFetching).toBeFalsy();
    expect(userState.info.isPresent()).toBeFalsy();
  });

  it("should return fetching empty state for USER_LOGIN action", () => {
    const userState = userReducer(undefined, { type: USER_LOGIN });
    expect(userState.isFetching).toBeTruthy();
    expect(userState.info.isPresent()).toBeFalsy();
  });

  it("should return fetching empty state for USER_REGISTRATION action", () => {
    const userState = userReducer(undefined, { type: USER_REGISTRATION });
    expect(userState.isFetching).toBeTruthy();
    expect(userState.info.isPresent()).toBeFalsy();
  });

  it("should return fetched empty state for USER_LOGOUT action", () => {
    const userState = userReducer(undefined, { type: USER_LOGOUT });
    expect(userState.isFetching).toBeFalsy();
    expect(userState.info.isPresent()).toBeFalsy();
  });

  it("should return fetched empty state for USER_AUTHORIZED_FAIL action", () => {
    const userState = userReducer(undefined, { type: USER_AUTHORIZED_FAIL });
    expect(userState.isFetching).toBeFalsy();
    expect(userState.info.isPresent()).toBeFalsy();
  });

  it("should return fetched non-empty state for USER_AUTHORIZED_OK action", () => {
    const userState = userReducer(undefined, {
      type: USER_AUTHORIZED_OK,
      userInfo: Optional.of(DEFAULT_USER_INFO)
    });
    expect(userState.isFetching).toBeFalsy();
    expect(userState.info.isPresent()).toBeTruthy();
    const user = userState.info.orElse(INITIAL_USER_INFO);
    expect(user.uuid).toEqual(DEFAULT_USER_INFO.uuid);
    expect(user.name).toEqual(DEFAULT_USER_INFO.name);
    expect(user.password).toEqual(DEFAULT_USER_INFO.password);
    expect(user.email).toEqual(DEFAULT_USER_INFO.email);
    expect(user.role).toEqual(DEFAULT_USER_INFO.role);
  });
});
