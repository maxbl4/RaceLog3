import React from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserInfo } from "../../model/types/datatypes";

export type HeaderComponentProps = {
  userInfo: UserInfo | undefined;
};

export class HeaderComponent extends React.Component<HeaderComponentProps> {
  render() {
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
            {this.props.userInfo ? (
              <Navbar.Text>
                Signed in as: <a href="#login">{this.props.userInfo.name}</a>
              </Navbar.Text>
            ) : (
              <Button variant="success">Войти</Button>
            )}
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}
