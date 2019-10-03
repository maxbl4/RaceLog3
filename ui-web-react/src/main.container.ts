import { connect } from "react-redux";
import { StoredState } from "./model/types/datatypes";
import { MainComponent } from "./main.component";

const mapStateToProps = (state: StoredState) => {
  return {
    userInfo: state.user.info
  };
};

const MainContainer = connect(mapStateToProps)(MainComponent);

export default MainContainer;
