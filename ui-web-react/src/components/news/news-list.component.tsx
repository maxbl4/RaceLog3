import React, { useEffect } from "react";
import { News } from "../../model/types/datatypes";
import { FetchingComponent } from "../fetching/fetching.component";
import NewsItemComponent from "./news-item.component";
import { DEFAULT_ID } from "../../model/utils/constants";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  mainGrid: {
    marginTop: 10
  },
});

export type NewsListComponentProps = {
  news: News;
  onDataReload: any;
};

const NewsListComponent: React.FC<NewsListComponentProps> = (props: NewsListComponentProps) => {
  const classes = useStyles();

  useEffect(() => {
    props.onDataReload();;
  }, []);

  if (props.news.isFetching) {
    return <FetchingComponent />;
  } else {
    return props.news.items
      .map(values => (
        <Grid container spacing={2} className={classes.mainGrid}>
          {values.map(item => (
            <Grid key={item.id.orElse(DEFAULT_ID)} item xs={12} sm={4}>
              <NewsItemComponent item={item} />
            </Grid>
          ))}
        </Grid>
      ))
      .orElse(<div>В данный момент у нас нет для вас новостей.</div>);
  }
};

export default NewsListComponent;
