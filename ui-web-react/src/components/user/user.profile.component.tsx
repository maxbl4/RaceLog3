import React from "react";
import { UserInfo } from "../../model/types/datatypes";
import { getRoleName } from "../../model/types/roles.model";

export type UserProfileComponentProps = {
  info: UserInfo;
  onLogout: (userInfo: UserInfo) => void;
};

export class UserProfileComponent extends React.Component<UserProfileComponentProps> {
  render() {
    return (
      <div>
        {this.renderRow("UUID", this.props.info.uuid)}
        {this.renderRow("Роль", getRoleName(this.props.info.role))}
        {this.renderRow("Имя", this.props.info.name)}
        {this.renderRow("Почта", this.props.info.email)}
        {this.renderRow("Пароль", this.props.info.password)}

        <div className="row">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => this.props.onLogout(this.props.info)}
          >
            Выйти
          </button>
        </div>
      </div>
    );
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
