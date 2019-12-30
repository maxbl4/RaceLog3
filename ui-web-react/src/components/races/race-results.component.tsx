import React from "react";
import Optional from "optional-js";
import { RacerProfile, RacerResults } from "../../model/types/datatypes";
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
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";
import { commonStyles } from "../styles/common";
import { RACE_RESULTS_EXPAND_BUTTON, RACE_RESULTS_TABLE } from "../../model/utils/constants";
import NullableComponent from "../common/nullable.component";
import { CSSProperties } from "@material-ui/core/styles/withStyles";

const styles = (theme: Theme) => {
  const common = commonStyles(theme);
  return {
    heading: common.heading,
    profileContainer: {
      ...common.profileContainer,
      overflow: "auto",
      overflowY: "hidden"
    } as CSSProperties
  };
};

type ResultsTableRow = RacerProfile & RacerResults;

type RaceResultsProps = {
  disabled: boolean;
  disableReason: Optional<string>;
  participants: Optional<RacerProfile[]>;
  results: Optional<RacerResults[]>;
};

class RaceResultsComponent extends React.Component<RaceResultsProps> {

  getTableContent = (): ResultsTableRow[] => {
    const rows: ResultsTableRow[] = [];
    const racers = this.props.participants.orElse([]);
    this.props.results.ifPresent(results => {
      results.forEach(result => {
        Optional.ofNullable(racers.find(profile => profile.uuid === result.racerUUID)).ifPresent(
          racer => {
            rows.push({
              ...result,
              ...racer
            });
          }
        );
      });
    });
    rows.sort((a, b) => {
      if (a.position.isPresent() && b.position.isPresent()) {
        return a.position.get() - b.position.get();
      } else {
        return 0;
      }
    });
    return rows;
  };

  render() {
    // @ts-ignore
    const { classes } = this.props;

    return (
      <ExpansionPanel className="mt-3" disabled={this.props.disabled}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="raceResults-content"
          id={RACE_RESULTS_EXPAND_BUTTON}
        >
          <Typography className={classes.heading}>
            {this.props.disableReason
              .map(reason => `Результаты недоступны. ${reason}`)
              .orElse("Результаты")}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Container component="main" maxWidth="xs" className={classes.profileContainer}>
            <Table id={RACE_RESULTS_TABLE}>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>ФИО</TableCell>
                  <TableCell>Номер</TableCell>
                  <TableCell>Время</TableCell>
                  <TableCell>Круги</TableCell>
                  <TableCell>Очки</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.getTableContent().map(row => (
                  <TableRow key={row.racerUUID}>
                    <TableCell component="th" scope="row">
                      <NullableComponent value={row.position} />
                    </TableCell>
                    <TableCell align="right">
                      <NullableComponent value={Optional.of(row.name)} />
                    </TableCell>
                    <TableCell align="right">
                      <NullableComponent value={Optional.of(row.bikeNumber)} />
                    </TableCell>
                    <TableCell align="right">
                      <NullableComponent
                        value={row.time.map(value => {
                          const date = new Date(value);
                          return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`;
                        })}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <NullableComponent value={row.laps} />
                    </TableCell>
                    <TableCell align="right">
                      <NullableComponent value={row.points} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Container>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default withStyles(styles, { withTheme: true })(RaceResultsComponent);
