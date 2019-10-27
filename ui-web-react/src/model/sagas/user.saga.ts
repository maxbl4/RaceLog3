import { put, takeLatest, call } from "redux-saga/effects";
import {
  USER_REGISTRATION,
  USER_LOGIN,
  UserInfoRequestAction,
  userAuthorizedOk,
  userAuthorizedFail,
  USER_LOGOUT,
  USER_LOGIN_ON_START
} from "../actions/actions";
import Optional from "optional-js";
import { UserInfo } from "../types/datatypes";
import { LoggingService } from "../utils/logging-service";
import { login, aboutMe, logout, register } from "../api/cms.api";

function* tryRegister(action: UserInfoRequestAction) {
  try {
    const userInfoOpt: Optional<UserInfo> = yield call(register, action.userInfo);
    userInfoOpt.orElseThrow(
      () => new Error(`Cannot create user with name "${action.userInfo.name}"`)
    );
    tryLoginAndGetUserInfo(action.type);
  } catch (e) {
    LoggingService.getInstance().logSagaError(e, action);
    yield put(userAuthorizedFail());
  }
}

function* tryLogin(action: UserInfoRequestAction) {
  try {
    tryLoginAndGetUserInfo(action.userInfo);
  } catch (e) {
    LoggingService.getInstance().logSagaError(e, action);
    yield put(userAuthorizedFail());
  }
}

function* tryLoginAndGetUserInfo(userInfo: UserInfo) {
  yield call(login, userInfo.email, userInfo.password);
  tryGetUserInfo();
}

function* tryLoginOnStart() {
  try {
    tryGetUserInfo();
  } catch (e) {
    LoggingService.getInstance().logSagaError(e);
    yield put(userAuthorizedFail());
  }
}

function* tryGetUserInfo() {
  const userInfo: Optional<UserInfo> = yield call(aboutMe);
  yield put(
    userAuthorizedOk(
      userInfo.orElseThrow(() => new Error("Empty response from server for login action"))
    )
  );
}

function* tryLogout(action: UserInfoRequestAction) {
  try {
    yield call(logout);
  } catch (e) {
    LoggingService.getInstance().logSagaError(e, action);
  }
}

export function* userRegistrationSaga() {
  yield takeLatest(USER_REGISTRATION, tryRegister);
}

export function* userLoginSaga() {
  yield takeLatest(USER_LOGIN, tryLogin);
}

export function* userLoginOnStartSaga() {
  yield takeLatest(USER_LOGIN_ON_START, tryLoginOnStart);
}

export function* userLogoutSaga() {
  yield takeLatest(USER_LOGOUT, tryLogout);
}
