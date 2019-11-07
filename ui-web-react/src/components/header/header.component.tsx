import React from "react";
import { UserInfo } from "../../model/types/datatypes";
import Optional from "optional-js";
import { DEFAULT, USER_SIGN_IN, USER_PROFILE } from "../../model/routing/paths";
import { NavLink } from "react-router-dom";

export type HeaderComponentProps = {
  userInfo: Optional<UserInfo>;
};

export class HeaderComponent extends React.Component<HeaderComponentProps> {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" exact to={DEFAULT}>
                Домой <span className="sr-only">(current)</span>
              </NavLink>
            </li>
          </ul>
          <div className="navbar-nav justify-content-end">
            {this.props.userInfo
              .map(info => this.renderUserLink("Привет, " + info.name, USER_PROFILE))
              .orElse(this.renderUserLink("Войти", USER_SIGN_IN))}
          </div>
        </div>
      </nav>
    );
  }

  renderUserLink = (label: string, path: string): JSX.Element => {
    return (
      <NavLink className="nav-item nav-link" exact to={path}>
        {label + " "}
        <span className="sr-only">(current)</span>
      </NavLink>
    );
  };
}
