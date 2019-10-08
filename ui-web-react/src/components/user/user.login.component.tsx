import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import { UserInfo } from "../../model/types/datatypes";
import { UserLoginPanelComponent } from "./user.login.panel.component";

export type UserLoginComponentProps = {
  onLogin: (userInfo: UserInfo) => void;
  onRegister: (userInfo: UserInfo) => void;
};

export class UserLoginComponent extends React.Component<UserLoginComponentProps> {
  render() {
    return (
      <Tabs defaultActiveKey="signIn" id="userLoginTabs">
        <Tab eventKey="signIn" title="Войти">
          <UserLoginPanelComponent mode="login" onSubmit={this.props.onLogin} />
        </Tab>
        <Tab eventKey="register" title="Зарегистрироваться">
          <UserLoginPanelComponent mode="register" onSubmit={this.props.onRegister} />
        </Tab>
      </Tabs>
    );
  }
}
