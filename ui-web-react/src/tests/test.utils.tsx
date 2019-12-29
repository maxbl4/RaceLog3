import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import { createLocation, createMemoryHistory } from "history";
import { match as routerMatch } from "react-router";
import { render } from "@testing-library/react";
import raceLogAppState from "../model/reducers/reducers";
import {
  StoredState,
  INITIAL_STORED_STATE,
  INITIAL_RACER_PROFILES,
  INITIAL_ALERTS_QUEUE,
  INITIAL_USER,
  INITIAL_SELECTED_RACE,
  INITIAL_RACE_RESULTS,
  RacerResults
} from "../model/types/datatypes";
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
import { RaceState } from "../model/types/races.model";
import { Role } from "../model/types/roles.model";

// const {history, location, match} = routerTestProps(RACES_INFO, {id: "1"})
// const {findByText} = renderWithReduxAndRouter(<RaceInfoContainer history={history} location={location} match={match}/>, DEFAULT_STORED_STATE)

type MatchParameter<Params> = { [K in keyof Params]?: string };

export const routerTestProps = <Params extends MatchParameter<Params> = {}>(
  path: string,
  params: Params,
  extendMatch: Partial<routerMatch<any>> = {}
) => {
  const match: routerMatch<Params> = Object.assign(
    {},
    {
      isExact: false,
      path,
      url: generateUrl(path, params),
      params
    },
    extendMatch
  );
  const history = createMemoryHistory();
  const location = createLocation(match.url);

  return { history, location, match };
};

const generateUrl = <Params extends MatchParameter<Params>>(
  path: string,
  params: Params
): string => {
  let tempPath = path;

  for (const param in params) {
    if (params.hasOwnProperty(param)) {
      const value = params[param];
      tempPath = tempPath.replace(`:${param}`, value as NonNullable<typeof value>);
    }
  }

  return tempPath;
};

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

export const inputText = (text: string) => {
  return {
    target: {
      value: text
    }
  };
};

export const compareOptional = (item1: Optional<any>, item2: Optional<any>): boolean => {
  if (item1.isPresent() && item2.isPresent()) {
    item1.ifPresent(value1 => {
      item2.ifPresent(value2 => {
        return value1 === value2;
      })
    })
    return true;
  } else {
    return false;
  }
};

export const compareProfiles = (rp1: RacerProfile, rp2: RacerProfile): void => {
  expect(rp1.uuid).toEqual(rp2.uuid);
  expect(rp1.userUUID).toEqual(rp2.userUUID);
  expect(rp1.name).toEqual(rp2.name);
  expect(rp1.bikeNumber).toEqual(rp2.bikeNumber);
  expect(compareOptional(rp1.userUUID, rp2.userUUID)).toBeTruthy();
};

export const compareRacerResults = (rr1: RacerResults, rr2: RacerResults): void => {
  expect(rr1.racerUUID).toEqual(rr2.racerUUID);
  expect(compareOptional(rr1.position, rr2.position)).toBeTruthy();
  expect(compareOptional(rr1.time, rr2.time)).toBeTruthy();
  expect(compareOptional(rr1.points, rr2.points)).toBeTruthy();
  expect(compareOptional(rr1.laps, rr2.laps)).toBeTruthy();
}

export const compareRaceItems = (ri1: RaceItemExt, ri2: RaceItemExt): void => {
  expect(ri1.id).toEqual(ri2.id);
  expect(ri1.name).toEqual(ri2.name);
  expect(ri1.date).toEqual(ri2.date);
  expect(ri1.location).toEqual(ri2.location);
  expect(ri1.description).toEqual(ri2.description);
  expect(ri1.state).toEqual(ri2.state);
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
  name: "Grand Prix of France",
  date: 1558040400000,
  location: "Le Mans, France"
};
export const DEFAULT_RACE_ITEM_2: RaceItem = {
  id: 2,
  name: "Grand Prix of Catalunya",
  date: 1559854800000,
  location: "Barcelona, Spain"
};
export const DEFAULT_RACE_ITEM_3: RaceItem = {
  id: 3,
  name: "Grand Prix of Germany",
  date: 1561064400000,
  location: "Sachsenring, Germany"
};
export const DEFAULT_RACE_ITEM_4: RaceItem = {
  id: 4,
  name: "Grand Prix of Great Britain",
  date: 1567112400000,
  location: "Silverstone, Great Britain"
};
export const DEFAULT_RACE_ITEM_EXT_1: RaceItemExt = {
  ...DEFAULT_RACE_ITEM_1,
  isFetching: false,
  description: "Description for Grand Prix of France.",
  participants: { ...INITIAL_RACER_PROFILES },
  state: RaceState.NOT_STARTED,
  results: { ...INITIAL_RACE_RESULTS }
};
export const DEFAULT_RACE_ITEM_EXT_2: RaceItemExt = {
  ...DEFAULT_RACE_ITEM_2,
  isFetching: false,
  description: "Description for Grand Prix of Catalunya.",
  participants: { ...INITIAL_RACER_PROFILES },
  state: RaceState.STARTED,
  results: { ...INITIAL_RACE_RESULTS }
};
export const DEFAULT_RACE_ITEM_EXT_3: RaceItemExt = {
  ...DEFAULT_RACE_ITEM_3,
  isFetching: false,
  description: "Description for Grand Prix of Germany.",
  participants: { ...INITIAL_RACER_PROFILES },
  state: RaceState.STOPPED,
  results: { ...INITIAL_RACE_RESULTS }
};
export const DEFAULT_RACE_ITEM_EXT_4: RaceItemExt = {
  ...DEFAULT_RACE_ITEM_4,
  isFetching: false,
  description: "Description for Grand Prix of Great Britain.",
  participants: { ...INITIAL_RACER_PROFILES },
  state: RaceState.FINISHED,
  results: { ...INITIAL_RACE_RESULTS }
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

export const DEFAULT_RACER_RESULTS_1: RacerResults = {
  racerUUID: "d816d19e-0eb0-11ea-8d71-362b9e155667",
  position: Optional.of(1),
  time: Optional.of(1577148081469),
  laps: Optional.of(27),
  points: Optional.of(25)
};
export const DEFAULT_RACER_RESULTS_2: RacerResults = {
  racerUUID: "d816d2f2-0eb0-11ea-8d71-362b9e155667",
  position: Optional.of(2),
  time: Optional.of(1577148082495),
  laps: Optional.of(27),
  points: Optional.of(20)
};
export const DEFAULT_RACER_RESULTS_3: RacerResults = {
  racerUUID: "d816d428-0eb0-11ea-8d71-362b9e155667",
  position: Optional.of(3),
  time: Optional.of(1577148083878),
  laps: Optional.of(27),
  points: Optional.of(16)
};
export const DEFAULT_RACER_RESULTS_4: RacerResults = {
  racerUUID: "d816d554-0eb0-11ea-8d71-362b9e155667",
  position: Optional.of(4),
  time: Optional.of(1577148084795),
  laps: Optional.of(27),
  points: Optional.of(13)
};

export const DEFAULT_RACE_ITEM_EXT: RaceItemExt = {
  isFetching: false,
  id: 5,
  name: "Grand Prix of Austria",
  date: 1565902800000,
  location: "Spielberg, Austria",
  description:
    "The Red Bull Ring in Spielberg is located beautifully in the Murtal-region of Styria, Austria. The circuit was originally built in 1969, then known as the Österreichring. In 1996, it was rebuilt with the track-layout it still has today and in 2011 was reopened as the Red Bull Ring and again became the centre of Austrian motorsports. The sloping terrain and the natural arena are trademark features of the Red Bull Ring with the 18-metre-high landmark “Bull of Spielberg” in the centre and the voestalpine wing offering a spectacular architectural highlight. With a length of 4.318 km it features 10 turns and an altitude difference of 65 metres. The 2016 season saw the Red Bull Ring host its first MotoGP™ race as the World Championship returned to Austria for the first time since 1997.",
  participants: {
    isFetching: false,
    items: Optional.of([DEFAULT_RACER_PROFILE_1, DEFAULT_RACER_PROFILE_2])
  },
  state: RaceState.NOT_STARTED,
  results: {
    isFetching: false,
    items: Optional.of([DEFAULT_RACER_RESULTS_1, DEFAULT_RACER_RESULTS_2])
  }
};
export const DEFAULT_USER_INFO: UserInfo = {
  uuid: "f0449b54-f815-11e9-aad5-362b9e155667",
  name: "Valentino Rossi",
  email: "valentino.rossi@yamaha.jp",
  password: "rossiGp46",
  role: Role.ADMIN
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
  items: Optional.of([
    DEFAULT_RACE_ITEM_1,
    DEFAULT_RACE_ITEM_2,
    DEFAULT_RACE_ITEM_3,
    DEFAULT_RACE_ITEM_4
  ])
};

export const DEFAULT_STORED_STATE: StoredState = {
  user: {
    isFetching: false,
    info: Optional.of(DEFAULT_USER_INFO)
  },
  racerProfiles: {
    isFetching: false,
    items: Optional.of([DEFAULT_RACER_PROFILE_1, DEFAULT_RACER_PROFILE_2])
  },
  races: DEFAULT_RACES,
  selectedRace: DEFAULT_RACE_ITEM_EXT,
  alertsQueue: INITIAL_ALERTS_QUEUE
};

export const DEFAULT_NON_AUTHORIZED_STORED_STATE: StoredState = {
  user: INITIAL_USER,
  racerProfiles: { ...INITIAL_RACER_PROFILES },
  races: DEFAULT_RACES,
  selectedRace: INITIAL_SELECTED_RACE,
  alertsQueue: INITIAL_ALERTS_QUEUE
};
