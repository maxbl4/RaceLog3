import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  RaceItemExt,
  RacerProfile,
  UserInfo,
  INITIAL_USER_INFO
} from "../../model/types/datatypes";
import {
  DEFAULT_ID,
  RACE_ITEM_INFO_NAME,
  RACE_ITEM_INFO_DATE_LOCATION,
  RACE_ITEM_INFO_DESCR
} from "../../model/utils/constants";
import { FetchingComponent } from "../common/fetching.component";
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
import RaceResultsComponent from "./race-results.component";
import { RaceState } from "../../model/types/races.model";

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
    profileContainer: common.profileContainer,
    justifyText: {
      textAlign: "justify"
    },
    centerText: {
      textAlign: "center"
    }
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
      props.user.orElse(INITIAL_USER_INFO).uuid,
      props.raceItemExt.id,
      added,
      removed
    );
  };
  const getDisableRegistrationReason = (): Optional<string> => {
    return Optional.ofNullable(
      props.raceItemExt.state !== RaceState.NOT_STARTED
        ? "Регистрация закончена"
        : !props.user.isPresent()
        ? "Войдите для регистрации"
        : props.racerProfiles.isPresent()
        ? null
        : "Создайте профиль для регистрации"
    );
  };

  if (props.raceItemExt.isFetching) {
    return <FetchingComponent />;
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper className={classes.paperTop}>
          <Typography
            id={RACE_ITEM_INFO_NAME}
            component="h2"
            variant="h4"
            color="primary"
            className={classes.centerText}
            gutterBottom
          >
            {props.raceItemExt.name}
          </Typography>
          <Typography
            id={RACE_ITEM_INFO_DATE_LOCATION}
            component="p"
            variant="h6"
            className={classes.centerText}
          >
            {`${props.raceItemExt.location}, ${new Date(
              props.raceItemExt.date
            ).toLocaleDateString()}`}
          </Typography>
          <Typography
            id={RACE_ITEM_INFO_DESCR}
            color="textSecondary"
            className={classes.justifyText}
          >
            {props.raceItemExt.description}
          </Typography>
        </Paper>
        <RaceParticipantListComponent participants={props.raceItemExt.participants.items} />
        <RaceRegistrationListComponent
          disabled={
            !props.user.isPresent() ||
            props.raceItemExt.state !== RaceState.NOT_STARTED ||
            !props.racerProfiles.isPresent()
          }
          disableReason={getDisableRegistrationReason()}
          isUpdating={props.raceItemExt.participants.isFetching}
          allProfiles={props.racerProfiles}
          registeredProfiles={props.raceItemExt.participants.items}
          onRegistrationUpdate={registrationUpdateHandler}
        />
        <RaceResultsComponent
          state={props.raceItemExt.state}
          participants={props.raceItemExt.participants.items}
          results={props.raceItemExt.results.items}
        />
      </Container>
    );
  }
};

export default RaceInfoComponent;
