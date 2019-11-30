import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import raceLogAppState from "../../model/reducers/reducers";
import { StoredState, INITIAL_STORED_STATE } from "../../model/types/datatypes";
import UserSignInContainer from "./user.sign-in.container";
import { inputText } from "../../model/utils/test.utils";

function renderWithRedux(ui: React.ReactElement, initialState: StoredState = INITIAL_STORED_STATE) {
  const store = createStore(raceLogAppState, initialState);
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store
  };
}

test("loads and displays sign-in form with 2 controls (email and password), 1 button (submit) and 1 link (go to Sign Up panel)", async () => {
  const { getByLabelText, getByText } = renderWithRedux(
    <Router>
      <UserSignInContainer />
    </Router>
  );
  fireEvent.click(getByLabelText("Почта"));
  fireEvent.click(getByLabelText("Пароль"));
  fireEvent.click(getByText("Дави на газ!!!"));
  fireEvent.click(getByText("Нет аккаунта? Создать"));
});

test("sign-in form's checks for Email", async () => {
  const { getByLabelText, findByText, getByText } = renderWithRedux(
    <Router>
      <UserSignInContainer />
    </Router>
  );
  const email = getByLabelText("Почта");

  fireEvent.blur(email);
  await findByText("Введите пожалуйста почту");

  fireEvent.change(email, inputText("valentino"));
  fireEvent.blur(email);
  await findByText("Неверный формат почты");

  fireEvent.change(email, inputText("valentino.rossi@yamaha.jp"));
  fireEvent.blur(email);
  await waitForElementToBeRemoved(() => getByText("Неверный формат почты"));
});

test("sign-in form's checks for Password", async () => {
  const { getByLabelText, findByText, getByText } = renderWithRedux(
    <Router>
      <UserSignInContainer />
    </Router>
  );
  const password = getByLabelText("Пароль");

  fireEvent.blur(password);
  await findByText("Введите пожалуйста пароль");

  fireEvent.change(password, inputText("val"));
  fireEvent.blur(password);
  await findByText("Пароль должен быть не менее 5-ти символов");

  fireEvent.change(password, inputText("valentino"));
  fireEvent.blur(password);
  await waitForElementToBeRemoved(() => getByText("Пароль должен быть не менее 5-ти символов"));
});
