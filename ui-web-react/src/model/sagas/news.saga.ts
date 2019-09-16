import { put, takeLatest } from "redux-saga/effects";
import { NEWS_REQUESTED, newsLoaded } from "../actions/actions";
import { delay } from "./sagas";
import { some } from "../utils/optional";

function* fetchNews() {
  try {
    yield delay(1000);
    yield put(
      newsLoaded([
        {
          id: some(1),
          header: some("Some news 1"),
          date: some(1568235600000)
        },
        {
          id: some(2),
          header: some("Some news 2"),
          date: some(1568322000000)
        }
      ])
    );
  } catch (e) {
    // yield put("ERROR", message: e.message)
  }
}

export function* newsSaga() {
  yield takeLatest(NEWS_REQUESTED, fetchNews);
}
