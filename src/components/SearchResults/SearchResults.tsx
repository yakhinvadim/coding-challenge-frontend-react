import React, { useState } from "react";
import IncidentCard from "../IncidentCard/IncidentCard";
import { Incident } from "../../types";
import Grid from "@material-ui/core/Grid";
import { withRouter, RouteComponentProps } from "react-router";
import queryString from "query-string";
import MuiPagination from "material-ui-flat-pagination";
import { Typography } from "@material-ui/core";

import getUrlParams from "../../utils/getUrlParams";
import { ITEMS_PER_PAGE } from "../../constants/constants";
import useIncidents from "../../hooks/useIncidents";

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

interface Props extends RouteComponentProps {}

const SearchResults: React.FunctionComponent<Props> = ({
  location,
  history
}) => {
  const { pageIncidents, allIncidents } = useIncidents();
  const [isError, setIsError] = useState(false); // TODO handle errors

  // on a pagination link click update the url with the new page number
  const handlePageClick = (event: React.MouseEvent, offset: number) => {
    const newQueryString = queryString.stringify({
      ...queryString.parse(location.search),
      page: offset / ITEMS_PER_PAGE + 1
    });
    history.push(`/?${newQueryString}`);
  };

  const incidentsCount = allIncidents
    ? `${allIncidents.length} ${
        allIncidents.length === 1 ? "case" : "cases"
      } found`
    : "Counting cases...";

  const { urlPage } = getUrlParams();

  const Pagination = () => (
    <MuiPagination
      limit={ITEMS_PER_PAGE}
      offset={(urlPage - 1) * ITEMS_PER_PAGE}
      total={allIncidents ? allIncidents.length : urlPage * ITEMS_PER_PAGE}
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
