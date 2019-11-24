import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { RaceItemExt } from "../../model/types/datatypes";
import { DEFAULT_ID } from "../../model/utils/constants";
import { FetchingComponent } from "../fetching/fetching.component";

interface RaceInfoParams {
  id: string;
}

interface RaceInfoComponentProps extends RouteComponentProps<RaceInfoParams> {
  raceItemExt: RaceItemExt;
  onDataReload: any;
}

export class RaceInfoComponent extends React.Component<RaceInfoComponentProps> {
  componentDidMount() {
    const raceID = this.props.match.params.id;
    this.props.onDataReload(raceID ? parseInt(raceID) : DEFAULT_ID);
  }

  render() {
    if (this.props.raceItemExt.isFetching) {
      return <FetchingComponent />;
    } else {
      return (
        <div>
          <div className="row">
            <div className="col-lg-3">Название: </div>
            <div className="col-lg-5">{this.props.raceItemExt.name}</div>
          </div>
          <div className="row">
            <div className="col-lg-3">Дата: </div>
            <div className="col-lg-5">{new Date(this.props.raceItemExt.date).toDateString()}</div>
          </div>
          <div className="row">
            <div className="col-lg-3">Место провиденя: </div>
            <div className="col-lg-5">{this.props.raceItemExt.location}</div>
          </div>
          <div className="row">
            <div className="col-lg-3">Участники: </div>
          </div>
          <div className="row">
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th>Имя</th>
                </tr>
              </thead>
              <tbody>
                {this.props.raceItemExt.participants.orElse([]).map(item => (
                  <tr key={item}>
                    <td>{item}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
}
