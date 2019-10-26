import { put, takeLatest, call } from "redux-saga/effects";
import {
  USER_REGISTRATION,
  USER_LOGIN,
  UserInfoRequestAction,
  userAuthorizedOk,
  userAuthorizedFail,
  USER_LOGOUT
} from "../actions/actions";
import { delay } from "./sagas";
import Optional from "optional-js";
import { UserInfo } from "../types/datatypes";
import { LoggingService } from "../utils/logging-service";
import { login, aboutMe, logout } from "../api/cms.api";
import { INITIAL_USER_INFO } from "../reducers/user.reducer";

function* tryRegister(action: UserInfoRequestAction) {
  try {
    yield delay(1000);
    yield put(
      userAuthorizedOk({
        uuid: INITIAL_USER_INFO.uuid,
        name: action.userInfo.name,
        password: action.userInfo.password,
        email: action.userInfo.email,
        role: action.userInfo.role
      })
    );
  } catch (e) {
    LoggingService.getInstance().logSagaError(e, action);
    yield put(userAuthorizedFail());
  }
}

function* tryLogin(action: UserInfoRequestAction) {
  try {
    yield call(login, action.userInfo.email, action.userInfo.password);
    const userInfo: Optional<UserInfo> = yield call(aboutMe);
    yield put(
      userAuthorizedOk(
        userInfo.orElseThrow(() => new Error("Empty response from server for login action"))
      )
    );
  } catch (e) {
    LoggingService.getInstance().logSagaError(e, action);
    yield put(userAuthorizedFail());
  }
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

export function* userLogoutSaga() {
  yield takeLatest(USER_LOGOUT, tryLogout);
}
