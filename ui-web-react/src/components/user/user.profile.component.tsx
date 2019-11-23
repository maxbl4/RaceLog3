import React, { useState, useEffect } from "react";
import { UserInfo, User, RacerProfile, RacerProfiles } from "../../model/types/datatypes";
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
import { INITIAL_USER_INFO } from "../../model/reducers/user.reducer";
import RacerProfilesListComponent from "./racer.profiles-list.component";

const useStyles = makeStyles((theme: Theme) => {
  const styles = commonStyles(theme);
  return {
    "@global": styles.global,
    paperTop: styles.paper,
    paper: {
      ...styles.paper,
      marginTop: theme.spacing(2)
    },
    logout: {
      margin: theme.spacing(3, 0, 2)
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightMedium
    },
    profileContainer: {
      margin: 0,
      padding: 0
    }
  };
});

export type UserProfileComponentProps = {
  user: User;
  racerProfiles: RacerProfiles;
  onLogout: (userInfo: UserInfo) => void;
  onProfilesUpdate: (
    added: RacerProfile[],
    removed: RacerProfile[],
    updated: RacerProfile[]
  ) => void;
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
            <Paper className={classes.paperTop}>
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
            <RacerProfilesListComponent
              isFetching={props.racerProfiles.isFetching}
              onProfilesUpdate={props.onProfilesUpdate}
              userUUID={props.user.info.orElse(INITIAL_USER_INFO).uuid}
              initialProfiles={props.racerProfiles.items.orElse([])}
            />
          </Container>
        </React.Fragment>
      ))
      .orElse(<Redirect to={USER_SIGN_IN} />);
  }
};

export default UserProfileComponent;
