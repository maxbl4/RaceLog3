import React from "react";
import "./App.scss";
import HeaderContainer from "./components/header/header.container";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { DEFAULT, LOGIN, RACES_INFO, NEWS_INFO } from "./model/routing/paths";
import { RaceInfoComponent } from "./components/races/race-info.component";
import { NewsInfoComponent } from "./components/news/news-info.component";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <HeaderContainer />
        <div>
          <Route exact path={DEFAULT} component={HomeComponent} />
          <Route path={LOGIN} component={LoginComponent} />
          <Route path={RACES_INFO} component={RaceInfoComponent} />
          <Route path={NEWS_INFO} component={NewsInfoComponent} />
        </div>
      </Router>
    </>
  );
};

export default App;
