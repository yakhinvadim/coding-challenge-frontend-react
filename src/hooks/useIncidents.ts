import { useState, useEffect } from "react";
import { Incident, Query } from "../types";
import queryString from "query-string";
import {
  ITEMS_PER_PAGE,
  INFINITE_ITEMS_PER_PAGE,
  bikeWiseApi
} from "../constants/constants";
import getUrlParams from "../utils/getUrlParams";

// on every change in search parameters, reload pageIncidents and allIncidents
const useIncidents = () => {
  const [pageIncidents, setPageIncidents] = useState(null as Incident[] | null);
  const [allIncidents, setAllIncidents] = useState(null as Incident[] | null);
  const [error, setError] = useState(null as Error | null);

  const parsedQuery = queryString.parse(location.search);
  const { urlPage } = getUrlParams();

  useEffect(() => {
    const baseQuery = {
      incident_type: "theft",
      proximity: "London",
      query: parsedQuery.textQuery,
      occurred_after: parsedQuery.dateFrom,
      occurred_before: parsedQuery.dateTo
    };

    const pageResultsQuery = {
      ...baseQuery,
      per_page: ITEMS_PER_PAGE,
      page: urlPage
    };

    const allResultsQuery = {
      ...baseQuery,
      per_page: INFINITE_ITEMS_PER_PAGE
    };

    const fetchIncidents = (query: any) =>
      fetch(`${bikeWiseApi}/incidents?${queryString.stringify(query)}`)
        .then(response => response.json())
        .then(json => json.incidents)
        .catch(setError);

    setPageIncidents(null);
    setAllIncidents(null);
    setError(null);
    fetchIncidents(pageResultsQuery).then(setPageIncidents);
    fetchIncidents(allResultsQuery).then(setAllIncidents);
  }, [parsedQuery.textQuery, parsedQuery.dateFrom, parsedQuery.dateTo]);

  // get pageIncidents from allIncidents if page or allIncidents were changed (client-side pagination)
  useEffect(() => {
    if (allIncidents && allIncidents.length) {
      setPageIncidents(
        allIncidents.slice(
          (urlPage - 1) * ITEMS_PER_PAGE,
          urlPage * ITEMS_PER_PAGE
        )
      );
    }
  }, [urlPage, allIncidents]);

  return {
    pageIncidents,
    setPageIncidents,
    allIncidents,
    setAllIncidents,
    error
  };
};

export default useIncidents;
