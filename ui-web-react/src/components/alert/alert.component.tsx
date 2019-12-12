import React from "react";
import Optional from "optional-js";
import { Alert, AlertType } from "../../model/types/datatypes";
import classNames from "classnames";
import { ALERT_HEADER, ALERT_CONTENT } from "../../model/utils/constants";

export type AlertComponentProps = {
  alert: Optional<Alert>;
};

export class AlertComponent extends React.Component<AlertComponentProps> {
  render() {
    if (this.props.alert.isPresent()) {
      const currentAlert = this.props.alert.get();
      const alertClassNames = classNames(
        "alert",
        { "alert-success": currentAlert.type === AlertType.SUCCESS },
        { "alert-info": currentAlert.type === AlertType.INFO },
        { "alert-danger": currentAlert.type === AlertType.ERROR }
      );

      return (
        <div className={alertClassNames} role="alert">
          <h4 id={ALERT_HEADER} className="alert-heading">
            {currentAlert.header}
          </h4>
          <p id={ALERT_CONTENT}>{currentAlert.content}</p>
        </div>
      );
    } else {
      return <React.Fragment></React.Fragment>;
    }
  }
}
