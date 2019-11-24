import { Role } from "./roles.model";
import Optional from "optional-js";

export type StoredState = {
  user: User;
  racerProfiles: RacerProfiles;
  races: Races;
  selectedRace: RaceItemExt;
  alertsQueue: AlertsQueue;
};

/**
 * Is this date fetching at this moment or not
 */
export type Fetchable = {
  isFetching: boolean;
};

// ----------------------------------------------------------------------
// Storing data in state
// ----------------------------------------------------------------------
export type User = Fetchable & {
  info: Optional<UserInfo>;
};

export type Races = Fetchable & {
  items: Optional<RaceItem[]>;
};

export type RacerProfiles = Fetchable & {
  items: Optional<RacerProfile[]>;
};

// ----------------------------------------------------------------------
// Minimum info for stored data
// ----------------------------------------------------------------------
export type UserInfo = {
  uuid: string;
  name: string;
  email: string;
  password: string;
  role: Role;
};

export type RacerInfo = {
  bikeNumber: number;
  raceStatistics: Optional<RaceStatistics[]>;
};

export type RaceItem = {
  id: number;
  name: string;
  date: number;
  location: string;
};

// ----------------------------------------------------------------------
// Extended info for showing on particular pages
// ----------------------------------------------------------------------
export type RaceItemExt = RaceItem &
  Fetchable & {
    description: string;
    participants: Optional<string[]>;
  };

export type RaceStatistics = {
  raceID: number;
  position: number;
};

// ----------------------------------------------------------------------
// Alerts
// ----------------------------------------------------------------------

export type AlertsQueue = {
  alerts: Alert[];
};

export type Alert = {
  id: number;
  type: AlertType;
  header: string;
  content: string;
};

export enum AlertType {
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
  INFO = "INFO"
}

// ----------------------------------------------------------------------
// Racer Profile
// ----------------------------------------------------------------------

export type RacerProfile = {
  uuid: string;
  userUUID: string;
  name: string;
  bikeNumber: number;
};
