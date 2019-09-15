import React from "react";
import { Tabs, Tab, Form, Button } from "react-bootstrap";

export class LoginComponent extends React.Component {
  render() {
    return (
      <Tabs defaultActiveKey="signIn" id="loginTabs">
        <Tab eventKey="signIn" title="Войти">
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Почта</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Пароль</Form.Label>
              <Form.Control type="password" placeholder="Введите пароль" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Дави на газ!
            </Button>
          </Form>
        </Tab>
        <Tab eventKey="register" title="Зарегистрироваться">
          <span>Registration form</span>
        </Tab>
      </Tabs>
    );
  }
}
