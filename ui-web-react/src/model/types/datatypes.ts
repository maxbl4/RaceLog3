import { Role } from "./roles.model";
import Optional from "optional-js";
import { DEFAULT_ID, DEFAULT_DATE } from "../utils/constants";
import { RaceState } from "./races.model";

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
    state: RaceState;
    participants: RaceParticipants;
    results: RaceResults;
  };

export type RaceParticipants = Fetchable & {
  items: Optional<RacerProfile[]>;
};

export type RaceResults = Fetchable & {
  items: Optional<RacerResults[]>;
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
  userUUID: Optional<string>;
  name: string;
  bikeNumber: number;
};

export type RacerResults = {
  racerUUID: string;
  position: Optional<number>;
  time: Optional<number>;
  laps: Optional<number>;
  points: Optional<number>;
};

// ----------------------------------------------------------------------
// Initial states
// ----------------------------------------------------------------------
export const INITIAL_USER: User = {
  isFetching: false,
  info: Optional.empty<UserInfo>()
};

export const INITIAL_USER_INFO: UserInfo = {
  uuid: "",
  name: "",
  email: "",
  password: "",
  role: Role.USER
};

export const INITIAL_RACER_PROFILES: RacerProfiles = {
  isFetching: false,
  items: Optional.empty<RacerProfile[]>()
};

export const INITIAL_RACE_RESULTS: RaceResults = {
  isFetching: false,
  items: Optional.empty<RacerResults[]>()
};

export const INITIAL_RACES: Races = {
  isFetching: false,
  items: Optional.empty<RaceItem[]>()
};

export const INITIAL_SELECTED_RACE: RaceItemExt = {
  isFetching: false,
  id: DEFAULT_ID,
  name: "",
  date: DEFAULT_DATE,
  location: "",
  description: "",
  participants: INITIAL_RACER_PROFILES,
  state: RaceState.NOT_STARTED,
  results: INITIAL_RACE_RESULTS
};

export const INITIAL_ALERTS_QUEUE: AlertsQueue = {
  alerts: []
};

export const INITIAL_STORED_STATE: StoredState = {
  user: INITIAL_USER,
  racerProfiles: INITIAL_RACER_PROFILES,
  races: INITIAL_RACES,
  selectedRace: INITIAL_SELECTED_RACE,
  alertsQueue: INITIAL_ALERTS_QUEUE
};
