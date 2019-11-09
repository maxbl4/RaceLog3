import { UserInfo, StoredState } from "../../model/types/datatypes";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { userLogout } from "../../model/actions/actions";
import UserProfileComponent from "./user.profile.component";

const mapStateToProps = (state: StoredState) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onLogout: (userInfo: UserInfo) => dispatch(userLogout(userInfo))
});

const UserProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileComponent);

export default UserProfileContainer;
