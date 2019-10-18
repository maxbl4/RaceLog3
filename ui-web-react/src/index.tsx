import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { createStore, applyMiddleware } from "redux";
import raceLogAppState from "./model/reducers/reducers";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { StoredState } from "./model/types/datatypes";
import raceLogSaga from "./model/sagas/sagas";
import { LoggingService } from "./model/utils/logging-service";
import MainContainer from "./main.container";
import { isProdEnvironment, getLogServerURL } from "./model/utils/constants";

const sagaMiddleware = createSagaMiddleware();
const store = createStore<StoredState, any, {}, {}>(
  raceLogAppState,
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(raceLogSaga);

LoggingService.getInstance().init({
  sendLogsToServer: isProdEnvironment(),
  url: getLogServerURL()
});

ReactDOM.render(
  <Provider store={store}>
    <MainContainer />
  </Provider>,
  document.getElementById("root")
);
