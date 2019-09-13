import React from "react";
import { RaceItem } from "../../model/types/datatypes";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DELIMITER, RACES } from "../../model/routing/paths";

export type RaceItemProps = {
  item: RaceItem;
};

export class RaceItemComponent extends React.Component<RaceItemProps> {
  render() {
    return (
      <div>
        <span>{new Date(this.props.item.date).toDateString()}</span>
        <Nav.Link>
          <Link to={RACES + DELIMITER + this.props.item.id}>
            {this.props.item.name}
          </Link>
        </Nav.Link>
      </div>
    );
  }
}
