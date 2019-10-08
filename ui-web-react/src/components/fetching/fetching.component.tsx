import React from "react";

export class FetchingComponent extends React.Component {
  render() {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Загрузка...</span>
      </div>
    );
  }
}
