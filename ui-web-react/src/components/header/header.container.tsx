import { StoredState } from "../../model/types/datatypes";
import { HeaderComponent } from "./header.component";
import { connect } from "react-redux";

const mapStateToProps = (state: StoredState) => {
  return {
    userInfo: state.user ? state.user.info : undefined
  };
};

const HeaderContainer = connect(
  mapStateToProps
)(HeaderComponent);

export default HeaderContainer;
