import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware, AnyAction } from "redux";
import raceLogAppState from "./model/reducers/reducers";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { StoredState } from "./model/types/datatypes";
import raceLogSaga from "./model/sagas/sagas";

const sagaMiddleware = createSagaMiddleware();
const store = createStore<StoredState, AnyAction, {}, {}>(
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
