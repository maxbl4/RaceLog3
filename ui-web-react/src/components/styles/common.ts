import { Theme } from "@material-ui/core";
import { CSSProperties } from "@material-ui/styles";

export const commonStyles = (theme: Theme) => {
  return {
    global: {
      body: {
        backgroundColor: theme.palette.common.white
      }
    } as CSSProperties,
    paper: {
      padding: theme.spacing(2),
      marginTop: theme.spacing(8),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
      alignItems: "center"
    } as CSSProperties
  };
};
