import { AnyAction } from "redux";
import { Alert } from "../types/datatypes";

export const ALERTS_SHOW = "ALERTS_SHOW";
export const ALERTS_HIDE = "ALERTS_HIDE";

export type AlertsAction = AnyAction & {
  alert: Alert;
};

export const alertsShow = (alert: Alert): AlertsAction => ({
  type: ALERTS_SHOW,
  alert: alert
});
export const alertsHide = (alert: Alert): AlertsAction => ({
  type: ALERTS_HIDE,
  alert: alert
});
