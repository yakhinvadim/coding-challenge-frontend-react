import React from "react";
import Grid from "@material-ui/core/Grid";
import SearchForm from "../SearchForm/SearchForm";
import SearchResults from "../SearchResults/SearchResults";
import Header from "../Header/Header";
import Wrapper from "../Wrapper/Wrapper";

const PageIndex = () => {
  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export default PageIndex;
