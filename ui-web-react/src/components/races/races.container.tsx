import { StoredState } from "../../model/types/datatypes";
import { RacesComponent } from "./races.component";
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

const RacesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RacesComponent);

export default RacesContainer;
