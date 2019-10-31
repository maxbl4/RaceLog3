import React from "react";
import HeaderContainer from "./components/header/header.container";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { HomeComponent } from "./components/home/home.component";
import { DEFAULT, RACES_INFO, NEWS_INFO, USER } from "./model/routing/paths";
import RaceInfoContainer from "./components/races/race-info.container";
import NewsInfoContainer from "./components/news/news-info.container";
import UserContainer from "./components/user/user.container";
import Optional from "optional-js";
import { UserInfo } from "./model/types/datatypes";
import { LoggingService } from "./model/utils/logging-service";
import AlertContainer from "./components/alert/alert.container";

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
          <Route path={USER} component={UserContainer} />
          <Route path={RACES_INFO} component={RaceInfoContainer} />
          <Route path={NEWS_INFO} component={NewsInfoContainer} />
        </div>
      </Router>
    );
  }
}
