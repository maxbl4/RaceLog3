import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
import { alertsShow } from "../actions/alerts.actions";
import {
  RACES_REQUESTED,
  racesLoaded,
  SELECTED_RACE_REQUESTED,
  selectedRaceLoaded,
  SelectedRaceRequestedAction,
  RACE_PARTICIPANTS_UPDATE_REQUESTED,
  RaceParticipantsAction,
  raceParticipantsUpdated,
  raceParticipantsUpdateFailed
} from "../actions/race.actions";
import Optional from "optional-js";
import { LoggingService } from "../utils/logging-service";
import { AlertType, Alert, RaceItem, RaceItemExt } from "../types/datatypes";
import { getNextAlertID } from "../utils/constants";
import {
  requestRacesApiRequest,
  requestSelectedRaceApiRequest,
  updateRaceParticipantsApiRequest
} from "../api/transport";

function* fetchRaces() {
  try {
    const races: Optional<RaceItem[]> = yield call(requestRacesApiRequest);
    yield put(racesLoaded(races.orElse([])));
  } catch (e) {
    LoggingService.getInstance().logSagaError(e);
  }
}

function* fetchSelectedRace(action: SelectedRaceRequestedAction) {
  try {
    const race: Optional<RaceItemExt> = yield call(requestSelectedRaceApiRequest, action.id);
    yield put(selectedRaceLoaded(race.orElseThrow(() => new Error("Невозможно получить данные"))));
  } catch (e) {
    LoggingService.getInstance().logSagaError(e, action);
    yield put(alertsShow(createSelectedRaceAlert(AlertType.ERROR, "Невозможно получить данные")));
  }
}

function createSelectedRaceAlert(type: AlertType, content: string): Alert {
  return {
    id: getNextAlertID(),
    type,
    header: "Информация о гонке",
    content
  };
}

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

export function* racesSaga() {
  yield takeLatest(RACES_REQUESTED, fetchRaces);
}

export function* selectedRaceSaga() {
  yield takeLatest(SELECTED_RACE_REQUESTED, fetchSelectedRace);
}

export function* raceParticipantsUpdateRequestSaga() {
  yield takeEvery(RACE_PARTICIPANTS_UPDATE_REQUESTED, tryUpdateRaceParticipants);
}
