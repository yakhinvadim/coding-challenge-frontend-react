import queryString from "query-string";
import { fromUnixTime } from "date-fns/esm";

const getUrlParams = () => {
  const parsedQuery = queryString.parse(location.search);
  const urlPage =
    typeof parsedQuery.page === "string" ? parseInt(parsedQuery.page) : 1;

  const urlDateFrom =
    typeof parsedQuery.dateFrom === "string"
      ? fromUnixTime(parseInt(parsedQuery.dateFrom))
      : null;

  const urlDateTo =
    typeof parsedQuery.dateTo === "string"
      ? fromUnixTime(parseInt(parsedQuery.dateTo))
      : null;

  const urlTextQuery =
    typeof parsedQuery.textQuery === "string" ? parsedQuery.textQuery : "";

  return { urlTextQuery, urlDateFrom, urlDateTo, urlPage };
};

export default getUrlParams;
