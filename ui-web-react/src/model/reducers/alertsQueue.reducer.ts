import { AlertsQueue, Alert } from "../types/datatypes";
import { AnyAction } from "redux";
import { LoggingService } from "../utils/logging-service";
import { ALERTS_SHOW, ALERTS_HIDE, AlertsAction } from "../actions/alerts.actions";

export const INITIAL_ALERTS_QUEUE: AlertsQueue = {
  alerts: []
};

export function alertsQueueReducer(state: AlertsQueue = INITIAL_ALERTS_QUEUE, action: AnyAction) {
  LoggingService.getInstance().logReducer(action, state);
  switch (action.type) {
    case ALERTS_SHOW:
      return {
        alerts: changeAlertsQueue(state.alerts, (action as AlertsAction).alert, true)
      };
    case ALERTS_HIDE:
      return {
        alerts: changeAlertsQueue(state.alerts, (action as AlertsAction).alert, false)
      };
    default:
      return state;
  }
}

function changeAlertsQueue(queue: Alert[], alert: Alert, add: boolean): Alert[] {
  if (!queue) {
    queue = [];
  }
  const ind = queue.findIndex((value: Alert, index: number, obj: Alert[]) => alert.id === value.id);
  if (add) {
    if (ind === -1) {
      queue.push(alert);
    }
  } else {
    if (ind > -1) {
      queue.splice(ind, 1);
    }
  }
  return queue;
}
