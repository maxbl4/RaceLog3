import Optional from "optional-js";

export const DEFAULT_ID = -1;
export const DEFAULT_DATE = 0;

export const COOKIE_MESH_TOKEN = "mesh.user.token";

export const MESH_API_PREFIX = "/api/v2";
export const MESH_API_LOGIN = MESH_API_PREFIX + "/auth/login";
export const MESH_API_LOGOUT = MESH_API_PREFIX + "/auth/logout";
export const MESH_API_ABOUT_ME = MESH_API_PREFIX + "/auth/me";

export const LOGGER_PATH = "/logger";

export const isProdEnvironment = (): boolean => {
  return process.env.REACT_APP_ENVIRONMENT === "prod";
};

export const getLogServerURL = (): string => {
  return getServerURL() + LOGGER_PATH;
};

export const getServerURL = (): string => {
  return Optional.ofNullable(process.env.REACT_APP_SERVER_URL).orElse("http://localhost:3001");
};
