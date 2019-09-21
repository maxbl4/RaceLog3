import React from "react";
import { RaceItem } from "../../model/types/datatypes";
import { Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { DELIMITER, RACES } from "../../model/routing/paths";
import { DEFAULT_DATE, DEFAULT_ID } from "../../model/utils/constants";

export type RaceItemProps = {
  item: RaceItem;
};

export class RaceItemComponent extends React.Component<RaceItemProps> {
  render() {
    return (
      <Row>
        <Col>
          <span>
            {new Date(
              this.props.item.date.getOrElse(DEFAULT_DATE)
            ).toDateString()}
          </span>
        </Col>
        <Col>
          <NavLink
            exact
            to={RACES + DELIMITER + this.props.item.id.getOrElse(DEFAULT_ID)}
          >
            {this.props.item.name.getOrElse("")}
          </NavLink>
        </Col>
      </Row>
    );
  }
}
