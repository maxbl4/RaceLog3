import React from "react";
import NewsListContainer from "../news/news-list.container";
import RaceListContainer from "../races/race-list.container";
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
            <NewsListContainer />
          </Col>
          <Col>
            <RaceListContainer />
          </Col>
        </Row>
      </>
    );
  }
}
