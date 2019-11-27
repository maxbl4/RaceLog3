import { call, put, takeEvery } from "redux-saga/effects";
import {
  RACER_PROFILES_REQUESTED_ALL,
  RACER_PROFILES_UPDATE_REQUESTED,
  RacerProfilesDataAction,
  racerProfilesUpdateReceived,
  racerProfilesRequestFailed,
  alertsShow,
  RacerProfilesRequestedAction
} from "../actions/actions";
import { Alert, AlertType, RacerProfile } from "../types/datatypes";
import { getNextAlertID } from "../utils/constants";
import { LoggingService } from "../utils/logging-service";
import { requestRacerProfilesApiRequest, updateRacerProfilesApiRequest } from "../api/transport";
import Optional from "optional-js";

function* tryRacerProfilesRequestAll(action: RacerProfilesRequestedAction) {
  try {
    const profiles: Optional<RacerProfile[]> = yield call(
      requestRacerProfilesApiRequest,
      action.userUUID
    );
    yield put(racerProfilesUpdateReceived(action.userUUID, profiles.orElse([]), [], []));
  } catch (e) {
    LoggingService.getInstance().logSagaError(e, action);
    yield put(racerProfilesRequestFailed());
    yield put(alertsShow(createRacerProfilesAlert(AlertType.ERROR, "Невозможно получить данные")));
  }
}

function* tryRacerProfilesUpdate(action: RacerProfilesDataAction) {
  try {
    yield call(
      updateRacerProfilesApiRequest,
      action.userUUID,
      action.itemsAdded.orElse([]),
      action.itemsRemoved.orElse([]),
      action.itemsUpdated.orElse([])
    );
    yield put(
      racerProfilesUpdateReceived(
        action.userUUID,
        action.itemsAdded.orElse([]),
        action.itemsRemoved.orElse([]),
        action.itemsUpdated.orElse([])
      )
    );
    yield put(alertsShow(createRacerProfilesAlert(AlertType.SUCCESS, "Данные успешно обновлены")));
  } catch (e) {
    LoggingService.getInstance().logSagaError(e, action);
    yield put(racerProfilesRequestFailed());
    yield put(alertsShow(createRacerProfilesAlert(AlertType.ERROR, "Невозможно обновить данные")));
  }
}

function createRacerProfilesAlert(type: AlertType, content: string): Alert {
  return {
    id: getNextAlertID(),
    type,
    header: "Профили гонщика",
    content
  };
}

export function* racerProfilesRequestAll() {
  yield takeEvery(RACER_PROFILES_REQUESTED_ALL, tryRacerProfilesRequestAll);
}

export function* racerProfilesUpdate() {
  yield takeEvery(RACER_PROFILES_UPDATE_REQUESTED, tryRacerProfilesUpdate);
}
