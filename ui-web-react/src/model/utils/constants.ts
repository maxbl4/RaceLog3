import Optional from "optional-js";
import v1 from "uuid/v1";

export const DEFAULT_ID = -1;
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

export const getLogServerURL = (): string => {
  return getServerURL() + LOGGER_PATH;
};

export const getServerURL = (): string => {
  return Optional.ofNullable(process.env.REACT_APP_SERVER_URL).orElse("http://localhost:3001");
};

export const getLogLevel = (): string => {
  return Optional.ofNullable(process.env.REACT_APP_LOG_LEVEL).orElse("info");
};
