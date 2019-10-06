import React from "react";
import { UserInfo } from "../../model/types/datatypes";
import { INITIAL_USER_INFO } from "../../model/reducers/user.reducer";
import {
  ClassCompetition,
  getClassCompetitionName
} from "../../model/types/class-competition.model";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikActions,
  FormikProps
} from "formik";
import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Неверный формат почты")
    .required("Введите пожалуйста почту"),
  password: Yup.string()
    .min(5, "Пароль должен быть не менее 5-ти символов")
    .required("Введите пожалуйста пароль")
});

const registerSchema = Yup.object().shape({
  email: Yup.string()
    .email("Неверный формат почты")
    .required("Введите пожалуйста почту"),
  password: Yup.string()
    .min(5, "Пароль должен быть не менее 5-ти символов")
    .required("Введите пожалуйста пароль"),
  name: Yup.string()
    .min(2, "Имя должно быть не менее 2-х символов")
    .required("Введите пожалуйста имя"),
  bikeNumber: Yup.number()
    .positive("Номер байка должен быть положительным")
    .integer("Номер байка должен быть целым числом")
    .required("Введите пожалуйста номер байка")
});

interface UserInfoValues {
  name: string;
  password: string;
  email: string;
  bikeNumber: number;
  classCompetition: ClassCompetition;
}

export type UserLoginPanelComponentProps = {
  mode: "login" | "register";
  onSubmit: (userInfo: UserInfo) => void;
};

export class UserLoginPanelComponent extends React.Component<
  UserLoginPanelComponentProps
> {
  isLoginMode = (): boolean => this.props.mode === "login";

  getControlID = (name: string): string => this.props.mode + "_" + name;

  render() {
    return (
      <div className="row col-lg-12">
        <Formik
          initialValues={{
            ...INITIAL_USER_INFO
          }}
          validationSchema={this.isLoginMode() ? loginSchema : registerSchema}
          onSubmit={(
            values: UserInfoValues,
            actions: FormikActions<UserInfoValues>
          ) => {
            this.props.onSubmit({
              ...INITIAL_USER_INFO,
              ...values
            });
            actions.setSubmitting(false);
          }}
          render={(formikBag: FormikProps<UserInfoValues>) => (
            <Form>
              <div className="form-group">
                <label htmlFor="email">Почта</label>
                <Field
                  id={this.getControlID("email")}
                  type="email"
                  name="email"
                  placeholder="Введите почту"
                  className={`form-control ${
                    formikBag.touched.email && formikBag.errors.email
                      ? "is-invalid"
                      : ""
                  }`}
                />
                {this.renderError("email")}
              </div>

              <div className="form-group">
                <label htmlFor="password">Пароль</label>
                <Field
                  id={this.getControlID("password")}
                  type="password"
                  name="password"
                  placeholder="Введите пароль"
                  className={`form-control ${
                    formikBag.touched.password && formikBag.errors.password
                      ? "is-invalid"
                      : ""
                  }`}
                />
                {this.renderError("password")}
              </div>

              {!this.isLoginMode() && (
                <React.Fragment>
                  <div className="form-group">
                    <label htmlFor="name">Имя</label>
                    <Field
                      id={this.getControlID("name")}
                      type="text"
                      name="name"
                      placeholder="Введите имя"
                      className={`form-control ${
                        formikBag.touched.name && formikBag.errors.name
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    {this.renderError("name")}
                  </div>

                  <div className="form-group">
                    <label htmlFor="bikeNumber">Номер байка</label>
                    <Field
                      id={this.getControlID("bikeNumber")}
                      type="number"
                      name="bikeNumber"
                      placeholder="Введите номер байка"
                      className={`form-control ${
                        formikBag.touched.bikeNumber &&
                        formikBag.errors.bikeNumber
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    {this.renderError("bikeNumber")}
                  </div>

                  <div className="form-group">
                    <label htmlFor="classCompetition">Класс соревнований</label>
                    <Field
                      id={this.getControlID("classCompetition")}
                      component="select"
                      name="classCompetition"
                      className="form-control"
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
                    </Field>
                  </div>
                </React.Fragment>
              )}
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={formikBag.isSubmitting}
              >
                {formikBag.isSubmitting
                  ? "Идет прогрев мотора..."
                  : "Дави на газ!!!"}
              </button>
            </Form>
          )}
        />
      </div>
    );
  }

  renderError = (fieldName: string): JSX.Element => {
    return (
      <ErrorMessage
        component="div"
        name={fieldName}
        className="invalid-feedback"
      />
    );
  };
}
