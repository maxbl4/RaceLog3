import { connect } from "react-redux";
import { Dispatch } from "redux";
import { StoredState } from "./model/types/datatypes";
import { MainComponent } from "./main.component";
import { userLoginOnStart } from "./model/actions/user.actions";

const mapStateToProps = (state: StoredState) => {
  return {
    userInfo: state.user.info
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onMainCompMountFn: () => dispatch(userLoginOnStart())
});

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainComponent);

export default MainContainer;
