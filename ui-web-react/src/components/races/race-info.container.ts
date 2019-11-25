import { StoredState } from "../../model/types/datatypes";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { selectedRaceRequested } from "../../model/actions/actions";
import RaceInfoComponent from "./race-info.component";

const mapStateToProps = (state: StoredState) => {
  return {
    loggedIn: state.user.info.isPresent(),
    racerProfiles: state.racerProfiles.items,
    raceItemExt: state.selectedRace
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onDataReload: (id: number) => dispatch(selectedRaceRequested(id))
});

const RaceInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RaceInfoComponent);

export default RaceInfoContainer;
