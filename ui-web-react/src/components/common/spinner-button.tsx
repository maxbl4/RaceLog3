import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { CircularProgress, Button } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      margin: theme.spacing(3, 0, 1),
      position: "relative"
    },
    buttonProgress: {
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12
    }
  })
);

type SpinnerButtonProps = {
  id: string;
  label: string;
  showSpinner: boolean;
  handleClick: () => void;
};

const SpinnerButton: React.FC<SpinnerButtonProps> = (props: SpinnerButtonProps) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Button
        id={props.id}
        type="button"
        fullWidth
        variant="contained"
        color="primary"
        disabled={props.showSpinner}
        onClick={props.handleClick}
      >
        {props.label}
      </Button>
      {props.showSpinner && <CircularProgress size={24} className={classes.buttonProgress} />}
    </div>
  );
};

export default SpinnerButton;
