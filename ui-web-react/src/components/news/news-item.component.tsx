import React from "react";
import { NewsItem } from "../../model/types/datatypes";
import { NavLink } from "react-router-dom";
import { DELIMITER, NEWS } from "../../model/routing/paths";
import { DEFAULT_ID, DEFAULT_DATE } from "../../model/utils/constants";

export type NewsItemProps = {
  item: NewsItem;
};

export class NewsItemComponent extends React.Component<NewsItemProps> {
  render() {
    return (
      <div className="row">
        <div className="col-lg-3">
          {new Date(this.props.item.date.orElse(DEFAULT_DATE)).toDateString()}
        </div>
        <div className="col-lg-3">
          <NavLink exact to={NEWS + DELIMITER + this.props.item.id.orElse(DEFAULT_ID)}>
            {this.props.item.header.orElse("")}
          </NavLink>
        </div>
      </div>
    );
  }
}
