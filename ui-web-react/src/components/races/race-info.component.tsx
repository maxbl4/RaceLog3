import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { RaceItemExt } from "../../model/types/datatypes";
import { DEFAULT_ID, DEFAULT_DATE } from "../../model/utils/constants";
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
    } else if (!this.props.raceItemExt.id.isPresent()) {
      return <div>Упс... Что то мы ничего не знаем об этой гонке.</div>;
    } else {
      return (
        <div>
          <div className="row">
            <div className="col-lg-3">Название: </div>
            <div className="col-lg-5">{this.props.raceItemExt.name.orElse("")}</div>
          </div>
          <div className="row">
            <div className="col-lg-3">Дата: </div>
            <div className="col-lg-5">
              {new Date(this.props.raceItemExt.date.orElse(DEFAULT_DATE)).toDateString()}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3">Место провиденя: </div>
            <div className="col-lg-5">{this.props.raceItemExt.location.orElse("")}</div>
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
                  <tr key={item.racerName}>
                    <td>{item.racerName}</td>
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
