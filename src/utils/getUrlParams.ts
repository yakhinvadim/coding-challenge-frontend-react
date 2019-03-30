import { MILLISECONDS_IN_SECOND } from "../constants/constants";
import queryString from "query-string";

const getUrlParams = () => {
  const parsedQuery = queryString.parse(location.search);
  const urlPage =
    typeof parsedQuery.page === "string" ? parseInt(parsedQuery.page) : 1;

  const urlDateFrom =
    typeof parsedQuery.dateFrom === "string"
      ? new Date(parseInt(parsedQuery.dateFrom) * MILLISECONDS_IN_SECOND)
      : null;

  const urlDateTo =
    typeof parsedQuery.dateTo === "string"
      ? new Date(parseInt(parsedQuery.dateTo) * MILLISECONDS_IN_SECOND)
      : null;

  const urlTextQuery =
    typeof parsedQuery.textQuery === "string" ? parsedQuery.textQuery : "";

  return { urlTextQuery, urlDateFrom, urlDateTo, urlPage };
};

export default getUrlParams;
