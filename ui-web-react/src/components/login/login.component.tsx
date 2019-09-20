import React from "react";
import { Tabs, Tab, Form, Button, InputGroup } from "react-bootstrap";
import { UserInfo } from "../../model/types/datatypes";
import { INITIAL_USER_INFO } from "../../model/reducers/user.reducer";

export type LoginComponentProps = {
  onLogin: (userInfo: UserInfo) => void;
  onRegister: (userInfo: UserInfo) => void;
};

export type LoginComponentState = {
  email: string;
  password: string;
  validated: boolean;
};

export class LoginComponent extends React.Component<
  LoginComponentProps,
  LoginComponentState
> {
  constructor(props: LoginComponentProps) {
    super(props);

    this.state = {
      email: "",
      password: "",
      validated: false
    };
  }

  handleLoginClick = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      if (this.state.email && this.state.password) {
        this.props.onLogin({
          ...INITIAL_USER_INFO,
          email: this.state.email,
          password: this.state.password
        });
        event.preventDefault();
        event.stopPropagation();
      }
    }

    this.setState({ validated: true });
  };

  handleLoginEmailChange = (event: any) => {
    this.setState({ email: event.currentTarget.value });
  };

  handleLoginPasswordChange = (event: any) => {
    this.setState({ password: event.currentTarget.value });
  };

  render() {
    return (
      <Tabs defaultActiveKey="signIn" id="loginTabs">
        <Tab eventKey="signIn" title="Войти">
          <Form
            noValidate
            validated={this.state.validated}
            onSubmit={this.handleLoginClick}
          >
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Почта</Form.Label>
              <InputGroup>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  onChange={this.handleLoginEmailChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Почта не может быть пустой
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Пароль</Form.Label>
              <InputGroup>
                <Form.Control
                  type="password"
                  placeholder="Введите пароль"
                  onChange={this.handleLoginPasswordChange}
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
        </Tab>
        <Tab eventKey="register" title="Зарегистрироваться">
          <span>Форма регистрации</span>
        </Tab>
      </Tabs>
    );
  }
}
