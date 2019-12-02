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
import { generateUUID } from "../../model/utils/constants";
import Optional from "optional-js";
import { commonStyles } from "../styles/common";

const useStyles = makeStyles((theme: Theme) => {
  const common = commonStyles(theme);
  return {
    heading: common.heading,
    profileContainer: common.profileContainer
  };
});

const createProfile = (userUUID: string): RacerProfile => ({
  uuid: generateUUID(),
  userUUID: Optional.of(userUUID),
  name: "",
  bikeNumber: 0
});

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
    props.initialProfiles.length === 0 ? [createProfile(props.userUUID)] : props.initialProfiles
  );
  useEffect(() => {
    setProfiles(props.initialProfiles.length === 0 ? [createProfile(props.userUUID)] : props.initialProfiles);
  }, [props.initialProfiles, props.userUUID]);

  const handleProfilesUpdateButtonClick = (): void => {
    props.onProfilesUpdate(
      profiles.filter(
        profile => props.initialProfiles.find(value => value.uuid === profile.uuid) === undefined
      ),
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
      setProfiles([...profiles, createProfile(props.userUUID)]);
    } else {
      setProfiles(profiles.filter((item, index, array) => item.uuid !== profileId));
    }
  };

  return (
    <ExpansionPanel className="mt-3">
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="racerProfile-content"
        id="racerProfile-header"
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
