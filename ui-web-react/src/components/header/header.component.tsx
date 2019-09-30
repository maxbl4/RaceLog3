import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { UserInfo } from "../../model/types/datatypes";
import Optional from "optional-js";
import { DEFAULT, USER } from "../../model/routing/paths";
import { NavLink } from "react-router-dom";

export type HeaderComponentProps = {
  userInfo: Optional<UserInfo>;
};

export class HeaderComponent extends React.Component<HeaderComponentProps> {
  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Nav className="mr-auto">
            <NavLink exact to={DEFAULT}>
              Домой
            </NavLink>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <NavLink exact to={USER}>
              {this.props.userInfo.map(info => "Привет, " + info.name).orElse("Войти")}
            </NavLink>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}
