import React from "react";
import { fireEvent, Matcher } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {
  renderWithReduxAndRouter,
  DEFAULT_STORED_STATE,
  DEFAULT_USER_INFO
} from "../../test.utils";
import UserProfileContainer from "../../../components/user/user.profile.container";
import Optional from "optional-js";
import { Role } from "../../../model/types/roles.model";
import { StoredState } from "../../../model/types/datatypes";

const checkContent = (
  getByText: (matcher: Matcher) => HTMLElement,
  queryByText: (matcher: Matcher) => HTMLElement | null,
  roleHeader: string,
  canSeeSpecialContent: boolean
): void => {
  fireEvent.click(getByText("Valentino Rossi"));
  fireEvent.click(getByText("valentino.rossi@yamaha.jp"));
  fireEvent.click(getByText(roleHeader));
  fireEvent.click(getByText("Профили гонщика"));

  const raceManagementHeader = "Управление гонками";
  if (canSeeSpecialContent) {
    fireEvent.click(getByText(raceManagementHeader));
  } else {
    expect(queryByText(raceManagementHeader)).toBeNull();
  }
};

const storedStateForRole = (role: Role): StoredState => {
  return {
    ...DEFAULT_STORED_STATE,
    user: {
      ...DEFAULT_STORED_STATE.user,
      info: Optional.of({
        ...DEFAULT_USER_INFO,
        role
      })
    }
  };
};

test("loads and displays profile for Admin Role", async () => {
  const { getByText, queryByText } = renderWithReduxAndRouter(
    <UserProfileContainer />,
    storedStateForRole(Role.ADMIN)
  );
  checkContent(getByText, queryByText, "Администратор", true);
});

test("loads and displays profile for Supporter Role", async () => {
  const { getByText, queryByText } = renderWithReduxAndRouter(
    <UserProfileContainer />,
    storedStateForRole(Role.SUPPORT)
  );
  checkContent(getByText, queryByText, "Тех поддержка", true);
});

test("loads and displays profile for User Role", async () => {
  const { getByText, queryByText } = renderWithReduxAndRouter(
    <UserProfileContainer />,
    storedStateForRole(Role.USER)
  );
  checkContent(getByText, queryByText, "Пользователь", false);
});
