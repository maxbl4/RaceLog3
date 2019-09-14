import React from "react";
import { NewsItem } from "../../model/types/datatypes";
import { Nav, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DELIMITER, NEWS } from "../../model/routing/paths";

export type NewsItemProps = {
  item: NewsItem;
};

export class NewsItemComponent extends React.Component<NewsItemProps> {
  render() {
    return (
      <Row>
        <Col>
          <span>{new Date(this.props.item.date).toDateString()}</span>
        </Col>
        <Col>
          <Nav.Link>
            <Link to={NEWS + DELIMITER + this.props.item.id}>
              {this.props.item.header}
            </Link>
          </Nav.Link>
        </Col>
      </Row>
    );
  }
}
