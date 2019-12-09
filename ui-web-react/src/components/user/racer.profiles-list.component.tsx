import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import RacerProfileComponent from "./racer.profile.component";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";
import SpinnerButton from "../common/spinner-button";
import { RacerProfile } from "../../model/types/datatypes";
import {
  generateUUID,
  RACER_PROFILES_LIST_EXPAND_BUTTON,
  RACER_PROFILES_LIST_SUBMIT_BUTTON
} from "../../model/utils/constants";
import Optional from "optional-js";
import { commonStyles } from "../styles/common";

const useStyles = makeStyles((theme: Theme) => {
  const common = commonStyles(theme);
  return {
    heading: common.heading,
    profileContainer: common.profileContainer
  };
});

const createProfile = (order: number): RacerProfile => ({
  uuid: (order + 1).toString(),
  userUUID: Optional.empty<string>(),
  name: "",
  bikeNumber: 0
});

const initProfiles = (profiles: RacerProfile[], order: number): RacerProfile[] => {
  return [...profiles, createProfile(order)];
};

type RacerProfilesListProps = {
  isFetching: boolean;
  initialProfiles: RacerProfile[];
  userUUID: string;
  onProfilesUpdate: (
    added: RacerProfile[],
    removed: RacerProfile[],
    updated: RacerProfile[]
  ) => void;
};

const RacerProfilesListComponent: React.FC<RacerProfilesListProps> = (
  props: RacerProfilesListProps
) => {
  const classes = useStyles();
  const [profiles, setProfiles] = useState<RacerProfile[]>(
    initProfiles(props.initialProfiles, props.initialProfiles.length)
  );
  useEffect(() => {
    setProfiles(initProfiles(props.initialProfiles, props.initialProfiles.length));
  }, [props.initialProfiles, props.userUUID]);

  const handleProfilesUpdateButtonClick = (): void => {
    props.onProfilesUpdate(
      profiles
        .filter(
          profile =>
            props.initialProfiles.find(value => value.uuid === profile.uuid) === undefined &&
            profile.name
        )
        .map(profile => ({
          ...profile,
          uuid: generateUUID(),
          userUUID: Optional.of(props.userUUID)
        })),
      props.initialProfiles.filter(
        profile => profiles.find(value => value.uuid === profile.uuid) === undefined
      ),
      profiles.filter(
        profile => props.initialProfiles.find(value => value.uuid === profile.uuid) !== undefined
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
      setProfiles(initProfiles(profiles, profiles.length));
    } else {
      setProfiles(profiles.filter((item, index, array) => item.uuid !== profileId));
    }
  };

  return (
    <ExpansionPanel className="mt-3">
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="racerProfile-content"
        id={RACER_PROFILES_LIST_EXPAND_BUTTON}
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
              disabled={props.isFetching}
            />
          ))}
          <SpinnerButton
            id={RACER_PROFILES_LIST_SUBMIT_BUTTON}
            label="Обновить"
            showSpinner={props.isFetching}
            handleClick={handleProfilesUpdateButtonClick}
          />
        </Container>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default RacerProfilesListComponent;
