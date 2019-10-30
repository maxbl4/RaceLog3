import React from "react";
import { UserInfo, User } from "../../model/types/datatypes";
import { FetchingComponent } from "../fetching/fetching.component";
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
    } else if (this.props.user.info.isPresent()) {
      return (
        <UserProfileComponent info={this.props.user.info.get()} onLogout={this.props.onLogout} />
      );
    } else {
      return <UserLoginComponent onLogin={this.props.onLogin} onRegister={this.props.onRegister} />;
    }
  }
}
