import React from "react";
import { NewsItem } from "../../model/types/datatypes";
import { DELIMITER, NEWS } from "../../model/routing/paths";
import { DEFAULT_ID, DEFAULT_DATE } from "../../model/utils/constants";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// @ts-ignore
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  card: {
    minWidth: 200
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

export type NewsItemProps = {
  item: NewsItem;
};

const NewsItemComponent: React.FC<NewsItemProps> = (props: NewsItemProps) => {
  const classes = useStyles();
  const history = useHistory();
  const reRouteTo = (path: string): void => history.push(path);

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {new Date(props.item.date.orElse(DEFAULT_DATE)).toDateString()}
        </Typography>
        <Typography variant="h5" component="h2" className={classes.pos}>
          {props.item.header.orElse("")}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => reRouteTo(NEWS + DELIMITER + props.item.id.orElse(DEFAULT_ID))}
        >
          Подробнее
        </Button>
      </CardActions>
    </Card>
  );
};

export default NewsItemComponent;
