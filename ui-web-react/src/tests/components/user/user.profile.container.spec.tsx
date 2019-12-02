import React from "react";
import { fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { renderWithReduxAndRouter, DEFAULT_STORED_STATE, DEFAULT_USER_INFO } from "../../test.utils";
import UserProfileContainer from "../../../components/user/user.profile.container";

test("loads and displays profile", async () => {
  const { getByLabelText, getByText, debug } = renderWithReduxAndRouter(<UserProfileContainer />, DEFAULT_STORED_STATE);
  fireEvent.click(getByText("Valentino Rossi"));
  fireEvent.click(getByText("valentino.rossi@yamaha.jp"));
  fireEvent.click(getByText("Пользователь"));
  // debug();
});