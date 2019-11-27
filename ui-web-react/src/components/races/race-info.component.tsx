import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { RaceItemExt, RacerProfiles, RacerProfile, UserInfo } from "../../model/types/datatypes";
import { DEFAULT_ID } from "../../model/utils/constants";
import { FetchingComponent } from "../fetching/fetching.component";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { Theme } from "@material-ui/core";
import { commonStyles } from "../styles/common";
import RaceParticipantListComponent from "./race-participant-list.component";
import RaceRegistrationListComponent from "./race-registration-list.component";
import Optional from "optional-js";
import { DEFAULT_USER_INFO } from "../../model/utils/test.utils";

const useStyles = makeStyles((theme: Theme) => {
  const common = commonStyles(theme);
  return {
    "@global": common.global,
    paperTop: common.paper,
    paper: {
      ...common.paper,
      marginTop: theme.spacing(2)
    },
    logout: {
      margin: theme.spacing(3, 0, 2)
    },
    heading: common.heading,
    profileContainer: common.profileContainer
  };
});

interface RaceInfoParams {
  id: string;
}

interface RaceInfoComponentProps extends RouteComponentProps<RaceInfoParams> {
  user: Optional<UserInfo>;
  raceItemExt: RaceItemExt;
  racerProfiles: Optional<RacerProfile[]>;
  onDataReload: (id: number) => void;
  onRegistrationUpdate: (
    userUUID: string,
    raceID: number,
    added: RacerProfile[],
    removed: RacerProfile[]
  ) => void;
}

const RaceInfoComponent: React.FC<RaceInfoComponentProps> = (props: RaceInfoComponentProps) => {
  const classes = useStyles();
  useEffect(() => {
    const raceID = props.match.params.id;
    props.onDataReload(raceID ? parseInt(raceID) : DEFAULT_ID);
  }, [props.match.params.id]);
  const registrationUpdateHandler = (added: RacerProfile[], removed: RacerProfile[]): void => {
    props.onRegistrationUpdate(
      props.user.orElse(DEFAULT_USER_INFO).uuid,
      props.raceItemExt.id,
      added,
      removed
    );
  };

  if (props.raceItemExt.isFetching) {
    return <FetchingComponent />;
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper className={classes.paperTop}>
          <Typography component="h2" variant="h4" color="primary" gutterBottom>
            {props.raceItemExt.name}
          </Typography>
          <Typography component="p" variant="h6">
            {`${props.raceItemExt.location}, ${new Date(
              props.raceItemExt.date
            ).toLocaleDateString()}`}
          </Typography>
          <Typography color="textSecondary">{props.raceItemExt.description}</Typography>
        </Paper>
        <RaceParticipantListComponent participants={props.raceItemExt.participants.items} />
        <RaceRegistrationListComponent
          loggedIn={props.user.isPresent()}
          isUpdating={props.raceItemExt.participants.isFetching}
          allProfiles={props.racerProfiles}
          registeredProfiles={props.raceItemExt.participants.items}
          onRegistrationUpdate={registrationUpdateHandler}
        />
      </Container>
    );
  }
};

export default RaceInfoComponent;
