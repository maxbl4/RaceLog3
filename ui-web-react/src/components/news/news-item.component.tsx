import React from "react";
import { NewsItem } from "../../model/types/datatypes";
import { Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { DELIMITER, NEWS } from "../../model/routing/paths";
import { DEFAULT_ID, DEFAULT_DATE } from "../../model/utils/constants";

export type NewsItemProps = {
  item: NewsItem;
};

export class NewsItemComponent extends React.Component<NewsItemProps> {
  render() {
    return (
      <Row>
        <Col>
          <span>
            {new Date(
              this.props.item.date.orElse(DEFAULT_DATE)
            ).toDateString()}
          </span>
        </Col>
        <Col>
          <NavLink
            exact
            to={NEWS + DELIMITER + this.props.item.id.orElse(DEFAULT_ID)}
          >
            {this.props.item.header.orElse("")}
          </NavLink>
        </Col>
      </Row>
    );
  }
}
