import React from "react";
import { Typography } from "@material-ui/core";
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";

import logo from "./logo.png";

const styles = createStyles({
  header: {
    display: "flex",
    alignItems: "center"
  },
  logo: {
    width: 150,
    height: 150,
    marginRight: 24
  }
});

interface Props extends WithStyles<typeof styles> {}

const Header: React.FunctionComponent<Props> = ({ classes }) => {
  return (
    <header className={classes.header}>
      <a href="/">
        <img src={logo} alt="Logo" className={classes.logo} />
      </a>
      <div>
        <Typography variant="h3" gutterBottom>
          Police Department of Berlin
        </Typography>
        <Typography variant="h5">Stolen Bikes</Typography>
      </div>
    </header>
  );
};

export default withStyles(styles)(Header);
