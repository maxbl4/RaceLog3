import { take, call, put, race, cancelled } from "redux-saga/effects";
import {
  RACE_RESULTS_SUBSCRIPTION_STARTED,
  RACE_RESULTS_SUBSCRIPTION_STOPPED,
  raceResultsSubscriptionDataReceived,
  RaceResultsSubscriptionAction,
  raceResultsSubscriptionStopped,
  raceResultsSubscriptionFailed
} from "../actions/race.results.actions";
import { subscribeToRaceResultsApiRequest, unsubscribeFromRaceResultsApiRequest } from "../api/transport";
import { LoggingService } from "../utils/logging-service";

function* subscribeToResults(action: RaceResultsSubscriptionAction) {
  try {
    const socketChannel = subscribeToRaceResultsApiRequest(action.userUUID, action.raceID);
    LoggingService.getInstance().info(
      `Subscribed to results of raceID=${action.raceID}, userUUID=${action.userUUID}.`
    );
    while (true) {
      const payload = yield take(socketChannel);
      yield put(raceResultsSubscriptionDataReceived(payload));
    }
  } catch (e) {
    LoggingService.getInstance().logSagaError(e, action);
    yield put(raceResultsSubscriptionFailed());
  } finally {
    if (yield cancelled()) {
      yield unsubscribeFromRaceResultsApiRequest(action.userUUID, action.raceID);
      yield put(raceResultsSubscriptionStopped(action.userUUID, action.raceID));
      LoggingService.getInstance().info(
        `Unsubscribed from results of raceID=${action.raceID}, userUUID=${action.userUUID}.`
      );
    }
  }
}

export function* raceResultsSaga() {
  while (true) {
    const action: RaceResultsSubscriptionAction = yield take(RACE_RESULTS_SUBSCRIPTION_STARTED);
    yield race({
      task: call(subscribeToResults, action),
      cancel: take(RACE_RESULTS_SUBSCRIPTION_STOPPED)
    });
  }
}
