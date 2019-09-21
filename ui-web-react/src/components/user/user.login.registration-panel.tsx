import React from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { UserInfo } from "../../model/types/datatypes";
import { INITIAL_USER_INFO } from "../../model/reducers/user.reducer";

export type UserRegistrationPanelComponentProps = {
  onRegister: (userInfo: UserInfo) => void;
};

export type UserRegistrationPanelComponentState = {
  rEmail: string;
  rPassword: string;
  rValidated: boolean;
};

export class UserRegistrationPanelComponent extends React.Component<
  UserRegistrationPanelComponentProps,
  UserRegistrationPanelComponentState
> {
  constructor(props: UserRegistrationPanelComponentProps) {
    super(props);

    this.state = {
      rEmail: "",
      rPassword: "",
      rValidated: false
    };
  }

  handleRegistrationClick = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      if (this.state.rEmail && this.state.rPassword) {
        this.props.onRegister({
          ...INITIAL_USER_INFO,
          email: this.state.rEmail,
          password: this.state.rPassword
        });
        event.preventDefault();
        event.stopPropagation();
      }
    }

    this.setState({ rValidated: true });
  };

  handleRegistrationEmailChange = (event: any) => {
    this.setState({ rEmail: event.currentTarget.value });
  };

  handleRegistrationPasswordChange = (event: any) => {
    this.setState({ rPassword: event.currentTarget.value });
  };

  render() {
    return (
      <Form
        noValidate
        validated={this.state.rValidated}
        onSubmit={this.handleRegistrationClick}
      >
        <Form.Group controlId="registrationFormEmail">
          <Form.Label>Почта</Form.Label>
          <InputGroup>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              onChange={this.handleRegistrationEmailChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Почта не может быть пустой
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group controlId="registrationFormPassword">
          <Form.Label>Пароль</Form.Label>
          <InputGroup>
            <Form.Control
              type="password"
              placeholder="Введите пароль"
              onChange={this.handleRegistrationPasswordChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Пароль не может быть пустой
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Button variant="primary" type="submit">
          Дави на газ!
        </Button>
      </Form>
    );
  }
}
