import React from "react";
import IncidentCardWithImg from "../IncidentCardWithImg/IncidentCardWithImg";
import Grid from "@material-ui/core/Grid";
import { withRouter, RouteComponentProps } from "react-router";
import queryString from "query-string";
import MuiPagination from "material-ui-flat-pagination";
import { Typography } from "@material-ui/core";

import getUrlParams from "../../utils/getUrlParams";
import { ITEMS_PER_PAGE } from "../../constants/constants";
import useIncidents from "../../hooks/useIncidents";

interface Props extends RouteComponentProps {}

const SearchResults: React.FunctionComponent<Props> = ({
  location,
  history
}) => {
  const { pageIncidents, allIncidents, error } = useIncidents();

  // on a pagination link click, update the url with the new page number
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

  const IncidentsArea = () => {
    if (error) {
      return <Typography variant="h5">Error: {error.message}</Typography>;
    }
    if (pageIncidents === null) {
      return <Typography variant="h5">Loading...</Typography>;
    }
    if (pageIncidents.length === 0) {
      return <Typography variant="h5">No results</Typography>;
    }
    return (
      <Grid container spacing={24} direction="column">
        {pageIncidents.map(incident => (
          <Grid item key={incident.id}>
            <IncidentCardWithImg incident={incident} />
          </Grid>
        ))}
      </Grid>
    );
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
        <IncidentsArea />
      </Grid>

      <Grid item xs={12}>
        <Pagination />
      </Grid>
    </Grid>
  );
};

export default withRouter(SearchResults);
