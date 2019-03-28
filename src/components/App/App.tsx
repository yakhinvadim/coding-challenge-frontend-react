import React, { useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import SearchResults from "../SearchResults/SearchResults";
import { Incident } from "../../types";
import Grid from "@material-ui/core/Grid";

const App = () => {
  const [incidents, setIncidents] = useState([] as Incident[]);
  useEffect(() => {
    fetch(
      "https://bikewise.org:443/api/v2/incidents?incident_type=theft&page=1&per_page=10&proximity=Berlin"
    )
      .then(response => response.json())
      .then(jsonResponse => {
        setIncidents(jsonResponse.incidents);
      });
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <Grid container spacing={24}>
        <Grid item>
          <header>Police Department of Berlin</header>
        </Grid>
        <Grid item>
          <SearchForm />
        </Grid>
        <Grid item>
          <SearchResults incidents={incidents} />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;