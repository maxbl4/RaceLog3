import { put, takeEvery } from "redux-saga/effects";
import {
  RACER_PROFILES_REQUESTED_ALL,
  RACER_PROFILES_UPDATE_REQUESTED,
  RacerProfilesDataAction,
  racerProfilesUpdateReceived,
  racerProfilesRequestFailed,
  alertsShow
} from "../actions/actions";
import { Alert, AlertType } from "../types/datatypes";
import { getNextAlertID } from "../utils/constants";
import { delay } from "./sagas";
import { LoggingService } from "../utils/logging-service";

function* tryRacerProfilesRequestAll(action: RacerProfilesDataAction) {
  try {
    yield delay(3000);
    yield put(
      racerProfilesUpdateReceived(
        [
          { uuid: "some-uuid_1", userUUID: "dimaUserUUID", name: "Dima Komarov", bikeNumber: 87 },
          { uuid: "some-uuid_2", userUUID: "dimaUserUUID", name: "Vova Perevalov", bikeNumber: 91 }
        ],
        [],
        []
      )
    );
  } catch (e) {
    LoggingService.getInstance().logSagaError(e, action);
    yield put(racerProfilesRequestFailed());
    yield put(alertsShow(createRacerProfilesAlert(AlertType.ERROR, "Невозможно обновить данные")));
  }
}

function* tryRacerProfilesUpdate(action: RacerProfilesDataAction) {
  try {
    yield delay(3000);
    yield put(
      racerProfilesUpdateReceived(
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
