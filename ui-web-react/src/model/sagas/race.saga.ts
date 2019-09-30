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

function* fetchRaces() {
  try {
    yield delay(2000);
    yield put(
      racesLoaded([
        {
          id: Optional.of(1),
          name: Optional.of("Гонка 1"),
          date: Optional.of(1568235600000)
        },
        {
          id: Optional.of(2),
          name: Optional.of("Гонка 2"),
          date: Optional.of(1568322000000)
        },
        {
          id: Optional.of(3),
          name: Optional.of("Гонка 3"),
          date: Optional.of(1568408400000)
        }
      ])
    );
  } catch (e) {
    // yield put("ERROR", message: e.message)
  }
}

function* fetchSelectedRace(action: SelectedRaceRequestedAction) {
  try {
    yield delay(1000);
    yield put(
      selectedRaceLoaded({
        isFetching: false,
        id: Optional.of(action.id),
        name: Optional.of("Гонка в Тучково"),
        date: Optional.of(1568235600000),
        location: Optional.of("Тучково Raceway"),
        participants: Optional.of([
          {
            racerID: 1,
            racerName: "Дима"
          },
          {
            racerID: 2,
            racerName: "Вова"
          }
        ])
      })
    );
  } catch (e) {
    // yield put("ERROR", message: e.message)
  }
}

export function* racesSaga() {
  yield takeLatest(RACES_REQUESTED, fetchRaces);
}

export function* selectedRaceSaga() {
  yield takeLatest(SELECTED_RACE_REQUESTED, fetchSelectedRace);
}
