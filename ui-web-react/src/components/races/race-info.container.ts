import { StoredState, RacerProfile } from "../../model/types/datatypes";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  selectedRaceRequested,
  raceParticipantsUpdateRequested
} from "../../model/actions/race.actions";
import RaceInfoComponent from "./race-info.component";

const mapStateToProps = (state: StoredState) => {
  return {
    user: state.user.info,
    racerProfiles: state.racerProfiles.items,
    raceItemExt: state.selectedRace
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onDataReload: (id: number) => dispatch(selectedRaceRequested(id)),
  onRegistrationUpdate: (userUUID: string, raceID: number, added: RacerProfile[], removed: RacerProfile[]) =>
    dispatch(raceParticipantsUpdateRequested(userUUID, raceID, added, removed))
});

const RaceInfoContainer = connect(mapStateToProps, mapDispatchToProps)(RaceInfoComponent);

export default RaceInfoContainer;
