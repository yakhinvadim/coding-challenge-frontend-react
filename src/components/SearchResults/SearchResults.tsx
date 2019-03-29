import React, { useState, useEffect } from "react";
import IncidentCard from "../IncidentCard/IncidentCard";
import { Incident } from "../../types";
import Grid from "@material-ui/core/Grid";
import { withRouter, RouteComponentProps } from "react-router";
import queryString from "query-string";

const NoResults = () => <div>No results</div>;

const Loading = () => <div>Loading...</div>;

const Incidents = ({ incidents }: { incidents: Incident[] }) => (
  <Grid container spacing={24} direction="column">
    {incidents.map(incident => (
      <Grid item key={incident.id}>
        <IncidentCard incident={incident} />
      </Grid>
    ))}
  </Grid>
);

interface Props extends RouteComponentProps {}

const SearchResults: React.FunctionComponent<Props> = ({ location }) => {
  const [incidents, setIncidents] = useState([] as Incident[] | null);

  useEffect(() => {
    const parsedQueryString = queryString.parse(location.search);
    const query = {
      incident_type: "theft",
      page: 1,
      per_page: 10,
      proximity: "Berlin",
      query: parsedQueryString.search,
      occurred_after: parsedQueryString.from,
      occurred_before: parsedQueryString.to
    };

    setIncidents(null);

    fetch(
      `https://bikewise.org:443/api/v2/incidents?${queryString.stringify(
        query
      )}`
    )
      .then(response => response.json())
      .then(jsonResponse => {
        setIncidents(jsonResponse.incidents);
      });
  }, [location]);

  return (
    <div>
      <div>total: {!incidents ? "..." : incidents.length}</div>

      {!incidents ? (
        <Loading />
      ) : incidents.length === 0 ? (
        <NoResults />
      ) : (
        <Incidents incidents={incidents} />
      )}

      <div>pagination</div>
    </div>
  );
};

export default withRouter(SearchResults);
