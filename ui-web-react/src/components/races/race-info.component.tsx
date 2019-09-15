import React from "react";
import { RouteComponentProps } from "react-router-dom";

interface RaceInfoParams {
  id: string;
}

export class RaceInfoComponent extends React.Component<
  RouteComponentProps<RaceInfoParams>
> {
  componentDidMount() {
    // request data with this.props.match.params.id;
  }

  render() {
    return (
      <div>
        Here should be info about race with id = {this.props.match.params.id}
      </div>
    );
  }
}
