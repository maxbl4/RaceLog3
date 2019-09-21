import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { UserInfo } from "../../model/types/datatypes";
import { Optional } from "../../model/utils/optional";
import { DEFAULT, USER } from "../../model/routing/paths";
import { NavLink } from "react-router-dom";

export type HeaderComponentProps = {
  userInfo: Optional<UserInfo>;
};

export class HeaderComponent extends React.Component<HeaderComponentProps> {
  render() {
    const info = this.props.userInfo.getNullable();
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
              {info ? "Привет, " + info.name : "Войти"}
            </NavLink>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}
