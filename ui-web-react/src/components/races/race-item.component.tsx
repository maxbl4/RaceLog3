import React from "react";
import { RaceItem } from "../../model/types/datatypes";
import { DELIMITER, RACES } from "../../model/routing/paths";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// @ts-ignore
import { useHistory } from "react-router-dom";
import {
  RACE_ITEM_CARD_NAME,
  RACE_ITEM_CARD_DATE,
  RACE_ITEM_CARD_MORE_BUTTON
} from "../../model/utils/constants";

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

export type RaceItemProps = {
  item: RaceItem;
};

const RaceItemComponent: React.FC<RaceItemProps> = (props: RaceItemProps) => {
  const classes = useStyles();
  const history = useHistory();
  const reRouteTo = (path: string): void => history.push(path);
  const createID = (fieldID: string): string => fieldID + "_" + props.item.name;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          id={createID(RACE_ITEM_CARD_DATE)}
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {new Date(props.item.date).toLocaleDateString()}
        </Typography>
        <Typography
          id={createID(RACE_ITEM_CARD_NAME)}
          variant="h5"
          component="h2"
          className={classes.pos}
        >
          {props.item.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          id={createID(RACE_ITEM_CARD_MORE_BUTTON)}
          size="small"
          onClick={() => reRouteTo(RACES + DELIMITER + props.item.id)}
        >
          Подробнее
        </Button>
      </CardActions>
    </Card>
  );
};

export default RaceItemComponent;
