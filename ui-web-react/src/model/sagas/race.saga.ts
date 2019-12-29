import { call, put, takeLatest } from "redux-saga/effects";
import { alertsShow } from "../actions/alerts.actions";
import {
  RACES_REQUESTED,
  racesLoaded,
  SELECTED_RACE_REQUESTED,
  selectedRaceLoaded,
  SelectedRaceRequestedAction,
  racesRequestFailed,
  selectedRaceRequestFailed
} from "../actions/race.actions";
import Optional from "optional-js";
import { LoggingService } from "../utils/logging-service";
import { AlertType, Alert, RaceItem, RaceItemExt } from "../types/datatypes";
import { getNextAlertID } from "../utils/constants";
import { requestRacesApiRequest, requestSelectedRaceApiRequest } from "../api/transport";

function* fetchRaces() {
  try {
    const races: Optional<RaceItem[]> = yield call(requestRacesApiRequest);
    yield put(racesLoaded(races.orElse([])));
  } catch (e) {
    LoggingService.getInstance().logSagaError(e);
    yield put(racesRequestFailed());
    yield put(alertsShow(createRacesAlert(AlertType.ERROR, "Невозможно получить данные о гонках")));
  }
}

function createRacesAlert(type: AlertType, content: string): Alert {
  return {
    id: getNextAlertID(),
    type,
    header: "Информация о гонках",
    content
  };
}

function* fetchSelectedRace(action: SelectedRaceRequestedAction) {
  try {
    const race: Optional<RaceItemExt> = yield call(requestSelectedRaceApiRequest, action.id);
    yield put(selectedRaceLoaded(race.orElseThrow(() => new Error("Невозможно получить данные"))));
  } catch (e) {
    LoggingService.getInstance().logSagaError(e, action);
    yield put(selectedRaceRequestFailed(action.id));
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

export function* racesSaga() {
  yield takeLatest(RACES_REQUESTED, fetchRaces);
}

export function* selectedRaceSaga() {
  yield takeLatest(SELECTED_RACE_REQUESTED, fetchSelectedRace);
}
