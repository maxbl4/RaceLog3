import { StoredState, Alert } from "../../model/types/datatypes";
import { connect } from "react-redux";
import Optional from "optional-js";
import { AlertComponent } from "./alert.component";

const mapStateToProps = (state: StoredState) => {
  const list = state.alertsQueue.alerts;
  return {
    alert: list && list.length > 0 ? Optional.of(list[0]) : Optional.empty<Alert>()
  };
};

const AlertContainer = connect(
  mapStateToProps
)(AlertComponent);

export default AlertContainer;
