import React from "react";
import { UserInfo } from "../../model/types/datatypes";
import { Row, Button, Col } from "react-bootstrap";
import { getRoleName } from "../../model/types/roles.model";
import { getClassCompetitionName } from "../../model/types/class-competition.model";

export type UserProfileComponentProps = {
  info: UserInfo;
  onLogout: (userInfo: UserInfo) => void;
};

export class UserProfileComponent extends React.Component<
  UserProfileComponentProps
> {
  render() {
    return (
      <div>
        <Row>
          <Col>ID: </Col>
          <Col>{this.props.info.id}</Col>
        </Row>
        <Row>
          <Col>Роль: </Col>
          <Col>{getRoleName(this.props.info.role)}</Col>
        </Row>
        <Row>
          <Col>Имя: </Col>
          <Col>{this.props.info.name}</Col>
        </Row>
        <Row>
          <Col>Почта: </Col>
          <Col>{this.props.info.email}</Col>
        </Row>
        <Row>
          <Col>Пароль: </Col>
          <Col>{this.props.info.password}</Col>
        </Row>
        <Row>
          <Col>Номер байка: </Col>
          <Col>{this.props.info.bikeNumber}</Col>
        </Row>
        <Row>
          <Col>Класс соревнований: </Col>
          <Col>{getClassCompetitionName(this.props.info.classCompetition)}</Col>
        </Row>
        <Row>
          <Col>Статистика гонок: </Col>
          <Col>Здесь должна быть статистика)))</Col>
        </Row>
        <Row>
          <Button
            onClick={() => this.props.onLogout(this.props.info)}
            variant="primary"
          >
            Выйти
          </Button>
        </Row>
      </div>
    );
  }
}
