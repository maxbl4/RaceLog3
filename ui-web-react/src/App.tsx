import React from "react";
import "./App.scss";
import { HeaderComponent } from "./components/header/header.component";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <HeaderComponent />
        <div>
          <Route exact path="/" component={HomeComponent} />
          <Route path="/login" component={LoginComponent} />
        </div>
      </Router>
    </>
  );
};

export default App;
