import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";
import { commonStyles } from "../styles/common";
import Container from "@material-ui/core/Container";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Optional from "optional-js";
import { RacerProfile } from "../../model/types/datatypes";
import SpinnerButton from "../common/spinner-button";
import {
  RACE_REGISTRATION_LIST_SUBMIT_BUTTON,
  RACE_REGISTRATION_LIST_EXPAND_BUTTON,
  RACE_REGISTRATION_LIST_PROFILE_ITEM,
  RACE_REGISTRATION_LIST_HEADER
} from "../../model/utils/constants";
import { RaceState } from "../../model/types/races.model";

const useStyles = makeStyles((theme: Theme) => {
  const common = commonStyles(theme);
  return {
    heading: common.heading,
    profileContainer: common.profileContainer
  };
});

type RaceRegistrationListProps = {
  raceState: RaceState;
  loggedIn: boolean;
  isUpdating: boolean;
  allProfiles: Optional<RacerProfile[]>;
  registeredProfiles: Optional<RacerProfile[]>;
  onRegistrationUpdate: (added: RacerProfile[], removed: RacerProfile[]) => void;
};

const RaceRegistrationListComponent: React.FC<RaceRegistrationListProps> = (
  props: RaceRegistrationListProps
) => {
  const profiles = props.allProfiles.orElse([]);

  const classes = useStyles();
  const [checkedProfiles, setCheckedProfiles] = useState(props.registeredProfiles.orElse([]));
  useEffect(() => {
    setCheckedProfiles(props.registeredProfiles.orElse([]));
  }, [props.registeredProfiles]);

  const handleToggle = (value: RacerProfile) => () => {
    const currentIndex = checkedProfiles.findIndex(curr => curr.uuid === value.uuid);
    const newChecked = [...checkedProfiles];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedProfiles(newChecked);
  };

  const handleUpdateButtonClick = (): void => {
    const initialRegedProfiles = props.registeredProfiles.orElse([]);
    props.onRegistrationUpdate(
      checkedProfiles.filter(
        value => initialRegedProfiles.find(profile => profile.uuid === value.uuid) === undefined
      ),
      initialRegedProfiles.filter(
        value => checkedProfiles.find(profile => profile.uuid === value.uuid) === undefined
      )
    );
  };

  return (
    <ExpansionPanel
      className="mt-3"
      disabled={
        !props.loggedIn || profiles.length === 0 || props.raceState !== RaceState.NOT_STARTED
      }
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="raceRegistration-content"
        id={RACE_REGISTRATION_LIST_EXPAND_BUTTON}
      >
        <Typography id={RACE_REGISTRATION_LIST_HEADER} className={classes.heading}>
          {props.raceState !== RaceState.NOT_STARTED
            ? "Регистрация закончена"
            : !props.loggedIn
            ? "Войдите для регистрации"
            : props.allProfiles.isPresent()
            ? "Регистрация"
            : "Создайте профиль для регистрации"}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Container component="main" maxWidth="xs" className={classes.profileContainer}>
          <List>
            {profiles.map((value, index, array) => {
              const labelId = RACE_REGISTRATION_LIST_PROFILE_ITEM + "_" + value.name;
              return (
                <ListItem
                  key={value.uuid}
                  role={undefined}
                  dense
                  button
                  onClick={handleToggle(value)}
                  disabled={props.isUpdating}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checkedProfiles.find(curr => curr.uuid === value.uuid) !== undefined}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ id: labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={value.name}
                    primaryTypographyProps={{ id: labelId + "_label" }}
                  />
                </ListItem>
              );
            })}
          </List>
          <SpinnerButton
            id={RACE_REGISTRATION_LIST_SUBMIT_BUTTON}
            label="Обновить"
            showSpinner={props.isUpdating}
            handleClick={handleUpdateButtonClick}
          />
        </Container>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default RaceRegistrationListComponent;
