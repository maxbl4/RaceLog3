import { put, takeLatest, takeEvery } from "redux-saga/effects";
import {
  RACES_REQUESTED,
  racesLoaded,
  SELECTED_RACE_REQUESTED,
  selectedRaceLoaded,
  SelectedRaceRequestedAction,
  RACE_PARTICIPANTS_UPDATE_REQUESTED,
  RaceParticipantsAction,
  raceParticipantsUpdated,
  alertsShow,
  raceParticipantsUpdateFailed
} from "../actions/actions";
import { delay } from "./sagas";
import Optional from "optional-js";
import { LoggingService } from "../utils/logging-service";
import { AlertType, Alert } from "../types/datatypes";
import { getNextAlertID } from "../utils/constants";
import {
  DEFAULT_RACE_ITEM_1,
  DEFAULT_RACE_ITEM_2,
  DEFAULT_RACER_PROFILE_1,
  DEFAULT_RACER_PROFILE_2
} from "../utils/test.utils";

function* fetchRaces() {
  try {
    yield delay(2000);
    yield put(racesLoaded([DEFAULT_RACE_ITEM_1, DEFAULT_RACE_ITEM_2]));
  } catch (e) {
    LoggingService.getInstance().logSagaError(e);
  }
}

function* fetchSelectedRace(action: SelectedRaceRequestedAction) {
  try {
    yield delay(1000);
    yield put(
      selectedRaceLoaded({
        isFetching: false,
        id: action.id,
        name: "Гонка в Тучково",
        date: 1568235600000,
        location: "Тучково Raceway",
        description:
          "Culpa cupidatat veniam consequat cupidatat officia pariatur pariatur consectetur nisi est ut. Ipsum voluptate qui dolor adipisicing do esse eiusmod mollit in eu tempor. Lorem eiusmod labore adipisicing voluptate consequat consequat cupidatat pariatur.",
        participants: {
          isFetching: false,
          items: Optional.of([DEFAULT_RACER_PROFILE_1, DEFAULT_RACER_PROFILE_2])
        }
      })
    );
  } catch (e) {
    LoggingService.getInstance().logSagaError(e, action);
  }
}

function* tryUpdateRaceParticipants(action: RaceParticipantsAction) {
  try {
    yield delay(2000);
    yield put(
      raceParticipantsUpdated(
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
