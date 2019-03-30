import React, { useState, useEffect } from "react";
import IncidentCard from "../IncidentCard/IncidentCard";
import { Incident } from "../../types";
import Grid from "@material-ui/core/Grid";
import { withRouter, RouteComponentProps } from "react-router";
import queryString from "query-string";
import MuiPagination from "material-ui-flat-pagination";
import { Typography } from "@material-ui/core";

const ITEMS_PER_PAGE = 10;
const HUGE_NUMBER = 1000000;

const NoResults = () => (
  <div>
    <Typography variant="h5">No results</Typography>
  </div>
);

const Error = () => (
  <div>
    <Typography variant="h5">Error. Please, reload the page</Typography>
  </div>
);

const Loading = () => (
  <div>
    <Typography variant="h5">Loading...</Typography>
  </div>
);

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
  allIncidents: Incident[] | null;
  setAllIncidents: (incidents: Incident[] | null) => void;
}

const SearchResults: React.FunctionComponent<Props> = ({
  location,
  history,
  allIncidents,
  setAllIncidents
}) => {
  const [pageIncidents, setPageIncidents] = useState([] as Incident[] | null);
  const [isError, setIsError] = useState(false);

  const parsedQuery = queryString.parse(location.search);

  const handlePageClick = (event: React.MouseEvent, offset: number) => {
    const newQueryString = queryString.stringify({
      ...parsedQuery,
      page: offset / ITEMS_PER_PAGE + 1
    });
    history.push(`/?${newQueryString}`);
  };

  const parsedPage = parsedQuery.page;
  const page =
    parsedPage == null || Array.isArray(parsedPage) ? 1 : parseInt(parsedPage);

  const { textQuery, dateFrom, dateTo } = parsedQuery;

  useEffect(() => {
    const queryBase = {
      incident_type: "theft",
      proximity: "London",
      query: textQuery,
      occurred_after: dateFrom,
      occurred_before: dateTo
    };

    const pageResultsQuery = {
      ...queryBase,
      per_page: ITEMS_PER_PAGE,
      page
    };

    const allResultsQuery = {
      ...queryBase,
      page: 1,
      per_page: HUGE_NUMBER
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
      .catch(() => {
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
  }, [textQuery, dateFrom, dateTo]);

  useEffect(() => {
    if (allIncidents) {
      setPageIncidents(
        allIncidents.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
      );
    }
  }, [page, allIncidents]);

  const Pagination = () => (
    <MuiPagination
      limit={ITEMS_PER_PAGE}
      offset={(page - 1) * ITEMS_PER_PAGE}
      total={allIncidents ? allIncidents.length : page * ITEMS_PER_PAGE}
      onClick={handlePageClick}
    />
  );

  const IncidentsList = () => {
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

  const incidentsCount = allIncidents
    ? `${allIncidents.length} ${
        allIncidents.length === 1 ? "case" : "cases"
      } found`
    : "Counting cases...";

  return (
    <Grid container spacing={24}>
      <Grid item xs={12} container justify="space-between" alignItems="center">
        <Grid item>
          <Pagination />
        </Grid>

        <Grid item>
          <Typography variant="body1">{incidentsCount}</Typography>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <IncidentsList />
      </Grid>

      <Grid item xs={12}>
        <Pagination />
      </Grid>
    </Grid>
  );
};

export default withRouter(SearchResults);
