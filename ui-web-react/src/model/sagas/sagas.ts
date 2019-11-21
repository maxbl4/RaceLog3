import { all, call } from "redux-saga/effects";
import { newsSaga, selectedNewsSaga } from "./news.saga";
import { racesSaga, selectedRaceSaga } from "./race.saga";
import {
  userLoginSaga,
  userRegistrationSaga,
  userLogoutSaga,
  userLoginOnStartSaga
} from "./user.saga";
import { alertsHideSaga } from "./alerts.saga";
import { racerProfilesRequestAll, racerProfilesUpdate } from "./racerProfiles.saga";

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

function* raceLogSaga() {
  yield all([
    call(newsSaga),
    call(racesSaga),
    call(selectedNewsSaga),
    call(selectedRaceSaga),
    call(userLoginSaga),
    call(userLoginOnStartSaga),
    call(userLogoutSaga),
    call(userRegistrationSaga),
    call(alertsHideSaga),
    call(racerProfilesRequestAll),
    call(racerProfilesUpdate)
  ]);
}

export default raceLogSaga;
