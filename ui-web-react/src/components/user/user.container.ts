import { UserInfo, StoredState } from "../../model/types/datatypes";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  userLogin,
  userReqistration,
  userLogout
} from "../../model/actions/actions";
import { UserComponent } from "./user.component";

const mapStateToProps = (state: StoredState) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onLogin: (userInfo: UserInfo) => dispatch(userLogin(userInfo)),
  onLogout: (userInfo: UserInfo) => dispatch(userLogout(userInfo)),
  onRegister: (userInfo: UserInfo) => dispatch(userReqistration(userInfo))
});

const UserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserComponent);

export default UserContainer;
