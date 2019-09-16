import { all, call } from "redux-saga/effects";
import { newsSaga } from "./news.saga";
import { racesSaga } from "./race.saga";

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

function* raceLogSaga() {
  yield all([call(newsSaga), call(racesSaga)]);
}

export default raceLogSaga;
