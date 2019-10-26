import { Role } from "./roles.model";
import Optional from "optional-js";

export type StoredState = {
  user: User;
  news: News;
  selectedNews: NewsItemExt;
  races: Races;
  selectedRace: RaceItemExt;
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

export type News = Fetchable & {
  items: Optional<NewsItem[]>;
};

export type Races = Fetchable & {
  items: Optional<RaceItem[]>;
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

export type NewsItem = {
  id: Optional<number>;
  header: Optional<string>;
  date: Optional<number>;
};

export type RaceItem = {
  id: Optional<number>;
  name: Optional<string>;
  date: Optional<number>;
};

// ----------------------------------------------------------------------
// Extended info for showing on particular pages
// ----------------------------------------------------------------------
export type NewsItemExt = NewsItem &
  Fetchable & {
    text: Optional<string>;
  };

export type RaceItemExt = RaceItem &
  Fetchable & {
    location: Optional<string>;
    participants: Optional<RaceParticipant[]>;
  };

export type RaceStatistics = {
  raceID: number;
  position: number;
};

export type RaceParticipant = {
  racerID: number;
  racerName: string;
};
