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
import { isProdEnvironment, getLogServerURL, getLogLevel, isTestEnvironment } from "./model/utils/constants";
import { TransportService, TimeoutTransport } from "./model/api/transport";
import { FakeApi } from "./model/api/fake.api";
import { MeshApi } from "./model/api/mesh.api";

const sagaMiddleware = createSagaMiddleware();
const store = createStore<StoredState, any, {}, {}>(
  raceLogAppState,
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(raceLogSaga);

LoggingService.getInstance().init({
  sendLogsToServer: isProdEnvironment(),
  url: getLogServerURL(),
  level: getLogLevel(),
});

TransportService.setInstance(
  new TimeoutTransport(
    isTestEnvironment() ? new FakeApi() : new MeshApi()
  )
);

ReactDOM.render(
  <Provider store={store}>
    <MainContainer />
  </Provider>,
  document.getElementById("root")
);
