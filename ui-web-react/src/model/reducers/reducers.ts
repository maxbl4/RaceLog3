import { combineReducers } from "redux";
import { LOG_IN, AUTHENTICATE } from "../actions/actions";

const INITIAL_USER_INFO = {
  user: undefined,
  email: undefined,
  role: undefined
};

function userInfo(state: any = INITIAL_USER_INFO, action: any) {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state
      };
    default:
      return state;
  }
}

function login(state: boolean = false, action: any) {
  switch (action.type) {
    case LOG_IN:
      return state;
    default:
      return state;
  }
}

const raceLogAppState = combineReducers({
  userInfo,
  login
});

export default raceLogAppState;
