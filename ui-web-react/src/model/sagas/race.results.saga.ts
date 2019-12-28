import { take, call, put, race, cancelled } from "redux-saga/effects";
import {
  RACE_RESULTS_SUBSCRIPTION_STARTED,
  RACE_RESULTS_SUBSCRIPTION_STOPPED,
  raceResultsSubscriptionDataReceived,
  RaceResultsSubscriptionAction
} from "../actions/race.actions";
import { subscribeToRaceResultsApiRequest, unsubscribeFromRaceResults } from "../api/transport";
import { LoggingService } from "../utils/logging-service";

function* subscribeToResults(action: RaceResultsSubscriptionAction) {
  try {
    const socketChannel = subscribeToRaceResultsApiRequest(action.userUUID, action.raceUUID);
    LoggingService.getInstance().info(
      `Subscribed to results of raceID=${action.raceUUID}, userUUID=${action.userUUID}.`
    );
    while (true) {
      const payload = yield take(socketChannel);
      yield put(raceResultsSubscriptionDataReceived(payload));
    }
  } catch (e) {
    LoggingService.getInstance().logSagaError(e, action);
  } finally {
    if (yield cancelled()) {
      yield unsubscribeFromRaceResults(action.userUUID, action.raceUUID);
      LoggingService.getInstance().info(
        `Unsubscribed from results of raceID=${action.raceUUID}, userUUID=${action.userUUID}.`
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
