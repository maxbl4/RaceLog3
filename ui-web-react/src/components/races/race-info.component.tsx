import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { RaceItemExt } from "../../model/types/datatypes";
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

interface RaceInfoParams {
  id: string;
}

interface RaceInfoComponentProps extends RouteComponentProps<RaceInfoParams> {
  raceItemExt: RaceItemExt;
  onDataReload: (id: number) => void;
}

const RaceInfoComponent: React.FC<RaceInfoComponentProps> = (props: RaceInfoComponentProps) => {
  const classes = useStyles();
  useEffect(() => {
    const raceID = props.match.params.id;
    props.onDataReload(raceID ? parseInt(raceID) : DEFAULT_ID);
  }, [props.match.params.id]);

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
            {`${props.raceItemExt.location}, ${new Date(props.raceItemExt.date).toLocaleDateString()}`}
          </Typography>
          <Typography color="textSecondary">{props.raceItemExt.description}</Typography>
        </Paper>
        <RaceParticipantListComponent participants={props.raceItemExt.participants}/>
      </Container>
    );
  }
};

export default RaceInfoComponent;
