import {
  RaceItem,
  RaceItemExt,
  UserInfo,
  Alert,
  AlertType,
  RacerProfile
} from "../types/datatypes";
import Optional from "optional-js";

export const compareProfiles = (rp1: RacerProfile, rp2: RacerProfile): void => {
  expect(rp1.uuid).toEqual(rp2.uuid);
  expect(rp1.userUUID).toEqual(rp2.userUUID);
  expect(rp1.name).toEqual(rp2.name);
  expect(rp1.bikeNumber).toEqual(rp2.bikeNumber);
  if (rp1.userUUID.isPresent()) {
    expect(rp1.userUUID.get()).toEqual(rp2.userUUID.get());
  } else {
    expect(rp2.userUUID.isPresent()).toBeFalsy();
  }
};

export const UNKNOWN_ACTION_TYPE = "UNKNOWN_ACTION_TYPE";

export const DEFAULT_RACE_ITEM_1: RaceItem = {
  id: 1,
  name: "Some race name 1",
  date: 1570728837485,
  location: "Some location 1"
};
export const DEFAULT_RACE_ITEM_2: RaceItem = {
  id: 2,
  name: "Some race name 2",
  date: 1571529537459,
  location: "Some location 2"
};
export const DEFAULT_RACE_ITEM_EXT: RaceItemExt = {
  isFetching: false,
  id: 1,
  name: "Some race name 1",
  date: 1570728837485,
  location: "Some location 1",
  description: "Some descr 1",
  participants: Optional.of([
    {uuid: "some_uuid_1", userUUID: Optional.of("some_user_uuid-1"), name: "Valentino Rossi", bikeNumber: 46},
    {uuid: "some_uuid_2", userUUID: Optional.of("some_user_uuid-2"), name: "Jorge Lorenzo", bikeNumber: 99}
  ])
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
  userUUID: Optional.of("d816cf32-0eb0-11ea-8d71-362b9e155667"),
  name: "Valentino Rossi",
  bikeNumber: 46
};
export const DEFAULT_RACER_PROFILE_2: RacerProfile = {
  uuid: "d816d2f2-0eb0-11ea-8d71-362b9e155667",
  userUUID: Optional.of("d816cf32-0eb0-11ea-8d71-362b9e155667"),
  name: "Jorge Lorenzo",
  bikeNumber: 99
};
export const DEFAULT_RACER_PROFILE_3: RacerProfile = {
  uuid: "d816d428-0eb0-11ea-8d71-362b9e155667",
  userUUID: Optional.of("d816cf32-0eb0-11ea-8d71-362b9e155667"),
  name: "Dani Pedrosa",
  bikeNumber: 26
};
export const DEFAULT_RACER_PROFILE_4: RacerProfile = {
  uuid: "d816d554-0eb0-11ea-8d71-362b9e155667",
  userUUID: Optional.of("d816cf32-0eb0-11ea-8d71-362b9e155667"),
  name: "Marc Márquez",
  bikeNumber: 93
};
