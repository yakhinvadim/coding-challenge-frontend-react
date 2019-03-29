import React, { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import SearchResults from "../SearchResults/SearchResults";
import Grid from "@material-ui/core/Grid";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { MaybeDate } from "../../types";
import Header from "../Header/Header";
import queryString from "query-string";

interface Props extends RouteComponentProps {}

const App: React.FunctionComponent<Props> = ({ history }) => {
  const [textQuery, setTextQuery] = useState("");
  const [dateFrom, handleDateFrom] = useState(null as MaybeDate);
  const [dateTo, handleDateTo] = useState(null as MaybeDate);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const query = queryString.stringify({
      search: textQuery,
      from: dateFrom ? dateFrom.valueOf() / 1000 : "",
      to: dateTo ? dateTo.valueOf() / 1000 : ""
    });
    history.push(`/?${query}`);
  };

  const handlePageClick = (event: React.MouseEvent, offset: number) => {
    const parsedQueryString = queryString.parse(location.search);
    const newQueryString = queryString.stringify({
      ...parsedQueryString,
      page: offset / 10 + 1
    });
    history.push(`/?${newQueryString}`);
  };

  const handleTextQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTextQuery(event.target.value);
  };

  return (
    <div
      style={{ minWidth: 800, maxWidth: 1000, margin: "0 auto", padding: 20 }}
    >
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          <SearchForm
            onSubmit={handleSubmit}
            onTextQueryChange={handleTextQueryChange}
            textQuery={textQuery}
            dateTo={dateTo}
            dateFrom={dateFrom}
            onDateFromChange={handleDateFrom}
            onDateToChange={handleDateTo}
          />
        </Grid>
        <Grid item xs={12}>
          <SearchResults onPageClick={handlePageClick} />
        </Grid>
      </Grid>
    </div>
  );
};

export default withRouter(App);
