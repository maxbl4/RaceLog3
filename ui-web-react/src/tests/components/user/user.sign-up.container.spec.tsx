import React from "react";
import { fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { renderWithReduxAndRouter } from "../../test.utils";
import { emailChecks, passwordChecks, nameChecks } from "./user.sign.container.common";
import UserSignUpContainer from "../../../components/user/user.sign-up.container";

test("loads and displays sign-up form", async () => {
  const { getByLabelText, getByText } = renderWithReduxAndRouter(<UserSignUpContainer />);
  fireEvent.click(getByLabelText("Почта"));
  fireEvent.click(getByLabelText("Пароль"));
  fireEvent.click(getByLabelText("Имя"));
  fireEvent.click(getByText("Дави на газ!!!"));
  fireEvent.click(getByText("Есть аккаунт? Войти"));
});

test("sign-up form's checks for Email", async () => {
  emailChecks(<UserSignUpContainer />);
});

test("sign-up form's checks for Password", async () => {
  passwordChecks(<UserSignUpContainer />);
});

test("sign-up form's checks for Name", async () => {
  nameChecks(<UserSignUpContainer />);
});
