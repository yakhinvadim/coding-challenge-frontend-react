import React from "react";
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";

const styles = createStyles({
  wrapper: {
    minWidth: 800,
    maxWidth: 1000,
    margin: "0 auto",
    padding: 20
  }
});

interface Props extends WithStyles<typeof styles> {}

const PageIndex: React.FunctionComponent<Props> = ({ classes, children }) => {
  return <div className={classes.wrapper}>{children}</div>;
};

export default withStyles(styles)(PageIndex);
