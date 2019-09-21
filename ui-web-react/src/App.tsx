import React from "react";
import "./App.scss";
import HeaderContainer from "./components/header/header.container";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { HomeComponent } from "./components/home/home.component";
import { DEFAULT, RACES_INFO, NEWS_INFO, USER } from "./model/routing/paths";
import RaceInfoContainer from "./components/races/race-info.container";
import NewsInfoContainer from "./components/news/news-info.container";
import UserContainer from "./components/user/user.container";

const App: React.FC = () => {
  return (
    <Router>
      <HeaderContainer />
      <div>
        <Route exact path={DEFAULT} component={HomeComponent} />
        <Route path={USER} component={UserContainer} />
        <Route path={RACES_INFO} component={RaceInfoContainer} />
        <Route path={NEWS_INFO} component={NewsInfoContainer} />
      </div>
    </Router>
  );
};

export default App;
