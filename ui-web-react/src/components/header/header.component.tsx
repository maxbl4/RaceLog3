import React from "react";
import { UserInfo } from "../../model/types/datatypes";
import Optional from "optional-js";
import { DEFAULT, USER_SIGN_IN, USER_PROFILE } from "../../model/routing/paths";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AccountCircle from "@material-ui/icons/AccountCircle";
// @ts-ignore
import { useHistory } from "react-router-dom";
import { getRoleName } from "../../model/types/roles.model";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}));

export type HeaderComponentProps = {
  userInfo: Optional<UserInfo>;
};

const HeaderComponent: React.FC<HeaderComponentProps> = (props: HeaderComponentProps) => {
  const classes = useStyles();
  const history = useHistory();
  const reRouteTo = (path: string): void => history.push(path);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Button color="inherit" onClick={() => reRouteTo(DEFAULT)}>
              Домой
            </Button>
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