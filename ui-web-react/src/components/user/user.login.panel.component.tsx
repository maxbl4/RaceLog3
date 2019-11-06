import React from "react";
import { UserInfo } from "../../model/types/datatypes";
import { INITIAL_USER_INFO } from "../../model/reducers/user.reducer";
import { Formik, Form, FormikActions, FormikProps } from "formik";
import * as Yup from "yup";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const emailSchema = Yup.string()
  .email("Неверный формат почты")
  .required("Введите пожалуйста почту");
const passwordSchema = Yup.string()
  .min(5, "Пароль должен быть не менее 5-ти символов")
  .required("Введите пожалуйста пароль");
const nameSchema = Yup.string()
  .min(2, "Имя должно быть не менее 2-х символов")
  .required("Введите пожалуйста имя");

const loginSchema = Yup.object().shape({
  email: emailSchema,
  password: passwordSchema
});

const registerSchema = Yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
  name: nameSchema
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

// https://webomnizz.com/working-with-react-formik-and-yup/

export class UserLoginPanelComponent extends React.Component<UserLoginPanelComponentProps> {
  isLoginMode = (): boolean => this.props.mode === "login";

  getControlID = (name: string): string => this.props.mode + "_" + name;

  render() {
    return (
      <>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className="paper">
            <Avatar className="avatar">
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
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
                <Form className="loginForm">
                  <Grid container spacing={2}>
                    {this.renderField(formikBag, "email", "email", "Почта")}
                    {this.renderField(formikBag, "password", "password", "Пароль")}

                    {!this.isLoginMode() && (
                      <React.Fragment>
                        {this.renderField(formikBag, "name", "text", "Имя")}
                      </React.Fragment>
                    )}
                  </Grid>

                  <Button type="submit" fullWidth variant="contained" color="primary" className="userSubmit">
                    {formikBag.isSubmitting ? "Идет прогрев мотора..." : "Дави на газ!!!"}
                  </Button>
                </Form>
              )}
            />
          </div>
        </Container>
      </>
    );
  }

  getErrorText = (
    formikBag: FormikProps<UserInfoValues>,
    fieldName: string
  ): string | undefined => {
    switch (fieldName) {
      case "email":
        return formikBag.errors.email;
      case "password":
        return formikBag.errors.password;
      case "name":
        return formikBag.errors.name;
      default:
        return undefined;
    }
  };

  renderField = (
    formikBag: FormikProps<UserInfoValues>,
    fieldName: string,
    fieldType: string,
    label: string
  ): JSX.Element => {
    const hasErrors =
      formikBag.touched.hasOwnProperty(fieldName) && formikBag.errors.hasOwnProperty(fieldName);
    return (
      <>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            id={this.getControlID(fieldName)}
            label={label}
            name={fieldName}
            error={hasErrors}
            onChange={formikBag.handleChange}
            autoComplete={fieldName}
            helperText={hasErrors ? this.getErrorText(formikBag, fieldName) : null}
            type={fieldType}
          />
        </Grid>
      </>
    );
  };
}
