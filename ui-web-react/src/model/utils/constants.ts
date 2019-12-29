import Optional from "optional-js";
import v1 from "uuid/v1";

export const DEFAULT_ID = -1;
export const DEFAULT_UUID = "DEFAULT_UUID";
export const DEFAULT_DATE = 0;
/**
 * Default timeout for operations: 10 seconds
 */
export const DEFAULT_TIMEOUT = 1000 * 10;
/**
 * Default timeout for alerts displaying: 5 seconds
 */
export const DEFAULT_ALERTS_TIMEOUT = 1000 * 5;

export const COOKIE_MESH_TOKEN = "mesh.user.token";

export const MESH_API_PREFIX = "/api/v2";
export const MESH_API_LOGIN = MESH_API_PREFIX + "/auth/login";
export const MESH_API_LOGOUT = MESH_API_PREFIX + "/auth/logout";
export const MESH_API_ABOUT_ME = MESH_API_PREFIX + "/auth/me";
export const MESH_API_USERS = MESH_API_PREFIX + "/users";

export const LOGGER_PATH = "/logger";

let currentAlertID = 1;

export const getNextAlertID = (): number => {
  return currentAlertID++;
}

export const generateUUID = (): string => {
  return v1();
}

export const isProdEnvironment = (): boolean => {
  return process.env.REACT_APP_ENVIRONMENT === "prod";
};

export const isTestEnvironment = (): boolean => {
  return process.env.REACT_APP_ENVIRONMENT === "test";
};

export const getLogServerURL = (): string => {
  return getServerURL() + LOGGER_PATH;
};

export const getServerURL = (): string => {
  return Optional.ofNullable(process.env.REACT_APP_SERVER_URL).orElse("http://localhost:3001");
};

export const getLogLevel = (): string => {
  return Optional.ofNullable(process.env.REACT_APP_LOG_LEVEL).orElse("info");
};

// Components IDs
export const HEADER_ENTER_BUTTON = "headerEnterButtonID";
export const HEADER_ACCOUNT_BUTTON = "headerAccountButtonID";
export const HEADER_MENU_BUTTON = "headerMenuButtonID";
export const LIST_ITEM_HOME_BUTTON = "listItemHomeButtonID";
export const LIST_ITEM_ENTER_BUTTON = "listItemEnterButtonID";
export const LIST_ITEM_ACCOUNT_BUTTON = "listItemAccountButtonID";
export const AUTH_MODE_LABEL = "authModeLabelID";
export const AUTH_NAME = "authNameID";
export const AUTH_PASSWORD = "authPasswordID";
export const AUTH_EMAIL = "authEmailID";
export const AUTH_SUBMIT_BUTTON = "authSubmitButtonID";
export const AUTH_CHANGE_MODE_LINK = "authChangeModeLinkID";
export const PROFILE_NAME = "profileNameID";
export const PROFILE_EMAIL = "profileEmailID";
export const PROFILE_ROLE = "profileRoleID";
export const PROFILE_LOGOUT_BUTTON = "profileLogoutButtonID";
export const RACER_PROFILE_NAME = "racerProfileName";
export const RACER_PROFILE_BIKE_NUMBER = "racerProfileBikeNumber";
export const RACER_PROFILE_ADD_REMOVE_BUTTON = "racerProfileAddRemoveButton";
export const RACER_PROFILES_LIST_EXPAND_BUTTON = "racerProfilesListExpandButton";
export const RACER_PROFILES_LIST_SUBMIT_BUTTON = "racerProfilesListSubmitButton";
export const RACE_ITEM_CARD_NAME = "raceItemCardName";
export const RACE_ITEM_CARD_DATE = "raceItemCardDate";
export const RACE_ITEM_CARD_MORE_BUTTON = "raceItemCardMoreButton";
export const RACE_ITEM_INFO_NAME = "raceItemInfoName";
export const RACE_ITEM_INFO_DATE_LOCATION = "raceItemInfoDateLocationa";
export const RACE_ITEM_INFO_DESCR = "raceItemInfoDescr";
export const RACE_PARTICIPANTS_LIST_TABLE = "raceParticipantsListTable";
export const RACE_PARTICIPANTS_LIST_EXPAND_BUTTON = "raceParticipantsListExpandButton";
export const RACE_REGISTRATION_LIST_PROFILE_ITEM = "raceRegistrationListProfileItem";
export const RACE_REGISTRATION_LIST_HEADER = "raceRegistrationListHeader";
export const RACE_REGISTRATION_LIST_EXPAND_BUTTON = "raceRegistrationListExpandButton";
export const RACE_REGISTRATION_LIST_SUBMIT_BUTTON = "raceRegistrationListSubmitButton";
export const RACE_RESULTS_TABLE = "raceResultsTable";
export const RACE_RESULTS_EXPAND_BUTTON = "raceResultsExpandButton";
export const ADMIN_RACE_INFO_EXPAND_BUTTON = "adminRaceInfoExpandButton";
export const ADMIN_RACE_INFO_HEADER = "adminRaceInfoHeader";
export const ADMIN_RACE_INFO_NAME_COMBO = "adminRaceInfoNameCombo";
export const ADMIN_RACE_INFO_STATE_COMBO = "adminRaceInfoStateCombo";
export const ADMIN_RACE_INFO_SUBMIT_BUTTON = "adminRaceInfoSubminButton";
export const ALERT_HEADER = "alertHeader";
export const ALERT_CONTENT = "alertContent";