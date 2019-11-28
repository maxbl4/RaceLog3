import { alertsQueueReducer } from "./alertsQueue.reducer";
import { UNKNOWN_ACTION_TYPE, DEFAULT_ALERT_1, DEFAULT_ALERT_2 } from "../utils/test.utils";
import { Alert } from "../types/datatypes";
import { ALERTS_SHOW, ALERTS_HIDE } from "../actions/alerts.actions";

describe("alertsQueue.reducer - alertsQueueReducer", () => {
  it("should return default state for unknown action", () => {
    const alertsQueueState = alertsQueueReducer(undefined, { type: UNKNOWN_ACTION_TYPE });
    expect(alertsQueueState.alerts.length).toEqual(0);
  });

  it("should add new alert for empty initial state", () => {
    const alertsQueueState = alertsQueueReducer(undefined, {
      type: ALERTS_SHOW,
      alert: DEFAULT_ALERT_1
    });
    const list = alertsQueueState.alerts;
    expect(list.length).toEqual(1);
    compareAlerts(list[0], DEFAULT_ALERT_1);
  });

  it("should add new alert for non-empty state", () => {
    const alertsQueueState = alertsQueueReducer(
      { alerts: [DEFAULT_ALERT_1] },
      {
        type: ALERTS_SHOW,
        alert: DEFAULT_ALERT_2
      }
    );
    const list = alertsQueueState.alerts;
    expect(list.length).toEqual(2);
    compareAlerts(list[0], DEFAULT_ALERT_1);
    compareAlerts(list[1], DEFAULT_ALERT_2);
  });

  it("should not add new alert for non-empty state with this alert inside", () => {
    const alertsQueueState = alertsQueueReducer(
      { alerts: [DEFAULT_ALERT_1] },
      {
        type: ALERTS_SHOW,
        alert: DEFAULT_ALERT_1
      }
    );
    const list = alertsQueueState.alerts;
    expect(list.length).toEqual(1);
    compareAlerts(list[0], DEFAULT_ALERT_1);
  });

  it("should process delete alert for empty initial state correctly", () => {
    const alertsQueueState = alertsQueueReducer(undefined, {
      type: ALERTS_HIDE,
      alert: DEFAULT_ALERT_1
    });
    const list = alertsQueueState.alerts;
    expect(list.length).toEqual(0);
  });

  it("should delete alert for non-empty state with this alert inside", () => {
    const alertsQueueState = alertsQueueReducer(
      { alerts: [DEFAULT_ALERT_1, DEFAULT_ALERT_2] },
      {
        type: ALERTS_HIDE,
        alert: DEFAULT_ALERT_1
      }
    );
    const list = alertsQueueState.alerts;
    expect(list.length).toEqual(1);
    compareAlerts(list[0], DEFAULT_ALERT_2);
  });

  it("should not delete alert for non-empty state without this alert inside", () => {
    const alertsQueueState = alertsQueueReducer(
      { alerts: [DEFAULT_ALERT_1] },
      {
        type: ALERTS_HIDE,
        alert: DEFAULT_ALERT_2
      }
    );
    const list = alertsQueueState.alerts;
    expect(list.length).toEqual(1);
    compareAlerts(list[0], DEFAULT_ALERT_1);
  });

  function compareAlerts(srcAlert: Alert, targetAlert: Alert) {
    expect(srcAlert.id).toEqual(targetAlert.id);
    expect(srcAlert.type).toEqual(targetAlert.type);
    expect(srcAlert.header).toEqual(targetAlert.header);
    expect(srcAlert.content).toEqual(targetAlert.content);
  }
});
