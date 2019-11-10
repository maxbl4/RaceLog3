import { UserInfo, StoredState } from "../../model/types/datatypes";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { userLogin } from "../../model/actions/actions";
import UserAuthComponent, { AuthMode } from "./user.auth.component";

const mapStateToProps = (state: StoredState) => {
  return {
    user: state.user,
    mode: AuthMode.SIGN_IN
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSubmit: (userInfo: UserInfo) => dispatch(userLogin(userInfo))
});

const UserSignInContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAuthComponent);

export default UserSignInContainer;
