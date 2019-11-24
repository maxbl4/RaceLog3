import { StoredState } from "../../model/types/datatypes";
import RaceListComponent from "./race-list.component";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { racesRequested } from "../../model/actions/actions";

const mapStateToProps = (state: StoredState) => {
  return {
    races: state.races
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onDataReload: () => dispatch(racesRequested())
});

const RaceListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RaceListComponent);

export default RaceListContainer;
