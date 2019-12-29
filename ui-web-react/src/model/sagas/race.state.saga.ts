import { call, put, takeEvery } from "redux-saga/effects";
import {
  RACE_CHANGE_STATE_REQUESTED,
  RaceChangeStateAction,
  raceChangeStateSuccess,
  raceChangeStateFailed
} from "../actions/race.actions";
import { changeRaceStateApiRequest } from "../api/transport";
import { LoggingService } from "../utils/logging-service";
import { getNextAlertID } from "../utils/constants";
import { AlertType, Alert } from "../types/datatypes";
import { alertsShow } from "../actions/alerts.actions";
import { getRaceStateName } from "../types/races.model";

function* tryChangeRaceState(action: RaceChangeStateAction) {
  try {
    yield call(changeRaceStateApiRequest, action.raceID, action.state);
    yield put(raceChangeStateSuccess(action.raceID, action.state));
    yield put(
      alertsShow(
        createAlert(AlertType.SUCCESS, "Состояние изменено на " + getRaceStateName(action.state))
      )
    );
  } catch (e) {
    LoggingService.getInstance().logSagaError(e, action);
    yield put(raceChangeStateFailed());
    yield put(
      alertsShow(
        createAlert(
          AlertType.ERROR,
          "Не удалось изменить состояние на " + getRaceStateName(action.state)
        )
      )
    );
  }
}

function createAlert(type: AlertType, content: string): Alert {
  return {
    id: getNextAlertID(),
    type,
    header: "Состояние гонки",
    content
  };
}

export function* raceChangeStateSaga() {
  yield takeEvery(RACE_CHANGE_STATE_REQUESTED, tryChangeRaceState);
}
