import { put, takeLatest } from "redux-saga/effects";
import {
  RACES_REQUESTED,
  racesLoaded,
  SELECTED_RACE_REQUESTED,
  selectedRaceLoaded,
  SelectedRaceRequestedAction
} from "../actions/actions";
import { delay } from "./sagas";
import Optional from "optional-js";
import { LoggingService } from "../utils/logging-service";

function* fetchRaces() {
  try {
    yield delay(2000);
    yield put(
      racesLoaded([
        {
          id: 1,
          name: "Гонка 1",
          date: 1568235600000,
          location: "Монца"
        },
        {
          id: 2,
          name: "Гонка 2",
          date: 1568322000000,
          location: "Барселона"
        },
        {
          id: 3,
          name: "Гонка 3",
          date: 1568408400000,
          location: "Сан-Паулу"
        }
      ])
    );
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
        participants: Optional.of([
          { uuid: "some-uuid_1", userUUID: Optional.of("dimaUserUUID"), name: "Dima Komarov", bikeNumber: 87 },
          { uuid: "some-uuid_2", userUUID: Optional.of("dimaUserUUID"), name: "Vova Perevalov", bikeNumber: 91 }
        ])
      })
    );
  } catch (e) {
    LoggingService.getInstance().logSagaError(e, action);
  }
}

export function* racesSaga() {
  yield takeLatest(RACES_REQUESTED, fetchRaces);
}

export function* selectedRaceSaga() {
  yield takeLatest(SELECTED_RACE_REQUESTED, fetchSelectedRace);
}
