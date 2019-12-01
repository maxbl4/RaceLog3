import React from "react";
import { fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { renderWithReduxAndRouter, DEFAULT_STORED_STATE } from "../../test.utils";
import { emailChecks, passwordChecks } from "./user.sign.container.common";
import UserProfileContainer from "../../../components/user/user.profile.container";

test("loads and displays profile", async () => {
  const { getByLabelText, getByText, debug } = renderWithReduxAndRouter(<UserProfileContainer />, DEFAULT_STORED_STATE);
  debug();
//   fireEvent.click(getByLabelText("Почта"));
});