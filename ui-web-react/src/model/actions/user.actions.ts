import { AnyAction } from "redux";
import { UserInfo } from "../types/datatypes";
import Optional from "optional-js";

export const USER_REGISTRATION = "USER_REGISTRATION";
export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGIN_ON_START = "USER_LOGIN_ON_START";
export const USER_LOGOUT = "USER_LOGOUT";
export const USER_AUTHORIZED_OK = "USER_AUTHORIZED_OK";
export const USER_AUTHORIZED_FAIL = "USER_AUTHORIZED_FAIL";

export type UserInfoRequestAction = AnyAction & {
  userInfo: UserInfo;
};
export type UserInfoAuthorizedAction = AnyAction & {
  userInfo: Optional<UserInfo>;
};

export const userReqistration = (userInfo: UserInfo): UserInfoRequestAction => ({
  type: USER_REGISTRATION,
  userInfo: userInfo
});
export const userLogin = (userInfo: UserInfo): UserInfoRequestAction => ({
  type: USER_LOGIN,
  userInfo: userInfo
});
export const userLoginOnStart = (): AnyAction => ({
  type: USER_LOGIN_ON_START
});
export const userLogout = (userInfo: UserInfo): UserInfoRequestAction => ({
  type: USER_LOGOUT,
  userInfo: userInfo
});
export const userAuthorizedOk = (userInfo: UserInfo): UserInfoAuthorizedAction => ({
  type: USER_AUTHORIZED_OK,
  userInfo: Optional.of(userInfo)
});
export const userAuthorizedFail = (): AnyAction => ({
  type: USER_AUTHORIZED_FAIL
});
