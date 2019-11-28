import { User, UserInfo } from "../types/datatypes";
import Optional from "optional-js";
import { AnyAction } from "redux";
import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTRATION,
  USER_AUTHORIZED_FAIL,
  USER_AUTHORIZED_OK,
  UserInfoAuthorizedAction
} from "../actions/user.actions";
import { LoggingService } from "../utils/logging-service";

export const INITIAL_USER: User = {
  isFetching: false,
  info: Optional.empty<UserInfo>()
};

export const INITIAL_USER_INFO: UserInfo = {
  uuid: "",
  name: "",
  email: "",
  password: "",
  role: "user"
};

export function userReducer(state: User = INITIAL_USER, action: AnyAction) {
  LoggingService.getInstance().logReducer(action, state);
  switch (action.type) {
    case USER_LOGIN:
    case USER_REGISTRATION:
      return {
        isFetching: true,
        info: Optional.empty<UserInfo>()
      };
    case USER_LOGOUT:
    case USER_AUTHORIZED_FAIL:
      return {
        isFetching: false,
        info: Optional.empty<UserInfo>()
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
