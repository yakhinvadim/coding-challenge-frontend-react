import React, { useState, useEffect } from "react";
import IncidentCard from "../IncidentCard/IncidentCard";
import { Incident } from "../../types";
import Grid from "@material-ui/core/Grid";
import { withRouter, RouteComponentProps } from "react-router";
import queryString from "query-string";
import Pagination from "material-ui-flat-pagination";

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

interface Props extends RouteComponentProps {
  onPageClick: (event: React.MouseEvent, offset: number) => void;
}

const SearchResults: React.FunctionComponent<Props> = ({
  location,
  onPageClick
}) => {
  const [pageIncidents, setPageIncidents] = useState([] as Incident[] | null);
  const [allIncidents, setAllIncidents] = useState(null as Incident[] | null);

  const parsedpage = queryString.parse(location.search).page;
  let page;
  if (parsedpage == null || Array.isArray(parsedpage)) {
    page = 1;
  } else {
    page = parseInt(parsedpage);
  }

  useEffect(() => {
    const parsedQueryString = queryString.parse(location.search);
    const queryBase = {
      incident_type: "theft",
      proximity: "London",
      query: parsedQueryString.search,
      occurred_after: parsedQueryString.from,
      occurred_before: parsedQueryString.to
    };

    const pageResultsQuery = {
      ...queryBase,
      page: parsedQueryString.page,
      per_page: 10
    };

    const allResultsQuery = {
      ...queryBase,
      page: 1,
      per_page: 1000
    };

    setPageIncidents(null);

    fetch(
      `https://bikewise.org:443/api/v2/incidents?${queryString.stringify(
        pageResultsQuery
      )}`
    )
      .then(response => response.json())
      .then(jsonResponse => {
        setPageIncidents(jsonResponse.incidents);
      });

    fetch(
      `https://bikewise.org:443/api/v2/incidents?${queryString.stringify(
        allResultsQuery
      )}`
    )
      .then(response => response.json())
      .then(jsonResponse => {
        setAllIncidents(jsonResponse.incidents);
      });
  }, [location]);

  return (
    <div>
      <div>total: {!allIncidents ? "..." : allIncidents.length}</div>
      <Pagination
        limit={10}
        offset={(page - 1) * 10}
        total={allIncidents ? allIncidents.length : 10}
        onClick={onPageClick}
      />

      {!pageIncidents ? (
        <Loading />
      ) : pageIncidents.length === 0 ? (
        <NoResults />
      ) : (
        <Incidents incidents={pageIncidents} />
      )}

      <Pagination
        limit={10}
        offset={(page - 1) * 10}
        total={allIncidents ? allIncidents.length : 10}
        onClick={onPageClick}
      />
    </div>
  );
};

export default withRouter(SearchResults);
