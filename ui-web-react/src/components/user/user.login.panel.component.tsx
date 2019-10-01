import React from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { UserInfo } from "../../model/types/datatypes";
import { INITIAL_USER_INFO } from "../../model/reducers/user.reducer";
import {
  ClassCompetition,
  getClassCompetitionName
} from "../../model/types/class-competition.model";

export type UserLoginPanelComponentProps = {
  mode: "login" | "register";
  onSubmit: (userInfo: UserInfo) => void;
};

export type UserLoginPanelComponentState = {
  name: string;
  password: string;
  email: string;
  bikeNumber: number;
  classCompetition: ClassCompetition;
  validated: boolean;
};

export class UserLoginPanelComponent extends React.Component<
  UserLoginPanelComponentProps,
  UserLoginPanelComponentState
> {
  constructor(props: UserLoginPanelComponentProps) {
    super(props);

    this.state = {
      name: INITIAL_USER_INFO.name,
      password: INITIAL_USER_INFO.password,
      email: INITIAL_USER_INFO.email,
      bikeNumber: INITIAL_USER_INFO.bikeNumber,
      classCompetition: INITIAL_USER_INFO.classCompetition,
      validated: false
    };
  }

  handleSubmitClick = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      this.props.onSubmit({
        ...INITIAL_USER_INFO,
        name: this.state.name,
        password: this.state.password,
        email: this.state.email,
        bikeNumber: this.state.bikeNumber,
        classCompetition: this.state.classCompetition
      });
    }

    this.setState({ validated: true });
  };

  getControlID = (name: string): string => this.props.mode + "_" + name;

  render() {
    return (
      <Form
        noValidate
        validated={this.state.validated}
        onSubmit={this.handleSubmitClick}
      >
        <Form.Group controlId={this.getControlID("formEmail")}>
          <Form.Label>Почта</Form.Label>
          <InputGroup>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              onChange={(event: any) =>
                this.setState({
                  email: event.currentTarget.value
                })
              }
              required
            />
            <Form.Control.Feedback type="invalid">
              Почта не может быть пустой
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group controlId={this.getControlID("formPassword")}>
          <Form.Label>Пароль</Form.Label>
          <InputGroup>
            <Form.Control
              type="password"
              placeholder="Введите пароль"
              onChange={(event: any) =>
                this.setState({
                  password: event.currentTarget.value
                })
              }
              required
            />
            <Form.Control.Feedback type="invalid">
              Пароль не может быть пустым
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        {this.props.mode === "register" && (
          <>
            <Form.Group controlId={this.getControlID("formName")}>
              <Form.Label>Имя</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Введите имя"
                  onChange={(event: any) =>
                    this.setState({
                      name: event.currentTarget.value
                    })
                  }
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Имя не может быть пустым
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId={this.getControlID("formBikeNumber")}>
              <Form.Label>Номер байка</Form.Label>
              <InputGroup>
                <Form.Control
                  type="number"
                  placeholder="Введите номер байка"
                  onChange={(event: any) =>
                    this.setState({
                      bikeNumber: event.currentTarget.value
                    })
                  }
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Номер байка не может быть пустым
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId={this.getControlID("formClassCompetition")}>
              <Form.Label>Класс соревнований</Form.Label>
              <InputGroup>
                <Form.Control
                  as="select"
                  required
                  onChange={(event: any) =>
                    this.setState({
                      classCompetition: event.currentTarget.value
                    })
                  }
                >
                  <option value="125cm3">
                    {getClassCompetitionName("125cm3")}
                  </option>
                  <option value="250cm3">
                    {getClassCompetitionName("250cm3")}
                  </option>
                  <option value="500cm3">
                    {getClassCompetitionName("500cm3")}
                  </option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Класс соревнований не может быть пустым
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </>
        )}
        <Button variant="primary" type="submit">
          Дави на газ!
        </Button>
      </Form>
    );
  }
}
