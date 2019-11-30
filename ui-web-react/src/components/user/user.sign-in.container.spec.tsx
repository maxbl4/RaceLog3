import React from "react";
import { fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UserSignInContainer from "./user.sign-in.container";
import { renderWithReduxAndRouter } from "../../model/utils/test.utils";
import { emailChecks, passwordChecks } from "./user.sign.container.common";

test("loads and displays sign-in", async () => {
  const { getByLabelText, getByText } = renderWithReduxAndRouter(<UserSignInContainer />);
  fireEvent.click(getByLabelText("Почта"));
  fireEvent.click(getByLabelText("Пароль"));
  fireEvent.click(getByText("Дави на газ!!!"));
  fireEvent.click(getByText("Нет аккаунта? Создать"));
});

test("sign-in form's checks for Email", async () => {
  emailChecks(<UserSignInContainer />);
});

test("sign-in form's checks for Password", async () => {
  passwordChecks(<UserSignInContainer />);
});
