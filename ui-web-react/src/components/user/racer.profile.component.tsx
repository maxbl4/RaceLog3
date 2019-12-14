import React, { useState, ChangeEvent } from "react";
import { RacerProfile } from "../../model/types/datatypes";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import {
  RACER_PROFILE_NAME,
  RACER_PROFILE_BIKE_NUMBER,
  RACER_PROFILE_ADD_REMOVE_BUTTON
} from "../../model/utils/constants";

type RacerProfileProps = {
  profile: RacerProfile;
  paintAddButton: boolean;
  disabled: boolean;
  handleUpdates: (profile: RacerProfile) => void;
  handleButtonClick: (profileId: string, isAddButton: boolean) => void;
};

const RacerProfileComponent: React.FC<RacerProfileProps> = (props: RacerProfileProps) => {
  const [name, setName] = useState(props.profile.name);
  const [bikeNumber, setBikeNumber] = useState(props.profile.bikeNumber);

  const createID = (fieldName: string): string => {
    return (
      fieldName +
      "_" +
      (props.profile.userUUID.isPresent()
        ? props.profile.name + "_" + props.profile.bikeNumber
        : props.profile.uuid)
    );
  };

  const fireUpdateListener = (name: string, bikeNumber: number): void => {
    props.handleUpdates({
      ...props.profile,
      name,
      bikeNumber
    });
  };

  const nameChangeHandler = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value;
    setName(value);
    fireUpdateListener(value, bikeNumber);
  };

  const numberChangeHandler = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = parseInt(event.target.value ? event.target.value : "0");
    setBikeNumber(value);
    fireUpdateListener(name, value);
  };

  const addRemoveButtonClickHundler = () =>
    props.handleButtonClick(props.profile.uuid, props.paintAddButton);

  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <form className="mt-2">
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <TextField
                disabled={props.disabled}
                required
                id={createID(RACER_PROFILE_NAME)}
                variant="outlined"
                value={name}
                type="text"
                label="ФИО"
                onChange={nameChangeHandler}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                disabled={props.disabled}
                required
                id={createID(RACER_PROFILE_BIKE_NUMBER)}
                variant="outlined"
                value={bikeNumber}
                type="number"
                label="№"
                onChange={numberChangeHandler}
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton
                id={createID(RACER_PROFILE_ADD_REMOVE_BUTTON)}
                disabled={props.disabled}
                color={props.paintAddButton ? "primary" : "secondary"}
                onClick={addRemoveButtonClickHundler}
              >
                {props.paintAddButton ? <AddCircleIcon /> : <RemoveCircleIcon />}
              </IconButton>
            </Grid>
          </Grid>
        </form>
      </Container>
    </React.Fragment>
  );
};

export default RacerProfileComponent;
