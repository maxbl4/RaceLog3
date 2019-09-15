import React from "react";
import { RaceItem } from "../../model/types/datatypes";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DELIMITER, RACES } from "../../model/routing/paths";

export type RaceItemProps = {
  item: RaceItem;
};

export class RaceItemComponent extends React.Component<RaceItemProps> {
  render() {
    return (
      <Row>
        <Col>
          <span>{new Date(this.props.item.date).toDateString()}</span>
        </Col>
        <Col>
          <Link to={RACES + DELIMITER + this.props.item.id}>
            {this.props.item.name}
          </Link>
        </Col>
      </Row>
    );
  }
}
