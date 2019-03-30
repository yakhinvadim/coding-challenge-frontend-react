import { useState, useEffect } from "react";
import { Incident } from "../types";
import queryString from "query-string";
import {
  ITEMS_PER_PAGE,
  INFINITE_ITEMS_PER_PAGE
} from "../constants/constants";
import getUrlParams from "../utils/getUrlParams";

// on every change in search parameters, reload pageIncidents and allIncidents
const useIncidents = () => {
  const [pageIncidents, setPageIncidents] = useState(null as Incident[] | null);
  const [allIncidents, setAllIncidents] = useState(null as Incident[] | null);

  const parsedQuery = queryString.parse(location.search);

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
      page: parsedQuery.page
    };

    const allResultsQuery = {
      ...baseQuery,
      per_page: INFINITE_ITEMS_PER_PAGE,
      page: 1
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

    setAllIncidents(null);
    fetch(
      `https://bikewise.org:443/api/v2/incidents?${queryString.stringify(
        allResultsQuery
      )}`
    )
      .then(response => response.json())
      .then(jsonResponse => {
        setAllIncidents(jsonResponse.incidents);
      });
  }, [parsedQuery.textQuery, parsedQuery.dateFrom, parsedQuery.dateTo]);

  const { urlPage } = getUrlParams();

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

  return { pageIncidents, setPageIncidents, allIncidents, setAllIncidents };
};

export default useIncidents;
