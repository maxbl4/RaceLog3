import { put, takeEvery } from "redux-saga/effects";
import { ALERTS_SHOW, AlertsAction, alertsHide } from "../actions/actions";
import { DEFAULT_ALERTS_TIMEOUT } from "../utils/constants";
import { delay } from "./sagas";

function* scheduleAlertHide(action: AlertsAction) {
    yield delay(DEFAULT_ALERTS_TIMEOUT);
    yield put(alertsHide(action.alert));
}

export function* alertsHideSaga() {
    yield takeEvery(ALERTS_SHOW, scheduleAlertHide);
}