import React from "react";
import { UserInfo } from "../../model/types/datatypes";
import { INITIAL_USER_INFO } from "../../model/reducers/user.reducer";
import { Formik, Form, Field, ErrorMessage, FormikActions, FormikProps } from "formik";
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
    .required("Введите пожалуйста имя")
});

interface UserInfoValues {
  name: string;
  password: string;
  email: string;
}

export type UserLoginPanelComponentProps = {
  mode: "login" | "register";
  onSubmit: (userInfo: UserInfo) => void;
};

export class UserLoginPanelComponent extends React.Component<UserLoginPanelComponentProps> {
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
          onSubmit={(values: UserInfoValues, actions: FormikActions<UserInfoValues>) => {
            this.props.onSubmit({
              ...INITIAL_USER_INFO,
              ...values
            });
            actions.setSubmitting(false);
          }}
          render={(formikBag: FormikProps<UserInfoValues>) => (
            <Form>
              {this.renderField(formikBag, "email", "email", "Почта")}
              {this.renderField(formikBag, "password", "password", "Пароль")}

              {!this.isLoginMode() && (
                <React.Fragment>
                  {this.renderField(formikBag, "name", "text", "Имя")}
                </React.Fragment>
              )}
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={formikBag.isSubmitting}
              >
                {formikBag.isSubmitting ? "Идет прогрев мотора..." : "Дави на газ!!!"}
              </button>
            </Form>
          )}
        />
      </div>
    );
  }

  renderField = (
    formikBag: FormikProps<UserInfoValues>,
    fieldName: string,
    fieldType: string,
    label: string
  ): JSX.Element => {
    return (
      <div className="form-group">
        <label htmlFor={fieldName}>{label}</label>
        <Field
          id={this.getControlID(fieldName)}
          type={fieldType}
          name={fieldName}
          placeholder={label}
          className={`form-control ${
            formikBag.touched.hasOwnProperty(fieldName) &&
            formikBag.errors.hasOwnProperty(fieldName)
              ? "is-invalid"
              : ""
          }`}
        />
        <ErrorMessage component="div" name={fieldName} className="invalid-feedback" />
      </div>
    );
  };
}
