import React from "react";
import { RouteComponentProps } from "react-router-dom";

interface NewsInfoParams {
  id: string;
}

export class NewsInfoComponent extends React.Component<
  RouteComponentProps<NewsInfoParams>
> {
  componentDidMount() {
    // request data with this.props.match.params.id;
  }

  render() {
    return (
      <div>
        Here should be info about news with id = {this.props.match.params.id}
      </div>
    );
  }
}
