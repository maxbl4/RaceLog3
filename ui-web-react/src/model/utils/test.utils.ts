import {
  NewsItem,
  NewsItemExt,
  RaceItem,
  RaceItemExt,
  RaceParticipant,
  UserInfo,
  Alert,
  AlertType,
  RacerProfile
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
  uuid: "f0449b54-f815-11e9-aad5-362b9e155667",
  name: "Valentino Rossi",
  email: "valentino.rossi@yamaha.jp",
  password: "rossiGp46",
  role: "user"
};
export const DEFAULT_ALERT_1: Alert = {
  id: 1,
  type: AlertType.SUCCESS,
  header: "Some header 1",
  content: "Success alert"
};
export const DEFAULT_ALERT_2: Alert = {
  id: 2,
  type: AlertType.INFO,
  header: "Some header 2",
  content: "Info alert"
};
export const DEFAULT_RACER_PROFILE_1: RacerProfile = {
  uuid: "d816d19e-0eb0-11ea-8d71-362b9e155667",
  userUUID: "d816cf32-0eb0-11ea-8d71-362b9e155667",
  name: "Valentino Rossi",
  bikeNumber: 46
};
export const DEFAULT_RACER_PROFILE_2: RacerProfile = {
  uuid: "d816d2f2-0eb0-11ea-8d71-362b9e155667",
  userUUID: "d816cf32-0eb0-11ea-8d71-362b9e155667",
  name: "Jorge Lorenzo",
  bikeNumber: 99
};
export const DEFAULT_RACER_PROFILE_3: RacerProfile = {
  uuid: "d816d428-0eb0-11ea-8d71-362b9e155667",
  userUUID: "d816cf32-0eb0-11ea-8d71-362b9e155667",
  name: "Dani Pedrosa",
  bikeNumber: 26
};
export const DEFAULT_RACER_PROFILE_4: RacerProfile = {
  uuid: "d816d554-0eb0-11ea-8d71-362b9e155667",
  userUUID: "d816cf32-0eb0-11ea-8d71-362b9e155667",
  name: "Marc Márquez",
  bikeNumber: 93
};