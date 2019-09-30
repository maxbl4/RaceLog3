import React from "react";
import { UserInfo, User } from "../../model/types/datatypes";
import { INITIAL_USER_INFO } from "../../model/reducers/user.reducer";
import { FetchingComponent } from "../fetching/fetching.component";
import { DEFAULT_ID } from "../../model/utils/constants";
import { UserProfileComponent } from "./user.profile.component";
import { UserLoginComponent } from "./user.login.component";

export type UserComponentProps = {
  user: User;
  onLogin: (userInfo: UserInfo) => void;
  onLogout: (userInfo: UserInfo) => void;
  onRegister: (userInfo: UserInfo) => void;
};

export class UserComponent extends React.Component<UserComponentProps> {
  render() {
    if (this.props.user.isFetching) {
      return <FetchingComponent />;
    } else {
      const userID = this.props.user.info
        .map(uf => uf.id)
        .orElse(DEFAULT_ID);
      if (userID === DEFAULT_ID) {
        return (
          <UserLoginComponent
            onLogin={this.props.onLogin}
            onRegister={this.props.onRegister}
          />
        );
      } else {
        return (
          <UserProfileComponent
            info={this.props.user.info.orElse(INITIAL_USER_INFO)}
            onLogout={this.props.onLogout}
          />
        );
      }
    }
  }
}
