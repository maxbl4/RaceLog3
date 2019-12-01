import React, { useState } from "react";
import { UserInfo } from "../../model/types/datatypes";
import Optional from "optional-js";
import { DEFAULT, USER_SIGN_IN, USER_PROFILE } from "../../model/routing/paths";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Tooltip from "@material-ui/core/Tooltip";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// @ts-ignore
import { useHistory } from "react-router-dom";
import { getRoleName } from "../../model/types/roles.model";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  list: {
    width: 250
  }
}));

export type HeaderComponentProps = {
  userInfo: Optional<UserInfo>;
};

const HeaderComponent: React.FC<HeaderComponentProps> = (props: HeaderComponentProps) => {
  const classes = useStyles();
  const history = useHistory();
  const reRouteTo = (path: string): void => history.push(path);
  const [sideMenuVisible, setSideMenuVisible] = useState(false);
  const toggleDrawer = (state: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setSideMenuVisible(state);
  };

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button key={"Домой"} onClick={() => reRouteTo(DEFAULT)}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={"Домой"} />
        </ListItem>
        {props.userInfo
          .map(info => (
            <ListItem button key={"Профиль"} onClick={() => reRouteTo(USER_PROFILE)}>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary={"Профиль"} />
            </ListItem>
          ))
          .orElse(
            <ListItem button key={"Войти"} onClick={() => reRouteTo(USER_SIGN_IN)}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={"Войти"} />
            </ListItem>
          )}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <Drawer open={sideMenuVisible} onClose={toggleDrawer(false)}>
        {sideList()}
      </Drawer>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            RaceLog3
          </Typography>
          {props.userInfo
            .map(info => (
              <Tooltip title={`${info.name} (${getRoleName(info.role)}, ${info.email})`}>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={() => reRouteTo(USER_PROFILE)}
                >
                  <AccountCircle />
                </IconButton>
              </Tooltip>
            ))
            .orElse(
              <Button color="inherit" onClick={() => reRouteTo(USER_SIGN_IN)}>
                Войти
              </Button>
            )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default HeaderComponent;
