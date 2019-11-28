import React from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import RaceListContainer from "../races/race-list.container";

const useStyles = makeStyles(theme => ({
  mainImg: {
    width: "100%"
  },
  mainContainer: {
    width: "100%",
    maxWidth: 700,
  }
}));

const HomeComponent: React.FC = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Container component="main" className={classes.mainContainer}>
        <CssBaseline />
        <img
          src="main-page-bike.jpg"
          className={classes.mainImg}
          title="Photo by Daniel from Pexels"
          alt="Картинка с байкером"
        />
        <RaceListContainer />
      </Container>
    </React.Fragment>
  );
};

export default HomeComponent;
