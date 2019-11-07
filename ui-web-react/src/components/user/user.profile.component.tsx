import React from "react";
import { UserInfo, User } from "../../model/types/datatypes";
import { getRoleName } from "../../model/types/roles.model";
import { FetchingComponent } from "../fetching/fetching.component";
import { Redirect } from "react-router";
import { USER_SIGN_IN } from "../../model/routing/paths";

export type UserProfileComponentProps = {
  user: User;
  onLogout: (userInfo: UserInfo) => void;
};

export class UserProfileComponent extends React.Component<UserProfileComponentProps> {
  render() {
    if (this.props.user.isFetching) {
      return <FetchingComponent />;
    } else {
      return this.props.user.info
        .map(info => (
          <div>
            {this.renderRow("UUID", info.uuid)}
            {this.renderRow("Роль", getRoleName(info.role))}
            {this.renderRow("Имя", info.name)}
            {this.renderRow("Почта", info.email)}
            {this.renderRow("Пароль", info.password)}

            <div className="row">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => this.props.onLogout(info)}
              >
                Выйти
              </button>
            </div>
          </div>
        ))
        .orElse(<Redirect to={USER_SIGN_IN} />);
    }
  }

  renderRow = (label: string, value: any): JSX.Element => {
    return (
      <div className="row">
        <div className="col-lg-3">{label}: </div>
        <div className="col-lg-5">{value}</div>
      </div>
    );
  };
}
