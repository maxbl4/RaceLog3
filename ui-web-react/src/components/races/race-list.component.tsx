import React from "react";
import { Races } from "../../model/types/datatypes";
import { FetchingComponent } from "../common/fetching.component";
import RaceItemComponent from "./race-item.component";
import Grid from "@material-ui/core/Grid";
import { Theme } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme: Theme) => {
  return {
    mainGrid: {
      marginTop: 10
    }
  };
};

export type RaceListProps = {
  races: Races;
  onDataReload: any;
};

class RaceListComponent extends React.Component<RaceListProps> {
  componentDidMount() {
    this.props.onDataReload();
  }

  render() {
    // @ts-ignore
    const { classes } = this.props;

    if (this.props.races.isFetching) {
      return <FetchingComponent />;
    } else {
      return this.props.races.items
        .map(values => (
          <Grid container spacing={2} className={classes.mainGrid}>
            {values.map(item => (
              <Grid key={item.id} item xs={12} sm={4}>
                <RaceItemComponent item={item} />
              </Grid>
            ))}
          </Grid>
        ))
        .orElse(<div>В данный момент у нас нет для вас новостей.</div>);
    }
  }
}

export default withStyles(styles, { withTheme: true })(RaceListComponent);
