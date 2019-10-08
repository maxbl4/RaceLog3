import React from "react";
import { RaceItem } from "../../model/types/datatypes";
import { NavLink } from "react-router-dom";
import { DELIMITER, RACES } from "../../model/routing/paths";
import { DEFAULT_DATE, DEFAULT_ID } from "../../model/utils/constants";

export type RaceItemProps = {
  item: RaceItem;
};

export class RaceItemComponent extends React.Component<RaceItemProps> {
  render() {
    return (
      <div className="row">
        <div className="col-lg-3">
          {new Date(this.props.item.date.orElse(DEFAULT_DATE)).toDateString()}
        </div>
        <div className="col-lg-3">
          <NavLink exact to={RACES + DELIMITER + this.props.item.id.orElse(DEFAULT_ID)}>
            {this.props.item.name.orElse("")}
          </NavLink>
        </div>
      </div>
    );
  }
}
