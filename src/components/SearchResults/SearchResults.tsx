import React from "react";
import IncidentCard from "../IncidentCard/IncidentCard";
import { Incident } from "../../types";
import Grid from "@material-ui/core/Grid";

type Props = {
  incidents: Incident[];
};

const Loading: React.FunctionComponent = () => {
  return <div>loading...</div>;
};

const Incidents: React.FunctionComponent<Props> = ({ incidents }) => {
  return (
    <Grid container spacing={24} direction="column">
      {incidents.map(incident => (
        <Grid item>
          <IncidentCard incident={incident} />
        </Grid>
      ))}
    </Grid>
  );
};

const SearchResults: React.FunctionComponent<Props> = ({ incidents }) => {
  return (
    <div>
      <div>total: {incidents.length}</div>
      {incidents.length ? <Incidents incidents={incidents} /> : <Loading />}
      <div>pagination</div>
    </div>
  );
};

export default SearchResults;
