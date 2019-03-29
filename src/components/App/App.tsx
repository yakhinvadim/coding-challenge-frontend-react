import React, { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import SearchResults from "../SearchResults/SearchResults";
import Grid from "@material-ui/core/Grid";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { MaybeDate } from "../../types";
import Header from "../Header/Header";
import queryString from "query-string";

interface Props extends RouteComponentProps {}

const App: React.FunctionComponent<Props> = ({ history }) => {
  return (
    <div
      style={{ minWidth: 800, maxWidth: 1000, margin: "0 auto", padding: 20 }}
    >
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

export default withRouter(App);
