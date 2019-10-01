import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import raceLogAppState from "./model/reducers/reducers";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { StoredState } from "./model/types/datatypes";
import raceLogSaga from "./model/sagas/sagas";

const sagaMiddleware = createSagaMiddleware();
const store = createStore<StoredState, any, {}, {}>(
  raceLogAppState,
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(raceLogSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
