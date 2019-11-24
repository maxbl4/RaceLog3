import React from "react";
import HeaderContainer from "./components/header/header.container";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeComponent from "./components/home/home.component";
import {
  DEFAULT,
  RACES_INFO,
  USER_PROFILE,
  USER_SIGN_IN,
  USER_SIGN_UP
} from "./model/routing/paths";
import RaceInfoContainer from "./components/races/race-info.container";
import Optional from "optional-js";
import { UserInfo } from "./model/types/datatypes";
import { LoggingService } from "./model/utils/logging-service";
import AlertContainer from "./components/alert/alert.container";
import UserProfileContainer from "./components/user/user.profile.container";
import UserSignInContainer from "./components/user/user.sign-in.container";
import UserSignUpContainer from "./components/user/user.sign-up.container";

export type MainComponentProps = {
  userInfo: Optional<UserInfo>;
  onMainCompMountFn: () => void;
};

export class MainComponent extends React.Component<MainComponentProps> {
  constructor(props: MainComponentProps) {
    super(props);

    this.updateLoggerService();
  }

  componentDidMount() {
    this.props.onMainCompMountFn();
  }

  componentDidUpdate() {
    this.updateLoggerService();
  }

  updateLoggerService() {
    LoggingService.getInstance().setUserInfo(this.props.userInfo);
  }

  render() {
    return (
      <Router>
        <HeaderContainer />
        <AlertContainer />
        <div>
          <Route exact path={DEFAULT} component={HomeComponent} />
          <Route path={USER_PROFILE} component={UserProfileContainer} />
          <Route path={USER_SIGN_IN} component={UserSignInContainer} />
          <Route path={USER_SIGN_UP} component={UserSignUpContainer} />
          <Route path={RACES_INFO} component={RaceInfoContainer} />
        </div>
      </Router>
    );
  }
}
