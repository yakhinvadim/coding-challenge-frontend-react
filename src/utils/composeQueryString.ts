import queryString from "query-string";
import { getUnixTime } from "date-fns/esm";

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
    queryObj.dateFrom = getUnixTime(dateFrom).toString();
  }
  if (dateTo) {
    queryObj.dateTo = getUnixTime(dateTo).toString();
  }
  if (textQuery) {
    queryObj.textQuery = textQuery;
  }

  return queryString.stringify(queryObj);
};

export default composeQueryString;
