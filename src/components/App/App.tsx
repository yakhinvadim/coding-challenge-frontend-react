import React, { useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import SearchResults from "../SearchResults/SearchResults";
import { Incident } from "../../types";
import Grid from "@material-ui/core/Grid";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps {}

const App: React.FunctionComponent<Props> = ({ history }) => {
  const [incidents, setIncidents] = useState([] as Incident[]);
  const [textQuery, setTextQuery] = useState("");

  useEffect(() => {
    fetch(
      "https://bikewise.org:443/api/v2/incidents?incident_type=theft&page=1&per_page=10&proximity=Berlin"
    )
      .then(response => response.json())
      .then(jsonResponse => {
        setIncidents(jsonResponse.incidents);
      });
  }, []);

  const handleSubmit = () => {
    history.push(`?query=${textQuery}`);
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
          />
        </Grid>
        <Grid item>
          <SearchResults incidents={incidents} />
        </Grid>
      </Grid>
    </div>
  );
};

export default withRouter(App);
