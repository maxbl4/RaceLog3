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
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import { StoredState, RaceItem } from "../../model/types/datatypes";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import Optional from "optional-js";
import {
  ADMIN_RACE_INFO_EXPAND_BUTTON,
  ADMIN_RACE_INFO_HEADER,
  ADMIN_RACE_INFO_SUBMIT_BUTTON,
  ADMIN_RACE_INFO_NAME_COMBO,
  ADMIN_RACE_INFO_STATE_COMBO,
  DEFAULT_ID
} from "../../model/utils/constants";
import { RaceState, getRaceStateName } from "../../model/types/races.model";
import { raceChangeStateRequested } from "../../model/actions/race.state.actions";

const useStyles = makeStyles((theme: Theme) => {
  const common = commonStyles(theme);
  return {
    heading: common.heading,
    profileContainer: common.profileContainer,
    formControl: {
      width: "100%"
    },
    buttonControl: {
      margin: "auto",
      width: "50%"
    }
  };
});

type AdminRaceInfo = {
  races: Optional<RaceItem[]>;
  onRaceStateSubmit: (raceID: number, state: RaceState) => void;
};

const AdminRaceInfoComponent: React.FC<AdminRaceInfo> = (props: AdminRaceInfo) => {
  const classes = useStyles();
  const [raceID, setRaceID] = useState<number>(
    props.races.map(list => list[0].id).orElse(DEFAULT_ID)
  );
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

  const raceNameInputLabel = React.useRef<HTMLLabelElement>(null);
  const [raceNameLabelWidth, setRaceNameLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setRaceNameLabelWidth(raceNameInputLabel.current!.offsetWidth);
  }, []);

  const raceStateInputLabel = React.useRef<HTMLLabelElement>(null);
  const [raceStateLabelWidth, setRaceStateLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setRaceStateLabelWidth(raceStateInputLabel.current!.offsetWidth);
  }, []);

  return (
    <ExpansionPanel className="mt-3">
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="adminRaceInfo-content"
        id={ADMIN_RACE_INFO_EXPAND_BUTTON}
      >
        <Typography id={ADMIN_RACE_INFO_HEADER} className={classes.heading}>
          Управление гонками
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Container component="main" maxWidth="xs" className={classes.profileContainer}>
          <CssBaseline />
          <form className="mt-2">
            <Grid container spacing={1}>
              <Grid item xs={7}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor={ADMIN_RACE_INFO_NAME_COMBO} ref={raceNameInputLabel}>
                    Гонка
                  </InputLabel>
                  <Select
                    native
                    labelWidth={raceNameLabelWidth}
                    value={raceID === DEFAULT_ID ? undefined : raceID}
                    onChange={handleRaceIDChange}
                    inputProps={{
                      id: ADMIN_RACE_INFO_NAME_COMBO
                    }}
                  >
                    {props.races.orElse([]).map(race => (
                      <option key={race.id} value={race.id}>
                        {race.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor={ADMIN_RACE_INFO_STATE_COMBO} ref={raceStateInputLabel}>
                    Состояние
                  </InputLabel>
                  <Select
                    native
                    labelWidth={raceStateLabelWidth}
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
              <Grid item xs={1}>
                <IconButton
                  id={ADMIN_RACE_INFO_SUBMIT_BUTTON}
                  color="primary"
                  onClick={handleRaceStateSubmit}
                  className={classes.buttonControl}
                >
                  <RefreshIcon />
                </IconButton>
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
