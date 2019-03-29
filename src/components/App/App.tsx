import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import SearchResults from "../SearchResults/SearchResults";
import Grid from "@material-ui/core/Grid";
import Header from "../Header/Header";
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

const App: React.FunctionComponent<Props> = ({ classes }) => {
  return (
    <div className={classes.wrapper}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Header />
        </Grid>

        <Grid item xs={12}>
          <SearchForm />
        </Grid>

        <Grid item xs={12}>
          <SearchResults />
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(App);
