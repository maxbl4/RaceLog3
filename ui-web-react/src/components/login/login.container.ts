import { UserInfo, StoredState } from "../../model/types/datatypes";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { userLogin, userReqistration } from "../../model/actions/actions";
import { LoginComponent } from "./login.component";

const mapStateToProps = (state: StoredState) => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onLogin: (userInfo: UserInfo) => dispatch(userLogin(userInfo)),
  onRegister: (userInfo: UserInfo) => dispatch(userReqistration(userInfo))
});

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);

export default LoginContainer;
