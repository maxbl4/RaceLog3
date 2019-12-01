import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";
import raceLogAppState from "../model/reducers/reducers";
import { StoredState, INITIAL_STORED_STATE } from "../model/types/datatypes";
import {
  RaceItem,
  RaceItemExt,
  UserInfo,
  Alert,
  AlertType,
  RacerProfile,
  Races
} from "../model/types/datatypes";
import Optional from "optional-js";

export const renderWithRedux = (
  ui: React.ReactElement,
  initialState: StoredState = INITIAL_STORED_STATE
) => {
  const store = createStore(raceLogAppState, initialState);
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store
  };
};

export const renderWithReduxAndRouter = (
  ui: React.ReactElement,
  initialState: StoredState = INITIAL_STORED_STATE
) => {
  return renderWithRedux(<Router>{ui}</Router>, initialState);
};

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

export const compareRaceItems = (ri1: RaceItemExt, ri2: RaceItemExt): void => {
  expect(ri1.id).toEqual(ri2.id);
  expect(ri1.name).toEqual(ri2.name);
  expect(ri1.date).toEqual(ri2.date);
  expect(ri1.location).toEqual(ri2.location);
  expect(ri1.description).toEqual(ri2.description);
  if (!!ri1.participants) {
    expect(!!ri2.participants).toBeTruthy();

    const partItems1 = ri1.participants.items;
    const partItems2 = ri2.participants.items;
    if (partItems1.isPresent()) {
      const items1 = partItems1.orElse([]);
      const items2 = partItems2.orElse([]);
      expect(items1.length).toEqual(items2.length);
      for (let i = 0; i < items1.length; i++) {
        compareProfiles(items1[i], items2[i]);
      }
    } else {
      expect(partItems2.isPresent()).toBeFalsy();
    }
  } else {
    expect(!!ri2.participants).toBeFalsy();
  }
};

export const compareRaceItemsSimple = (ri1: RaceItem, ri2: RaceItem): void => {
  expect(ri1.id).toEqual(ri2.id);
  expect(ri1.date).toEqual(ri2.date);
  expect(ri1.location).toEqual(ri2.location);
  expect(ri1.name).toEqual(ri2.name);
};

export const compareRaces = (r1: Races, r2: Races): void => {
  if (!r1) {
    expect(!r2).toBeTruthy();
    return;
  }

  if (!r2) {
    expect(!r1).toBeTruthy();
    return;
  }

  if (r1.items.isPresent()) {
    expect(r2.items.isPresent()).toBeTruthy();
  }

  if (r2.items.isPresent()) {
    expect(r1.items.isPresent()).toBeTruthy();
  }

  const items1 = r1.items.orElse([]);
  const items2 = r1.items.orElse([]);
  expect(items1.length).toEqual(items2.length);

  for (let i = 0; i < items1.length; i++) {
    compareRaceItemsSimple(items1[i], items2[i]);
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

export const DEFAULT_RACE_ITEM_EXT: RaceItemExt = {
  isFetching: false,
  id: 1,
  name: "Some race name 1",
  date: 1570728837485,
  location: "Some location 1",
  description: "Some descr 1",
  participants: {
    isFetching: false,
    items: Optional.of([DEFAULT_RACER_PROFILE_1, DEFAULT_RACER_PROFILE_2])
  }
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
export const DEFAULT_RACES: Races = {
  isFetching: false,
  items: Optional.of([DEFAULT_RACE_ITEM_1, DEFAULT_RACE_ITEM_2])
};

export const inputText = (text: string) => {
  return {
    target: {
      value: text
    }
  };
};
