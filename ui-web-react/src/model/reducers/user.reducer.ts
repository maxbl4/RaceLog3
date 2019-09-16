import { User } from "../types/datatypes";
import { none } from "../utils/optional";
import { AnyAction } from "redux";

export const INITIAL_USER: User = {
  isFetching: false,
  info: none
};

export function userReducer(state: User = INITIAL_USER, action: AnyAction) {
  return state;
}
