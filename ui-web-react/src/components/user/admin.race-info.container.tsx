import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";
import { commonStyles } from "../styles/common";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { StoredState, RaceItem } from "../../model/types/datatypes";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import SpinnerButton from "../common/spinner-button";
import Optional from "optional-js";
import {
  ADMIN_RACE_INFO_EXPAND_BUTTON,
  ADMIN_RACE_INFO_HEADER,
  ADMIN_RACE_INFO_SUBMIT_BUTTON,
  ADMIN_RACE_INFO_NAME_COMBO,
  ADMIN_RACE_INFO_STATE_COMBO
} from "../../model/utils/constants";
import { raceChangeStateRequested } from "../../model/actions/race.actions";
import { RaceState, getRaceStateName } from "../../model/types/races.model";

const useStyles = makeStyles((theme: Theme) => {
  const common = commonStyles(theme);
  return {
    heading: common.heading,
    profileContainer: common.profileContainer
  };
});

type AdminRaceInfo = {
  races: Optional<RaceItem[]>;
  onRaceStateSubmit: (raceID: number, state: RaceState) => void;
};

const AdminRaceInfoComponent: React.FC<AdminRaceInfo> = (props: AdminRaceInfo) => {
  const classes = useStyles();
  const [raceID, setRaceID] = useState(-1);
  const [raceState, setRaceState] = useState(RaceState.NOT_STARTED);
  const handleRaceIDChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRaceID(parseInt(event.target.value as string));
  };
  const handleRaceStateChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRaceState(parseInt(event.target.value as string));
  };
  const handleRaceStateSubmit = (): void => {
    props.onRaceStateSubmit(raceID, raceState);
  };
  const getStateOption = (state: RaceState): JSX.Element => {
    return <option value={state}>{getRaceStateName(state)}</option>;
  };

  return (
    <ExpansionPanel className="mt-3">
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="adminRaceInfo-content"
        id={ADMIN_RACE_INFO_EXPAND_BUTTON}
      >
        <Typography id={ADMIN_RACE_INFO_HEADER} className={classes.heading}>
          Информация о гонках
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <form className="mt-2">
            <Grid container spacing={1}>
              <Grid item xs={5}>
                <FormControl variant="outlined">
                  <InputLabel htmlFor={ADMIN_RACE_INFO_NAME_COMBO}>Гонка</InputLabel>
                  <Select
                    native
                    value={raceID}
                    onChange={handleRaceIDChange}
                    inputProps={{
                      id: ADMIN_RACE_INFO_NAME_COMBO
                    }}
                  >
                    {props.races.orElse([]).map(race => (
                      <option value={race.id}>{race.name}</option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl variant="outlined">
                  <InputLabel htmlFor={ADMIN_RACE_INFO_STATE_COMBO}>Состояние</InputLabel>
                  <Select
                    native
                    value={raceState}
                    onChange={handleRaceStateChange}
                    inputProps={{
                      id: ADMIN_RACE_INFO_STATE_COMBO
                    }}
                  >
                    {getStateOption(RaceState.NOT_STARTED)}
                    {getStateOption(RaceState.STARTED)}
                    {getStateOption(RaceState.STOPPED)}
                    {getStateOption(RaceState.FINISHED)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <SpinnerButton
                  id={ADMIN_RACE_INFO_SUBMIT_BUTTON}
                  label="Обновить"
                  showSpinner={false}
                  handleClick={handleRaceStateSubmit}
                />
              </Grid>
            </Grid>
          </form>
        </Container>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

const mapStateToProps = (state: StoredState) => {
  return {
    races: state.races.items
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onRaceStateSubmit: (raceID: number, state: RaceState) =>
    dispatch(raceChangeStateRequested(raceID, state))
});

const AdminRaceInfoContainer = connect(mapStateToProps, mapDispatchToProps)(AdminRaceInfoComponent);

export default AdminRaceInfoContainer;
