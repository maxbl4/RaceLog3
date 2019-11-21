import { put, takeLatest, call } from "redux-saga/effects";
import {
  USER_REGISTRATION,
  USER_LOGIN,
  UserInfoRequestAction,
  userAuthorizedOk,
  userAuthorizedFail,
  USER_LOGOUT,
  USER_LOGIN_ON_START,
  alertsShow,
  racerProfilesRequestedAll
} from "../actions/actions";
import Optional from "optional-js";
import { UserInfo, Alert, AlertType } from "../types/datatypes";
import { LoggingService } from "../utils/logging-service";
import { login, aboutMe, logout, register } from "../api/cms.api";
import { getNextAlertID } from "../utils/constants";

function createAuthorizationFailAlert(rejectReason: string): Alert {
  return {
    id: getNextAlertID(),
    type: AlertType.ERROR,
    header: "Ошибка авторизации",
    content: rejectReason
  };
}

function* tryRegister(action: UserInfoRequestAction) {
  try {
    const userInfoOpt: Optional<UserInfo> = yield call(register, action.userInfo);
    userInfoOpt.orElseThrow(
      () => new Error(`Cannot create user with name "${action.userInfo.name}"`)
    );
    yield tryLoginAndGetUserInfo(action.userInfo);
  } catch (e) {
    LoggingService.getInstance().logSagaError(e, action);
    yield put(userAuthorizedFail());
    yield put(alertsShow(createAuthorizationFailAlert("Не удалось зарегистрироваться")));
  }
}

function* tryLogin(action: UserInfoRequestAction) {
  try {
    yield tryLoginAndGetUserInfo(action.userInfo);
  } catch (e) {
    LoggingService.getInstance().logSagaError(e, action);
    yield put(userAuthorizedFail());
    yield put(alertsShow(createAuthorizationFailAlert("Не удалось залогиниться")));
  }
}

function* tryLoginAndGetUserInfo(userInfo: UserInfo) {
  yield call(login, userInfo.email, userInfo.password);
  yield tryGetUserInfo();
}

function* tryLoginOnStart() {
  try {
    yield tryGetUserInfo();
  } catch (e) {
    // No need to do something here
  }
}

function* tryGetUserInfo() {
  const userInfoOpt: Optional<UserInfo> = yield call(aboutMe);
  const userInfo: UserInfo = userInfoOpt.orElseThrow(
    () => new Error("Empty response from server for login action")
  );
  yield put(userAuthorizedOk(userInfo));
  yield put(racerProfilesRequestedAll(userInfo.uuid));
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
