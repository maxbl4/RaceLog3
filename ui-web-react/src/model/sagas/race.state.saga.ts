import { call, put, takeEvery } from "redux-saga/effects";
import {
  RACE_CHANGE_STATE_REQUESTED,
  RaceChangeStateAction,
  raceChangeStateSuccess,
  raceChangeStateFailed
} from "../actions/race.actions";
import { changeRaceStateApiRequest } from "../api/transport";
import { LoggingService } from "../utils/logging-service";

function* tryChangeRaceState(action: RaceChangeStateAction) {
  try {
    yield call(changeRaceStateApiRequest, action.raceID, action.state);
    yield put(raceChangeStateSuccess(action.raceID, action.state));
  } catch (e) {
    LoggingService.getInstance().logSagaError(e, action);
    yield put(raceChangeStateFailed());
  }
}

export function* raceChangeStateSaga() {
  yield takeEvery(RACE_CHANGE_STATE_REQUESTED, tryChangeRaceState);
}
