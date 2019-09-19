import { put, takeLatest } from "redux-saga/effects";
import {
  RACES_REQUESTED,
  racesLoaded,
  SELECTED_RACE_REQUESTED,
  selectedRaceLoaded,
  SelectedRaceRequestedAction
} from "../actions/actions";
import { delay } from "./sagas";
import { some } from "../utils/optional";

function* fetchRaces() {
  try {
    yield delay(2000);
    yield put(
      racesLoaded([
        {
          id: some(1),
          name: some("Гонка 1"),
          date: some(1568235600000)
        },
        {
          id: some(2),
          name: some("Гонка 2"),
          date: some(1568322000000)
        },
        {
          id: some(3),
          name: some("Гонка 3"),
          date: some(1568408400000)
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
        id: some(action.id),
        name: some("Гонка в Тучково"),
        date: some(1568235600000),
        location: some("Тучково Raceway"),
        participants: some([
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
