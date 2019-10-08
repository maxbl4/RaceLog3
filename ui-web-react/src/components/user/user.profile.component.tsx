import React from "react";
import { UserInfo } from "../../model/types/datatypes";
import { getRoleName } from "../../model/types/roles.model";
import { getClassCompetitionName } from "../../model/types/class-competition.model";

export type UserProfileComponentProps = {
  info: UserInfo;
  onLogout: (userInfo: UserInfo) => void;
};

export class UserProfileComponent extends React.Component<UserProfileComponentProps> {
  render() {
    return (
      <div>
        {this.renderRow("ID", this.props.info.id)}
        {this.renderRow("Роль", getRoleName(this.props.info.role))}
        {this.renderRow("Имя", this.props.info.name)}
        {this.renderRow("Почта", this.props.info.email)}
        {this.renderRow("Пароль", this.props.info.password)}
        {this.renderRow("Номер байка", this.props.info.bikeNumber)}
        {this.renderRow(
          "Класс соревнований",
          getClassCompetitionName(this.props.info.classCompetition)
        )}
        {this.renderRow("Статистика гонок", "Здесь должна быть статистика")}

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
