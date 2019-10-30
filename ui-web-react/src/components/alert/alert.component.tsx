import React from "react";
import Optional from "optional-js";
import { Alert, AlertType } from "../../model/types/datatypes";
import { DEFAULT_TIMEOUT } from "../../model/utils/constants";

export type AlertComponentProps = {
  alert: Optional<Alert>;
  onAlertTimeoutFn: (alert: Alert) => void;
};

export class AlertComponent extends React.Component<AlertComponentProps> {
  componentDidMount(): void {
    this.scheduleHideAlert();
  }

  componentDidUpdate(
    prevProps: Readonly<AlertComponentProps>,
    prevState: Readonly<{}>,
    snapshot?: any
  ) {
    this.props.alert.ifPresent(newAlert => {
      if (!prevProps.alert.isPresent() || newAlert.id !== prevProps.alert.get().id) {
        this.scheduleHideAlert();
      }
    });
  }

  scheduleHideAlert = (): void => {
    this.props.alert.ifPresent(value => {
      setTimeout(() => this.props.onAlertTimeoutFn(value), DEFAULT_TIMEOUT);
    });
  };

  render() {
    if (this.props.alert.isPresent()) {
      const currentAlert = this.props.alert.get();
      const alertClassType =
        currentAlert.type === AlertType.SUCCESS
          ? "success"
          : currentAlert.type === AlertType.INFO
          ? "info"
          : "danger";
      return (
        <div className={`alert alert-${alertClassType}`} role="alert">
          {currentAlert.content}
        </div>
      );
    } else {
      return <React.Fragment></React.Fragment>;
    }
  }
}
