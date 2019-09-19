import React from "react";
import { Spinner } from "react-bootstrap";

export class FetchingComponent extends React.Component {
  render() {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Загрузка...</span>
      </Spinner>
    );
  }
}
