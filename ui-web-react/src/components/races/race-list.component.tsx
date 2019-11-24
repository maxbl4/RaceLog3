import React, { useEffect } from "react";
import { Races } from "../../model/types/datatypes";
import { FetchingComponent } from "../fetching/fetching.component";
import RaceItemComponent from "./race-item.component";
import { DEFAULT_ID } from "../../model/utils/constants";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  mainGrid: {
    marginTop: 10
  }
});

export type RaceListComponentProps = {
  races: Races;
  onDataReload: any;
};

const RaceListComponent: React.FC<RaceListComponentProps> = (props: RaceListComponentProps) => {
  const classes = useStyles();

  useEffect(() => {
    props.onDataReload();
  }, []);

  if (props.races.isFetching) {
    return <FetchingComponent />;
  } else {
    return props.races.items
      .map(values => (
        <Grid container spacing={2} className={classes.mainGrid}>
          {values.map(item => (
            <Grid key={item.id.orElse(DEFAULT_ID)} item xs={12} sm={4}>
              <RaceItemComponent item={item} />
            </Grid>
          ))}
        </Grid>
      ))
      .orElse(<div>В данный момент у нас нет для вас новостей.</div>);
  }
};

export default RaceListComponent;
