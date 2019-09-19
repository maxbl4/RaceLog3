import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { RaceItemExt } from "../../model/types/datatypes";
import { DEFAULT_ID, DEFAULT_DATE } from "../../model/utils/constants";
import { FetchingComponent } from "../fetching/fetching.component";
import { Row, Col } from "react-bootstrap";

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
    } else if (this.props.raceItemExt.id.isNone()) {
      return (
        <div>
          Упс... Что то мы ничего не знаем об этой гонке.
        </div>
      );
    } else {
      return (
        <div>
          <Row>
            <Col>Название: </Col>
            <Col>{this.props.raceItemExt.name.getNullable()}</Col>
          </Row>
          <Row>
            <Col>Дата: </Col>
            <Col>{new Date(
              this.props.raceItemExt.date.getOrElse(DEFAULT_DATE)
            ).toDateString()}</Col>
          </Row>
          <Row>
            <Col>Место провиденя: </Col>
            <Col>{this.props.raceItemExt.location.getNullable()}</Col>
          </Row>
          <Row>
            <Col>Участники: </Col>
          </Row>
          <Row>
            <table>
              <thead>
                <tr>
                  <th>Имя</th>
                </tr>
              </thead>
              <tbody>
                {this.props.raceItemExt.participants.getOrElse([]).map(item => (
                  <tr key={item.racerName}>
                    <td>{item.racerName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Row>
        </div>
      );
    }
  }
}
