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
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import { Theme } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { commonStyles } from "../styles/common";
import RacerProfileComponent from "./racer.profile.component";
import { generateUUID } from "../../model/utils/constants";
import { INITIAL_USER_INFO } from "../../model/reducers/user.reducer";
import SpinnerButton from "../common/spinner-button";

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
  const createProfile = (): RacerProfile => ({
    uuid: generateUUID(),
    userUUID: props.user.info.orElse(INITIAL_USER_INFO).uuid,
    name: "",
    bikeNumber: 0
  });
  const classes = useStyles();
  const [profiles, setProfiles] = useState<RacerProfile[]>(
    props.racerProfiles.items.orElse([createProfile()])
  );
  useEffect(() => {
    setProfiles(props.racerProfiles.items.orElse([createProfile()]));
  }, [props.racerProfiles.items]);

  const handleProfilesUpdateButtonClick = (): void => {
    const initialProfiles = props.racerProfiles.items.orElse([]);
    props.onProfilesUpdate(
      profiles.filter(
        profile => initialProfiles.find(value => value.uuid === profile.uuid) === undefined
      ),
      initialProfiles.filter(
        profile => profiles.find(value => value.uuid === profile.uuid) === undefined
      ),
      profiles.filter(
        profile => initialProfiles.find(value => value.uuid === profile.uuid) !== undefined
      )
    );
  };

  const handleUpdates = (profile: RacerProfile): void => {
    const index = profiles.findIndex((item, index, array) => item.uuid === profile.uuid);
    if (index > -1) {
      profiles.splice(index, 1, profile);
    }
  };

  const handleAddRemoveButtonClick = (profileId: string, isAddButton: boolean): void => {
    if (isAddButton) {
      setProfiles([...profiles, createProfile()]);
    } else {
      setProfiles(profiles.filter((item, index, array) => item.uuid !== profileId));
    }
  };

  const renderRacerProfile = (): JSX.Element => {
    return (
      <ExpansionPanel className="mt-3">
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="racerProfile-content"
          id="racerProfile-header"
        >
          <Typography className={classes.heading}>Профили гонщика</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Container component="main" maxWidth="xs" className={classes.profileContainer}>
            {profiles.map((value, index, array) => (
              <RacerProfileComponent
                key={value.uuid}
                profile={value}
                paintAddButton={index === array.length - 1}
                handleUpdates={handleUpdates}
                handleButtonClick={handleAddRemoveButtonClick}
                disabled={props.racerProfiles.isFetching}
              />
            ))}
            <SpinnerButton
              label="Обновить"
              showSpinner={props.racerProfiles.isFetching}
              handleClick={handleProfilesUpdateButtonClick}
            />
          </Container>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  };

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
            {renderRacerProfile()}
          </Container>
        </React.Fragment>
      ))
      .orElse(<Redirect to={USER_SIGN_IN} />);
  }
};

export default UserProfileComponent;
