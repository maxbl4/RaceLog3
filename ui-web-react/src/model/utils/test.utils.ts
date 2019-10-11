import {
  NewsItem,
  NewsItemExt,
  RaceItem,
  RaceItemExt,
  RaceParticipant,
  UserInfo,
  RaceStatistics
} from "../types/datatypes";
import Optional from "optional-js";

export const UNKNOWN_ACTION_TYPE = "UNKNOWN_ACTION_TYPE";

export const DEFAULT_NEWS_ITEM_1: NewsItem = {
  id: Optional.of(1),
  header: Optional.of("Some header 1"),
  date: Optional.of(1570728837485)
};
export const DEFAULT_NEWS_ITEM_2: NewsItem = {
  id: Optional.of(2),
  header: Optional.of("Some header 2"),
  date: Optional.of(1571529537459)
};
export const DEFAULT_NEWS_ITEM_EXT: NewsItemExt = {
  isFetching: false,
  id: Optional.of(1),
  header: Optional.of("Some header 1"),
  date: Optional.of(1570728837485),
  text: Optional.of(
    "Cillum voluptate aute nostrud non sit laboris consectetur. Do ipsum minim exercitation sit ullamco consectetur culpa enim reprehenderit elit velit aliqua. Amet cupidatat nostrud cillum commodo non labore ullamco officia non ex. Nisi officia aute aliquip sunt voluptate aute voluptate sunt. Lorem mollit adipisicing ea voluptate Lorem anim esse aliqua ut mollit ipsum in. Duis labore sit commodo cillum aliquip ullamco aliquip do ipsum duis eu in exercitation. Labore ullamco fugiat do amet dolore nisi in velit ad aute exercitation."
  )
};
export const DEFAULT_RACE_ITEM_1: RaceItem = {
  id: Optional.of(1),
  name: Optional.of("Some race name 1"),
  date: Optional.of(1570728837485)
};
export const DEFAULT_RACE_ITEM_2: RaceItem = {
  id: Optional.of(2),
  name: Optional.of("Some race name 2"),
  date: Optional.of(1571529537459)
};
export const DEFAULT_RACE_PARTICIPANT_1: RaceParticipant = {
  racerID: 123,
  racerName: "Dima"
};
export const DEFAULT_RACE_PARTICIPANT_2: RaceParticipant = {
  racerID: 456,
  racerName: "Vova"
};
export const DEFAULT_RACE_ITEM_EXT: RaceItemExt = {
  isFetching: false,
  id: Optional.of(1),
  name: Optional.of("Some race name 1"),
  date: Optional.of(1570728837485),
  location: Optional.of("Some race location 1"),
  participants: Optional.of([DEFAULT_RACE_PARTICIPANT_1, DEFAULT_RACE_PARTICIPANT_2])
};
export const DEFAULT_USER_INFO: UserInfo = {
  id: 1,
  name: "Valentino Rossi",
  email: "valentino.rossi@yamaha.jp",
  password: "rossiGp46",
  bikeNumber: 46,
  role: "user",
  classCompetition: "500cm3",
  raceStatistics: Optional.empty<RaceStatistics[]>()
};
