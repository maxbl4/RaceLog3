import { put, takeLatest } from "redux-saga/effects";
import { NEWS_REQUESTED, newsLoaded, SELECTED_NEWS_REQUESTED, SelectedNewsRequestedAction, selectedNewsLoaded } from "../actions/actions";
import { delay } from "./sagas";
import Optional from "optional-js";
import { LoggingService } from "../utils/logging-service";

function* fetchNews() {
  try {
    yield delay(1000);
    yield put(
      newsLoaded([
        {
          id: Optional.of(1),
          header: Optional.of("Какая то новость 1"),
          date: Optional.of(1568235600000)
        },
        {
          id: Optional.of(2),
          header: Optional.of("Какая то новость 2"),
          date: Optional.of(1568322000000)
        }
      ])
    );
  } catch (e) {
    LoggingService.getInstance().logSagaError(e);
  }
}

function* fetchSelectedNews(action: SelectedNewsRequestedAction) {
  try {
    yield delay(3000);
    yield put(
      selectedNewsLoaded({
        isFetching: false,
        id: Optional.of(action.id),
        header: Optional.of("Какая то новость 1"),
        date: Optional.of(1568235600000),
        text: Optional.of("Voluptate irure labore enim adipisicing consectetur. Id adipisicing aliqua aute commodo. Dolor excepteur laborum et dolor nisi adipisicing deserunt officia esse qui in officia do. Ad non fugiat sint eu sint fugiat est esse ex aliquip. Laborum adipisicing consectetur eu sit nisi eiusmod cillum sunt. Pariatur officia voluptate sunt exercitation ea anim esse aliqua. Consectetur cillum dolor pariatur ipsum.")
      })
    );
  } catch (e) {
    LoggingService.getInstance().logSagaError(e, action);
  }
}

export function* newsSaga() {
  yield takeLatest(NEWS_REQUESTED, fetchNews);
}

export function* selectedNewsSaga() {
  yield takeLatest(SELECTED_NEWS_REQUESTED, fetchSelectedNews);
}