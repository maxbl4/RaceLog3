import React from "react";
import NewsListContainer from "../news/news-list.container";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  mainImg: {
    width: "100%"
  }
}));

const HomeComponent: React.FC = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Container component="main">
        <CssBaseline />
        <img
          src="main-page-bike.jpg"
          className={classes.mainImg}
          title="Photo by Daniel from Pexels"
          alt="Картинка с байкером"
        />
        <NewsListContainer />
      </Container>
    </React.Fragment>
  );
};

export default HomeComponent;
