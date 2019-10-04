import { put, takeLatest } from "redux-saga/effects";
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
import { RaceStatistics } from "../types/datatypes";
import { LoggingService } from "../utils/logging-service";

function* tryRegister(action: UserInfoRequestAction) {
  try {
    yield delay(1000);
    yield put(
      userAuthorizedOk({
        id: 1,
        name: action.userInfo.name,
        password: action.userInfo.password,
        email: action.userInfo.email,
        bikeNumber: action.userInfo.bikeNumber,
        role: action.userInfo.role,
        classCompetition: action.userInfo.classCompetition,
        raceStatistics: Optional.empty<RaceStatistics[]>()
      })
    );
  } catch (e) {
    LoggingService.getInstance().logSagaError(e, action);
    yield put(userAuthorizedFail());
  }
}

function* tryLogin(action: UserInfoRequestAction) {
  try {
    yield delay(1000);
    yield put(
      userAuthorizedOk({
        id: 1,
        name: "Дима",
        password: action.userInfo.password,
        email: action.userInfo.email,
        bikeNumber: 87,
        role: "admin",
        classCompetition: "500cm3",
        raceStatistics: Optional.empty<RaceStatistics[]>()
      })
    );
  } catch (e) {
    LoggingService.getInstance().logSagaError(e, action);
    yield put(userAuthorizedFail());
  }
}

function* tryLogout(action: UserInfoRequestAction) {
  try {
    yield delay(1000);
    // send here logout message to server
  } catch (e) {
    LoggingService.getInstance().logSagaError(e, action);
    // yield put(userAuthorizedFail());
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
