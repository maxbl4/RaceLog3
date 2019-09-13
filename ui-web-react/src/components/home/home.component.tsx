import React from "react";
import NewsContainer from "../news/news.container";
import RacesContainer from "../races/races.container";

export class HomeComponent extends React.Component {
  render() {
    return (
      <>
        <div>Here should be a picture with bike</div>
        <div>
          <NewsContainer />
          <RacesContainer />
        </div>
      </>
    );
  }
}
