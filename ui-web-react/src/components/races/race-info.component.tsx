import React from "react";
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
import { withStyles } from "@material-ui/core/styles";
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
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { needToSubscribeToRaceResults } from "../../model/actions/race.results.actions";

const styles = (theme: Theme) => {
  const common = commonStyles(theme);
  return {
    "@global": common.global,
    paperTop: common.paper,
    paper: {
      ...common.paper,
      marginTop: theme.spacing(2)
    } as CSSProperties,
    logout: {
      margin: theme.spacing(3, 0, 2)
    } as CSSProperties,
    heading: common.heading,
    profileContainer: common.profileContainer,
    justifyText: {
      textAlign: "justify"
    } as CSSProperties,
    centerText: {
      textAlign: "center"
    } as CSSProperties
  };
};

interface RaceInfoParams {
  id: string;
}

interface RaceInfoProps extends RouteComponentProps<RaceInfoParams> {
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
  onSubscribeToResults: (userUUID: string, raceID: number) => void;
  onUnsubscribeFromResults: (userUUID: string, raceID: number) => void;
}

class RaceInfoComponent extends React.Component<RaceInfoProps> {
  componentDidMount() {
    const raceID = this.props.match.params.id;
    this.props.onDataReload(raceID ? parseInt(raceID) : DEFAULT_ID);
    this.subscribeToResults();
  }

  componentWillUnmount() {
    this.unsubscribeFromResults();
  }

  componentDidUpdate(prevProps: RaceInfoProps) {
    if (this.props.raceItemExt.id !== prevProps.raceItemExt.id) {
      if (this.props.raceItemExt.id !== DEFAULT_ID) {
        this.subscribeToResults();
      } else {
        this.unsubscribeFromResults();
      }
    }
  }

  registrationUpdateHandler = (added: RacerProfile[], removed: RacerProfile[]): void => {
    this.props.onRegistrationUpdate(
      this.props.user.orElse(INITIAL_USER_INFO).uuid,
      this.props.raceItemExt.id,
      added,
      removed
    );
  };

  getDisableRegistrationReason = (): Optional<string> => {
    return Optional.ofNullable(
      this.props.raceItemExt.state !== RaceState.NOT_STARTED
        ? "Регистрация закончена"
        : !this.props.user.isPresent()
        ? "Войдите для регистрации"
        : this.props.racerProfiles.isPresent()
        ? null
        : "Создайте профиль для регистрации"
    );
  };

  getDesabledResultsReason = (): Optional<string> => {
    return Optional.ofNullable(
      this.props.raceItemExt.state === RaceState.NOT_STARTED ? "Гонка не началась" : null
    );
  };

  subUnsubResults = (resultsFn: (userUUID: string, raceID: number) => void): void => {
    this.props.user.ifPresent(info => {
      if (
        this.props.raceItemExt.id !== DEFAULT_ID &&
        needToSubscribeToRaceResults(this.props.raceItemExt.state)
      ) {
        resultsFn(info.uuid, this.props.raceItemExt.id);
      }
    });
  };

  subscribeToResults = (): void => {
    this.subUnsubResults(this.props.onSubscribeToResults);
  };

  unsubscribeFromResults = (): void => {
    this.subUnsubResults(this.props.onUnsubscribeFromResults);
  };

  render() {
    // @ts-ignore
    const { classes } = this.props;

    if (this.props.raceItemExt.isFetching) {
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
              {this.props.raceItemExt.name}
            </Typography>
            <Typography
              id={RACE_ITEM_INFO_DATE_LOCATION}
              component="p"
              variant="h6"
              className={classes.centerText}
            >
              {`${this.props.raceItemExt.location}, ${new Date(
                this.props.raceItemExt.date
              ).toLocaleDateString()}`}
            </Typography>
            <Typography
              id={RACE_ITEM_INFO_DESCR}
              color="textSecondary"
              className={classes.justifyText}
            >
              {this.props.raceItemExt.description}
            </Typography>
          </Paper>
          <RaceParticipantListComponent participants={this.props.raceItemExt.participants.items} />
          <RaceRegistrationListComponent
            disabled={
              !this.props.user.isPresent() ||
              this.props.raceItemExt.state !== RaceState.NOT_STARTED ||
              !this.props.racerProfiles.isPresent()
            }
            disableReason={this.getDisableRegistrationReason()}
            isUpdating={this.props.raceItemExt.participants.isFetching}
            allProfiles={this.props.racerProfiles}
            registeredProfiles={this.props.raceItemExt.participants.items}
            onRegistrationUpdate={this.registrationUpdateHandler}
          />
          <RaceResultsComponent
            disabled={this.props.raceItemExt.state === RaceState.NOT_STARTED}
            disableReason={this.getDesabledResultsReason()}
            participants={this.props.raceItemExt.participants.items}
            results={this.props.raceItemExt.results.items}
            subscribeToResults={this.subscribeToResults}
            unsubscribeFromResults={this.unsubscribeFromResults}
          />
        </Container>
      );
    }
  }
}

export default withStyles(styles, { withTheme: true })(RaceInfoComponent);
