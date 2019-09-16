import { put, takeLatest } from "redux-saga/effects";
import { RACES_REQUESTED, racesLoaded } from "../actions/actions";
import { delay } from "./sagas";
import { some } from "../utils/optional";

function* fetchRaces() {
  try {
    yield delay(2000);
    yield put(
      racesLoaded([
        {
          id: some(1),
          name: some("Race 1"),
          date: some(1568235600000)
        },
        {
          id: some(2),
          name: some("Race 2"),
          date: some(1568322000000)
        },
        {
          id: some(3),
          name: some("Race 3"),
          date: some(1568408400000)
        }
      ])
    );
  } catch (e) {
    // yield put("ERROR", message: e.message)
  }
}

export function* racesSaga() {
  yield takeLatest(RACES_REQUESTED, fetchRaces);
}
