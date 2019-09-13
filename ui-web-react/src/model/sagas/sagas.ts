import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  NEWS_REQUESTED,
  newsLoaded,
  RACES_REQUESTED,
  racesLoaded
} from "../actions/actions";

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

function* fetchNews() {
  try {
    yield delay(1000);
    yield put(
      newsLoaded([
        {
          id: 1,
          header: "Some news 1",
          date: 1568235600000
        },
        {
          id: 2,
          header: "Some news 2",
          date: 1568322000000
        }
      ])
    );
  } catch (e) {
    // yield put("ERROR", message: e.message)
  }
}

function* fetchRaces() {
  try {
    yield delay(2000);
    yield put(
      racesLoaded([
        {
          id: 1,
          name: "Race 1",
          date: 1568235600000
        },
        {
          id: 2,
          name: "Race 2",
          date: 1568322000000
        },
        {
          id: 3,
          name: "Race 3",
          date: 1568408400000
        }
      ])
    );
  } catch (e) {
    // yield put("ERROR", message: e.message)
  }
}

function* newsSaga() {
  yield takeLatest(NEWS_REQUESTED, fetchNews);
}

function* racesSaga() {
  yield takeLatest(RACES_REQUESTED, fetchRaces);
}

function* raceLogSaga() {
  yield all([call(newsSaga), call(racesSaga)]);
}

export default raceLogSaga;
