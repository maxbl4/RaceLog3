import React from "react";
import NewsContainer from "../news/news.container";
import RacesContainer from "../races/races.container";
import { Row, Col } from "react-bootstrap";

export class HomeComponent extends React.Component {
  render() {
    return (
      <>
        <Row>
          <h1>Here shoueld be some image</h1>
        </Row>
        <Row>
          <Col>
            <NewsContainer />
          </Col>
          <Col>
            <RacesContainer />
          </Col>
        </Row>
      </>
    );
  }
}
