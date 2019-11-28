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
      marginTop: theme.spacing(5),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
      alignItems: "center"
    } as CSSProperties,
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightMedium
    } as CSSProperties,
    profileContainer: {
      margin: 0,
      padding: 0
    } as CSSProperties,
  };
};
