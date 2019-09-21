import React from "react";
import { Nav, Navbar } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { UserInfo } from "../../model/types/datatypes";
import { Optional } from "../../model/utils/optional";
import { DEFAULT, USER } from "../../model/routing/paths";

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
            {/* <Link to={DEFAULT}>Домой</Link> */}
            <Nav.Link href={DEFAULT}>Домой</Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            {info ? (
              /* <Link to={LOGIN}>Привет, {info.name}</Link> */
              <Nav.Link href={USER}>Привет, {info.name}</Nav.Link>
            ) : (
              /* <Link to={LOGIN}>Войти</Link> */
              <Nav.Link href={USER}>Войти</Nav.Link>
            )}
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}
