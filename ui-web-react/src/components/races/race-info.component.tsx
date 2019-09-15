import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { RaceItem } from "../../model/types/datatypes";

interface RaceInfoParams {
  id: string;
}

interface RaceInfoProps extends RouteComponentProps<RaceInfoParams> {
  race: RaceItem;
}

export class RaceInfoComponent extends React.Component<RaceInfoProps> {
  componentDidMount() {
    // request data with this.props.match.params.id;
  }

  render() {
    return <div>Race Info not found!</div>;
  }
}
