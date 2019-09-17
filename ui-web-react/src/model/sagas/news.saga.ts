import { put, takeLatest } from "redux-saga/effects";
import { NEWS_REQUESTED, newsLoaded, SELECTED_NEWS_REQUESTED, SelectedNewsRequestedAction, selectedNewsLoaded } from "../actions/actions";
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

function* fetchSelectedNews(action: SelectedNewsRequestedAction) {
  try {
    yield delay(3000);
    yield put(
      selectedNewsLoaded({
        isFetching: false,
        id: some(action.id),
        header: some("Some news 1"),
        date: some(1568235600000),
        text: some("Voluptate irure labore enim adipisicing consectetur. Id adipisicing aliqua aute commodo. Dolor excepteur laborum et dolor nisi adipisicing deserunt officia esse qui in officia do. Ad non fugiat sint eu sint fugiat est esse ex aliquip. Laborum adipisicing consectetur eu sit nisi eiusmod cillum sunt. Pariatur officia voluptate sunt exercitation ea anim esse aliqua. Consectetur cillum dolor pariatur ipsum.")
      })
    );
  } catch (e) {
    // yield put("ERROR", message: e.message)
  }
}

export function* newsSaga() {
  yield takeLatest(NEWS_REQUESTED, fetchNews);
}

export function* selectedNewsSaga() {
  yield takeLatest(SELECTED_NEWS_REQUESTED, fetchSelectedNews);
}