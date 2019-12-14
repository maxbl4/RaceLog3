import React from "react";
import { fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { renderWithReduxAndRouter } from "../../test.utils";
import { emailChecks, passwordChecks } from "./user.sign.container.common";
import UserSignInContainer from "../../../components/user/user.sign-in.container";

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
