import React from "react";
import FlagIcon from "@material-ui/icons/Flag";
import { RaceState } from "../../model/types/races.model";

type RaceStateProps = {
  state: RaceState;
};

const RaceStateComponent: React.FC<RaceStateProps> = (props: RaceStateProps) => {
  const getStateColor = (): string => {
    switch (props.state) {
      case RaceState.NOT_STARTED:
        return "blue";
      case RaceState.STARTED:
        return "green";
      case RaceState.STOPPED:
        return "red";
      case RaceState.FINISHED:
        return "black";
    }
    return "grey";
  };
  return <FlagIcon fontSize="small" style={{ color: getStateColor() }} />;
};

export default RaceStateComponent;
