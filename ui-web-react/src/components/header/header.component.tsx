import React from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserInfo } from "../../model/types/datatypes";
import { Optional } from "../../model/utils/optional";

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
            <Nav.Link>
              <Link to="/">Home</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/login">Login</Link>
            </Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            {info ? (
              <Navbar.Text>Signed in as: {info.name}</Navbar.Text>
            ) : (
              <Button variant="success">Войти</Button>
            )}
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}
