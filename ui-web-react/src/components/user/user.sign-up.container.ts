import { UserInfo, StoredState } from "../../model/types/datatypes";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { userReqistration } from "../../model/actions/user.actions";
import UserAuthComponent, { AuthMode } from "./user.auth.component";

const mapStateToProps = (state: StoredState) => {
  return {
    user: state.user,
    mode: AuthMode.SIGN_UP
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSubmit: (userInfo: UserInfo) => dispatch(userReqistration(userInfo))
});

const UserSignUpContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAuthComponent);

export default UserSignUpContainer;
