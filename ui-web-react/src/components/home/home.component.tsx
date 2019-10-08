import React from "react";
import NewsListContainer from "../news/news-list.container";
import RaceListContainer from "../races/race-list.container";

export class HomeComponent extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-lg-12">
            <h1>Здесь должна быть картинка с байкером или еще что то :-)</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <NewsListContainer />
          </div>
          <div className="col-lg-6">
            <RaceListContainer />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
