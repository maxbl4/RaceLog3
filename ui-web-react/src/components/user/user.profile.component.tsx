import React from "react";
import { UserInfo, User } from "../../model/types/datatypes";
import { getRoleName } from "../../model/types/roles.model";
import { FetchingComponent } from "../fetching/fetching.component";
import { Redirect } from "react-router";
import { USER_SIGN_IN } from "../../model/routing/paths";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Theme } from "@material-ui/core";
import { commonStyles } from "../styles/common";

const useStyles = makeStyles((theme: Theme) => {
  const styles = commonStyles(theme);
  return {
    "@global": styles.global,
    paper: styles.paper,
    logout: {
      margin: theme.spacing(3, 0, 2)
    }
  }
});

export type UserProfileComponentProps = {
  user: User;
  onLogout: (userInfo: UserInfo) => void;
};

const UserProfileComponent: React.FC<UserProfileComponentProps> = (
  props: UserProfileComponentProps
) => {
  const classes = useStyles();

  if (props.user.isFetching) {
    return <FetchingComponent />;
  } else {
    return props.user.info
      .map(info => (
        <React.Fragment>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Paper className={classes.paper}>
              <Typography component="h2" variant="h4" color="primary" gutterBottom>
                {info.name}
              </Typography>
              <Typography component="p" variant="h6">
                {info.email}
              </Typography>
              <Typography color="textSecondary">{getRoleName(info.role)}</Typography>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.logout}
                onClick={() => props.onLogout(info)}
              >
                Финишировать
              </Button>
            </Paper>
          </Container>
        </React.Fragment>
      ))
      .orElse(<Redirect to={USER_SIGN_IN} />);
  }
};

export default UserProfileComponent;
