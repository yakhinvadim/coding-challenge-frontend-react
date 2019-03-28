import React, { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import SearchResults from "../SearchResults/SearchResults";
import Grid from "@material-ui/core/Grid";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { MaybeDate } from "../../types";

interface Props extends RouteComponentProps {}

const App: React.FunctionComponent<Props> = ({ history }) => {
  const [textQuery, setTextQuery] = useState("");
  const [dateFrom, handleDateFrom] = useState(null as MaybeDate);
  const [dateTo, handleDateTo] = useState(null as MaybeDate);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    history.push(`/?query=${textQuery}`);
  };

  const handleTextQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTextQuery(event.target.value);
  };

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: 20 }}>
      <Grid container spacing={24}>
        <Grid item>
          <header>Police Department of Berlin</header>
        </Grid>
        <Grid item>
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
        <Grid item>
          <SearchResults />
        </Grid>
      </Grid>
    </div>
  );
};

export default withRouter(App);
