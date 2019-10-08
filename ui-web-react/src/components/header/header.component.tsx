import React from "react";
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
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" exact to={DEFAULT}>
                Домой <span className="sr-only">(current)</span>
              </NavLink>
            </li>
          </ul>
          <div className="navbar-nav justify-content-end">
            <NavLink className="nav-item nav-link" exact to={USER}>
              {this.props.userInfo.map(info => "Привет, " + info.name).orElse("Войти")}{" "}
              <span className="sr-only">(current)</span>
            </NavLink>
          </div>
        </div>
      </nav>
    );
  }
}
