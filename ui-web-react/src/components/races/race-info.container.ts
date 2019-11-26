import { StoredState, RacerProfile } from "../../model/types/datatypes";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  selectedRaceRequested,
  raceParticipantsUpdateRequested
} from "../../model/actions/actions";
import RaceInfoComponent from "./race-info.component";

const mapStateToProps = (state: StoredState) => {
  return {
    loggedIn: state.user.info.isPresent(),
    racerProfiles: state.racerProfiles.items,
    raceItemExt: state.selectedRace
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onDataReload: (id: number) => dispatch(selectedRaceRequested(id)),
  onRegistrationUpdate: (raceID: number, added: RacerProfile[], removed: RacerProfile[]) =>
    dispatch(raceParticipantsUpdateRequested(raceID, added, removed))
});

const RaceInfoContainer = connect(mapStateToProps, mapDispatchToProps)(RaceInfoComponent);

export default RaceInfoContainer;
