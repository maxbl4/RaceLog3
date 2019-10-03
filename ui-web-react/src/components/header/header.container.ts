import { StoredState } from "../../model/types/datatypes";
import { HeaderComponent } from "./header.component";
import { connect } from "react-redux";

const mapStateToProps = (state: StoredState) => {
  return {
    userInfo: state.user.info
  };
};

const HeaderContainer = connect(
  mapStateToProps
)(HeaderComponent);

export default HeaderContainer;
