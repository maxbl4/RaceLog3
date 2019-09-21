import { User, UserInfo } from "../types/datatypes";
import { none } from "../utils/optional";
import { AnyAction } from "redux";
import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTRATION,
  USER_AUTHORIZED_FAIL,
  USER_AUTHORIZED_OK,
  UserInfoAuthorizedAction,
} from "../actions/actions";
import { DEFAULT_ID } from "../utils/constants";

export const INITIAL_USER: User = {
  isFetching: false,
  info: none
};

export const INITIAL_USER_INFO: UserInfo = {
  id: DEFAULT_ID,
  name: "",
  email: "",
  password: "",
  bikeNumber: DEFAULT_ID,
  role: "user",
  classCompetition: "125cm3",
  raceStatistics: none
};

export function userReducer(state: User = INITIAL_USER, action: AnyAction) {
  console.log(JSON.stringify(action));
  switch (action.type) {
    case USER_LOGIN:
    case USER_REGISTRATION:
      return {
        isFetching: true,
        info: none
      };
    case USER_LOGOUT:
      return {
        isFetching: false,
        info: none
      };
    case USER_AUTHORIZED_FAIL:
      return {
        isFetching: false,
        info: none
      };
    case USER_AUTHORIZED_OK:
      return {
        isFetching: false,
        info: (action as UserInfoAuthorizedAction).userInfo
      };
    default:
      return state;
  }
}
