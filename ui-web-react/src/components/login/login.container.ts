import { UserInfo } from "../../model/types/datatypes";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { userLogin, userReqistration } from "../../model/actions/actions";
import { LoginComponent } from "./login.component";

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onLogin: (userInfo: UserInfo) => dispatch(userLogin(userInfo)),
  onRegister: (userInfo: UserInfo) => dispatch(userReqistration(userInfo))
});

const LoginContainer = connect(mapDispatchToProps)(LoginComponent);

export default LoginContainer;
