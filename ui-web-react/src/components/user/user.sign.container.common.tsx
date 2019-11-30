import { renderWithReduxAndRouter, inputText } from "../../model/utils/test.utils";
import { waitForElementToBeRemoved, fireEvent } from "@testing-library/dom";

export async function emailChecks(ui: React.ReactElement) {
  const { getByLabelText, findByText, getByText } = renderWithReduxAndRouter(ui);
  const email = getByLabelText("Почта");

  fireEvent.blur(email);
  await findByText("Введите пожалуйста почту");

  fireEvent.change(email, inputText("valentino"));
  fireEvent.blur(email);
  await findByText("Неверный формат почты");

  fireEvent.change(email, inputText("valentino.rossi@yamaha.jp"));
  fireEvent.blur(email);
  await waitForElementToBeRemoved(() => getByText("Неверный формат почты"));
}

export async function passwordChecks(ui: React.ReactElement) {
  const { getByLabelText, findByText, getByText } = renderWithReduxAndRouter(ui);
  const password = getByLabelText("Пароль");

  fireEvent.blur(password);
  await findByText("Введите пожалуйста пароль");

  fireEvent.change(password, inputText("val"));
  fireEvent.blur(password);
  await findByText("Пароль должен быть не менее 5-ти символов");

  fireEvent.change(password, inputText("valentino"));
  fireEvent.blur(password);
  await waitForElementToBeRemoved(() => getByText("Пароль должен быть не менее 5-ти символов"));
}

export async function nameChecks(ui: React.ReactElement) {
  const { getByLabelText, findByText, getByText } = renderWithReduxAndRouter(ui);
  const name = getByLabelText("Имя");

  fireEvent.blur(name);
  await findByText("Введите пожалуйста имя");

  fireEvent.change(name, inputText("v"));
  fireEvent.blur(name);
  await findByText("Имя должно быть не менее 2-х символов");

  fireEvent.change(name, inputText("valentino"));
  fireEvent.blur(name);
  await waitForElementToBeRemoved(() => getByText("Имя должно быть не менее 2-х символов"));
}
