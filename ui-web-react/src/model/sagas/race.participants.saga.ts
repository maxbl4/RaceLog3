import { call, put, takeEvery } from "redux-saga/effects";
import { alertsShow } from "../actions/alerts.actions";
import {
  RACE_PARTICIPANTS_UPDATE_REQUESTED,
  RaceParticipantsAction,
  raceParticipantsUpdated,
  raceParticipantsUpdateFailed
} from "../actions/race.participants.actions";
import { LoggingService } from "../utils/logging-service";
import { AlertType, Alert } from "../types/datatypes";
import { getNextAlertID } from "../utils/constants";
import { updateRaceParticipantsApiRequest } from "../api/transport";

function* tryUpdateRaceParticipants(action: RaceParticipantsAction) {
  try {
    yield call(
      updateRaceParticipantsApiRequest,
      action.userUUID,
      action.raceID,
      action.itemsAdded.orElse([]),
      action.itemsRemoved.orElse([])
    );
    yield put(
      raceParticipantsUpdated(
        action.userUUID,
        action.raceID,
        action.itemsAdded.orElse([]),
        action.itemsRemoved.orElse([])
      )
    );
    yield put(
      alertsShow(createRaceParticipantsAlert(AlertType.SUCCESS, "Регистрация прошла успешно"))
    );
  } catch (e) {
    LoggingService.getInstance().logSagaError(e, action);
    yield put(raceParticipantsUpdateFailed(action.raceID));
    yield put(
      alertsShow(createRaceParticipantsAlert(AlertType.ERROR, "Не удалось зарегистрироваться"))
    );
  }
}

function createRaceParticipantsAlert(type: AlertType, content: string): Alert {
  return {
    id: getNextAlertID(),
    type,
    header: "Регистрация на гонку",
    content
  };
}

export function* raceParticipantsUpdateRequestSaga() {
  yield takeEvery(RACE_PARTICIPANTS_UPDATE_REQUESTED, tryUpdateRaceParticipants);
}
