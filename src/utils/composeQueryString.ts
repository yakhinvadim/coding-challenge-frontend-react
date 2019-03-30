import { MILLISECONDS_IN_SECOND } from "../constants/constants";
import queryString from "query-string";

const composeQueryString = ({
  dateFrom,
  dateTo,
  textQuery
}: {
  dateFrom: Date | null;
  dateTo: Date | null;
  textQuery: string;
}) => {
  let queryObj: { [key: string]: string } = {};
  if (dateFrom) {
    queryObj.dateFrom = String(dateFrom.getTime() / MILLISECONDS_IN_SECOND);
  }
  if (dateTo) {
    queryObj.dateTo = String(dateTo.getTime() / MILLISECONDS_IN_SECOND);
  }
  if (textQuery) {
    queryObj.textQuery = textQuery;
  }

  return queryString.stringify(queryObj);
};

export default composeQueryString;
