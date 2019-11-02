import React from "react";
import Optional from "optional-js";
import { Alert, AlertType } from "../../model/types/datatypes";

export type AlertComponentProps = {
  alert: Optional<Alert>;
};

export class AlertComponent extends React.Component<AlertComponentProps> {
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
          <h4 className="alert-heading">{currentAlert.header}</h4>
          <p>{currentAlert.content}</p>
        </div>
      );
    } else {
      return <React.Fragment></React.Fragment>;
    }
  }
}
