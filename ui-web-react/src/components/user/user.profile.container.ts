import { UserInfo, StoredState, RacerProfile } from "../../model/types/datatypes";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { userLogout, racerProfilesUpdateRequested } from "../../model/actions/actions";
import UserProfileComponent from "./user.profile.component";

const mapStateToProps = (state: StoredState) => {
  return {
    user: state.user,
    racerProfiles: state.racerProfiles
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onLogout: (userInfo: UserInfo) => dispatch(userLogout(userInfo)),
  onProfilesUpdate: (userUUID: string, added: RacerProfile[], removed: RacerProfile[], updated: RacerProfile[]) =>
    dispatch(racerProfilesUpdateRequested(userUUID, added, removed, updated))
});

const UserProfileContainer = connect(mapStateToProps, mapDispatchToProps)(UserProfileComponent);

export default UserProfileContainer;
