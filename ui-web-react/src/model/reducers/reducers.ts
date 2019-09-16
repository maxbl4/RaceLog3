import { combineReducers } from "redux";
import { StoredState } from "../types/datatypes";
import { userReducer } from "./user.reducer";
import { newsReducer, selectedNewsReducer } from "./news.reducer";
import { racesReducer, selectedRaceReducer } from "./race.reducer";

const raceLogAppState = combineReducers<StoredState>({
  user: userReducer,
  news: newsReducer,
  selectedNews: selectedNewsReducer,
  races: racesReducer,
  selectedRace: selectedRaceReducer
});

export default raceLogAppState;
