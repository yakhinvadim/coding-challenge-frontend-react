import React, { useState, useEffect } from "react";
import IncidentCard from "../IncidentCard/IncidentCard";
import { Incident } from "../../types";
import Grid from "@material-ui/core/Grid";
import { withRouter, RouteComponentProps } from "react-router";
import queryString from "query-string";
import MuiPagination from "material-ui-flat-pagination";

const NoResults = () => <div>No results</div>;

const Error = () => <div>Error</div>;

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

const SearchResults: React.FunctionComponent<Props> = ({
  location,
  history
}) => {
  const [pageIncidents, setPageIncidents] = useState([] as Incident[] | null);
  const [allIncidents, setAllIncidents] = useState(null as Incident[] | null);
  const [isError, setIsError] = useState(false);

  const handlePageClick = (event: React.MouseEvent, offset: number) => {
    const parsedQueryString = queryString.parse(location.search);
    const newQueryString = queryString.stringify({
      ...parsedQueryString,
      page: offset / 10 + 1
    });
    history.push(`/?${newQueryString}`);
  };

  const parsedpage = queryString.parse(location.search).page;
  let page: number;
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
      })
      .catch(error => {
        setIsError(true);
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

  const Pagination = () => (
    <MuiPagination
      limit={10}
      offset={(page - 1) * 10}
      total={allIncidents ? allIncidents.length : 10}
      onClick={handlePageClick}
    />
  );

  const List = () => {
    if (isError) {
      return <Error />;
    }
    if (pageIncidents == null) {
      return <Loading />;
    }
    if (pageIncidents.length === 0) {
      return <NoResults />;
    }
    return <Incidents incidents={pageIncidents} />;
  };

  return (
    <div>
      <div>total: {!allIncidents ? "..." : allIncidents.length}</div>
      <Pagination />

      <List />

      <Pagination />
    </div>
  );
};

export default withRouter(SearchResults);
