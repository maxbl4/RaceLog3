import { AnyAction } from "redux";
import {
  NewsItem,
  RaceItem,
  NewsItemExt,
  RaceItemExt,
  UserInfo,
  Alert,
  RacerProfile
} from "../types/datatypes";
import Optional from "optional-js";

// ----------------------------------------------------------------------
// Action lables
// ----------------------------------------------------------------------
export const NEWS_REQUESTED = "NEWS_REQUESTED";
export const NEWS_LOADED = "NEWS_LOADED";

export const RACES_REQUESTED = "RACES_REQUESTED";
export const RACES_LOADED = "RACES_LOADED";

export const SELECTED_NEWS_REQUESTED = "SELECTED_NEWS_REQUESTED";
export const SELECTED_NEWS_LOADED = "SELECTED_NEWS_LOADED";

export const SELECTED_RACE_REQUESTED = "SELECTED_RACE_REQUESTED";
export const SELECTED_RACE_LOADED = "SELECTED_RACE_LOADED";

export const USER_REGISTRATION = "USER_REGISTRATION";
export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGIN_ON_START = "USER_LOGIN_ON_START";
export const USER_LOGOUT = "USER_LOGOUT";
export const USER_AUTHORIZED_OK = "USER_AUTHORIZED_OK";
export const USER_AUTHORIZED_FAIL = "USER_AUTHORIZED_FAIL";

export const ALERTS_SHOW = "ALERTS_SHOW";
export const ALERTS_HIDE = "ALERTS_HIDE";

export const RACER_PROFILES_REQUESTED_ALL = "RACER_PROFILES_REQUESTED_ALL";
export const RACER_PROFILES_UPDATE_REQUESTED = "RACER_PROFILES_UPDATE_REQUESTED";
export const RACER_PROFILES_UPDATE_RECEIVED = "RACER_PROFILES_UPDATE_RECEIVED";
export const RACER_PROFILES_REQUEST_FAILED = "RACER_PROFILES_REQUEST_FAILED";

// ----------------------------------------------------------------------
// Actions classes
// ----------------------------------------------------------------------
export type NewsRequestedAction = AnyAction;
export type NewsLoadedAction = AnyAction & {
  items: Optional<NewsItem[]>;
};

export type RacesRequestedAction = AnyAction;
export type RacesLoadedAction = AnyAction & {
  items: Optional<RaceItem[]>;
};

export type SelectedNewsRequestedAction = AnyAction & {
  id: number;
};
export type SelectedNewsLoadedAction = AnyAction & {
  newsItemExt: NewsItemExt;
};

export type SelectedRaceRequestedAction = AnyAction & {
  id: number;
};
export type SelectedRaceLoadedAction = AnyAction & {
  raceItemExt: RaceItemExt;
};

export type UserInfoRequestAction = AnyAction & {
  userInfo: UserInfo;
};
export type UserInfoAuthorizedAction = AnyAction & {
  userInfo: Optional<UserInfo>;
};

export type AlertsAction = AnyAction & {
  alert: Alert;
};

export type RacerProfilesRequestedAction = AnyAction & {
  userUUID: string;
};
export type RacerProfilesDataAction = AnyAction & {
  itemsAdded: Optional<RacerProfile[]>;
  itemsRemoved: Optional<RacerProfile[]>;
  itemsUpdated: Optional<RacerProfile[]>;
};
export type RacerProfilesRequestFailedAction = AnyAction;

// ----------------------------------------------------------------------
// Actions
// ----------------------------------------------------------------------
export const newsRequested = (): NewsRequestedAction => ({
  type: NEWS_REQUESTED
});
export const newsLoaded = (items: NewsItem[]): NewsLoadedAction => ({
  type: NEWS_LOADED,
  items: Optional.of(items)
});

export const racesRequested = (): RacesRequestedAction => ({
  type: RACES_REQUESTED
});
export const racesLoaded = (items: RaceItem[]): RacesLoadedAction => ({
  type: RACES_LOADED,
  items: Optional.of(items)
});

export const selectedNewsRequested = (id: number): SelectedNewsRequestedAction => ({
  type: SELECTED_NEWS_REQUESTED,
  id: id
});
export const selectedNewsLoaded = (newsItemExt: NewsItemExt): SelectedNewsLoadedAction => ({
  type: SELECTED_NEWS_LOADED,
  newsItemExt: newsItemExt
});

export const selectedRaceRequested = (id: number): SelectedRaceRequestedAction => ({
  type: SELECTED_RACE_REQUESTED,
  id: id
});
export const selectedRaceLoaded = (raceItemExt: RaceItemExt): SelectedRaceLoadedAction => ({
  type: SELECTED_RACE_LOADED,
  raceItemExt: raceItemExt
});

export const userReqistration = (userInfo: UserInfo): UserInfoRequestAction => ({
  type: USER_REGISTRATION,
  userInfo: userInfo
});
export const userLogin = (userInfo: UserInfo): UserInfoRequestAction => ({
  type: USER_LOGIN,
  userInfo: userInfo
});
export const userLoginOnStart = (): AnyAction => ({
  type: USER_LOGIN_ON_START
});
export const userLogout = (userInfo: UserInfo): UserInfoRequestAction => ({
  type: USER_LOGOUT,
  userInfo: userInfo
});
export const userAuthorizedOk = (userInfo: UserInfo): UserInfoAuthorizedAction => ({
  type: USER_AUTHORIZED_OK,
  userInfo: Optional.of(userInfo)
});
export const userAuthorizedFail = (): AnyAction => ({
  type: USER_AUTHORIZED_FAIL
});

export const alertsShow = (alert: Alert): AlertsAction => ({
  type: ALERTS_SHOW,
  alert: alert
});
export const alertsHide = (alert: Alert): AlertsAction => ({
  type: ALERTS_HIDE,
  alert: alert
});

export const racerProfilesRequestedAll = (userUUID: string): RacerProfilesRequestedAction => ({
  type: RACER_PROFILES_REQUESTED_ALL,
  userUUID
});
export const racerProfilesUpdateRequested = (
  added: RacerProfile[],
  removed: RacerProfile[],
  updated: RacerProfile[]
): RacerProfilesDataAction =>
  racerProfilesUpdate(RACER_PROFILES_UPDATE_REQUESTED, added, removed, updated);
export const racerProfilesUpdateReceived = (
  added: RacerProfile[],
  removed: RacerProfile[],
  updated: RacerProfile[]
): RacerProfilesDataAction =>
  racerProfilesUpdate(RACER_PROFILES_UPDATE_RECEIVED, added, removed, updated);
const racerProfilesUpdate = (
  type: string,
  added: RacerProfile[],
  removed: RacerProfile[],
  updated: RacerProfile[]
): RacerProfilesDataAction => ({
  type,
  itemsAdded: Optional.of(added),
  itemsRemoved: Optional.of(removed),
  itemsUpdated: Optional.of(updated)
});
export const racerProfilesRequestFailed = (): RacerProfilesRequestFailedAction => ({
  type: RACER_PROFILES_REQUEST_FAILED
});