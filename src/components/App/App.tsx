import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";

import { Incident } from "../../types";
import SearchForm from "../SearchForm/SearchForm";
import SearchResults from "../SearchResults/SearchResults";
import Header from "../Header/Header";

const styles = createStyles({
  "@global body": {
    overflowY: "overlay" as any // unofficial webkit value
  },
  wrapper: {
    minWidth: 800,
    maxWidth: 1000,
    margin: "0 auto",
    padding: 20
  }
});

interface Props extends WithStyles<typeof styles> {}

const App: React.FunctionComponent<Props> = ({ classes }) => {
  const [allIncidents, setAllIncidents] = useState(null as Incident[] | null);

  return (
    <div className={classes.wrapper}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Header />
        </Grid>

        <Grid item xs={12}>
          <SearchForm setAllIncidents={setAllIncidents} />
        </Grid>

        <Grid item xs={12}>
          <SearchResults
            allIncidents={allIncidents}
            setAllIncidents={setAllIncidents}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(App);
