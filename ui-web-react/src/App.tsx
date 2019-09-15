import React from "react";
import "./App.scss";
import HeaderContainer from "./components/header/header.container";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { DEFAULT, LOGIN } from "./model/routing/paths";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <HeaderContainer />
        <div>
          <Route exact path={DEFAULT} component={HomeComponent} />
          <Route path={LOGIN} component={LoginComponent} />
        </div>
      </Router>
    </>
  );
};

export default App;
