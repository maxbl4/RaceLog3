import { combineReducers } from "redux";
import { StoredState } from "../types/datatypes";
import { userReducer } from "./user.reducer";
import { racesReducer, selectedRaceReducer } from "./race.reducer";
import { alertsQueueReducer } from "./alertsQueue.reducer";
import { racerProfilesReducer } from "./racerProfiles.reducer";

const raceLogAppState = combineReducers<StoredState>({
  user: userReducer,
  racerProfiles: racerProfilesReducer,
  races: racesReducer,
  selectedRace: selectedRaceReducer,
  alertsQueue: alertsQueueReducer
});

export default raceLogAppState;
