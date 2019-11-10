import React from "react";
import { UserInfo, User } from "../../model/types/datatypes";
import { INITIAL_USER_INFO } from "../../model/reducers/user.reducer";
import { Formik, Form, FormikProps, FormikHelpers } from "formik";
import * as Yup from "yup";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from "@material-ui/core/styles";
import { FetchingComponent } from "../fetching/fetching.component";
import { Redirect } from "react-router";
import { USER_PROFILE, USER_SIGN_UP, USER_SIGN_IN } from "../../model/routing/paths";
import { Link } from "react-router-dom";
import { commonStyles } from "../styles/common";

const emailSchema = Yup.string()
  .email("Неверный формат почты")
  .required("Введите пожалуйста почту");
const passwordSchema = Yup.string()
  .min(5, "Пароль должен быть не менее 5-ти символов")
  .required("Введите пожалуйста пароль");
const nameSchema = Yup.string()
  .min(2, "Имя должно быть не менее 2-х символов")
  .required("Введите пожалуйста имя");

const signInSchema = Yup.object().shape({
  email: emailSchema,
  password: passwordSchema
});

const signUpSchema = Yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
  name: nameSchema
});

interface UserInfoValues {
  name: string;
  password: string;
  email: string;
}

export enum AuthMode {
  SIGN_IN = 1,
  SIGN_UP = 2
}

const useStyles = makeStyles(theme => {
  const styles = commonStyles(theme);
  return {
    "@global": styles.global,
    paper: styles.paper,
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
  }
});

const isSignInMode = (mode: AuthMode): boolean => mode === AuthMode.SIGN_IN;

const getControlID = (mode: AuthMode, name: string): string => name + "_" + mode;

const getErrorText = (
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

const renderField = (
  formikBag: FormikProps<UserInfoValues>,
  fieldName: string,
  fieldType: string,
  label: string,
  mode: AuthMode
): JSX.Element => {
  const hasErrors =
    formikBag.touched.hasOwnProperty(fieldName) && formikBag.errors.hasOwnProperty(fieldName);
  return (
    <>
      <Grid item xs={12}>
        <TextField
          fullWidth
          variant="outlined"
          id={getControlID(mode, fieldName)}
          label={label}
          name={fieldName}
          error={hasErrors}
          onChange={formikBag.handleChange}
          onBlur={formikBag.handleBlur}
          autoComplete={fieldName}
          helperText={hasErrors ? getErrorText(formikBag, fieldName) : null}
          type={fieldType}
        />
      </Grid>
    </>
  );
};

export type UserAuthComponentProps = {
  user: User;
  mode: AuthMode;
  onSubmit: (userInfo: UserInfo) => void;
};

const UserAuthComponent: React.FC<UserAuthComponentProps> = (props: UserAuthComponentProps) => {
  const classes = useStyles();

  if (props.user.isFetching) {
    return <FetchingComponent />;
  } else {
    return props.user.info
      .map(info => <Redirect to={USER_PROFILE} />)
      .orElse(
        <React.Fragment>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                {isSignInMode(props.mode) ? "Войти" : "Зарегистрироваться"}
              </Typography>
              <Formik
                initialValues={
                  {
                    ...INITIAL_USER_INFO
                  } as UserInfoValues
                }
                validationSchema={isSignInMode(props.mode) ? signInSchema : signUpSchema}
                onSubmit={(
                  values: UserInfoValues,
                  formikHelpers: FormikHelpers<UserInfoValues>
                ) => {
                  setTimeout(() => {
                    props.onSubmit({
                      ...INITIAL_USER_INFO,
                      ...values
                    });
                  });
                }}
              >
                {(formikBag: FormikProps<UserInfoValues>) => (
                  <Form className={classes.form}>
                    <Grid container spacing={2}>
                      {renderField(formikBag, "email", "email", "Почта", props.mode)}
                      {renderField(formikBag, "password", "password", "Пароль", props.mode)}

                      {!isSignInMode(props.mode) &&
                        renderField(formikBag, "name", "text", "Имя", props.mode)}
                    </Grid>

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      {formikBag.isSubmitting ? "Идет прогрев мотора..." : "Дави на газ!!!"}
                    </Button>

                    <Grid container justify="flex-end">
                      <Grid item>
                        <Link to={isSignInMode(props.mode) ? USER_SIGN_UP : USER_SIGN_IN}>
                          {isSignInMode(props.mode)
                            ? "Нет аккаунта? Создать"
                            : "Есть аккаунт? Войти"}
                        </Link>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Paper>
          </Container>
        </React.Fragment>
      );
  }
};

export default UserAuthComponent;
