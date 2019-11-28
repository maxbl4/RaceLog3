import React from "react";
import Optional from "optional-js";
import { RacerProfile } from "../../model/types/datatypes";
import Container from "@material-ui/core/Container";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";
import { commonStyles } from "../styles/common";

const useStyles = makeStyles((theme: Theme) => {
  const common = commonStyles(theme);
  return {
    heading: common.heading,
    profileContainer: common.profileContainer
  };
});

type RaceParticipantListProps = {
  participants: Optional<RacerProfile[]>;
};

const RaceParticipantListComponent: React.FC<RaceParticipantListProps> = (
  props: RaceParticipantListProps
) => {
  const classes = useStyles();
  return (
    <ExpansionPanel className="mt-3">
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="raceParticipants-content"
        id="raceParticipants-header"
      >
        <Typography className={classes.heading}>Участники</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Container component="main" maxWidth="xs" className={classes.profileContainer}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ФИО</TableCell>
                <TableCell align="right">Номер байка</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.participants.orElse([]).map(row => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.bikeNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Container>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default RaceParticipantListComponent;
