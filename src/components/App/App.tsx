import React, { useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import SearchResults from "../SearchResults/SearchResults";
import { Incident } from "../../types";

const App = () => {
  const [incidents, setIncidents] = useState([] as Incident[]);
  useEffect(() => {
    fetch(
      "https://bikewise.org:443/api/v2/incidents?incident_type=theft&page=1&per_page=1000&proximity=Berlin"
    )
      .then(response => response.json())
      .then(jsonResponse => {
        setIncidents(jsonResponse.incidents);
      });
  }, []);

  return (
    <div className="App">
      <header>Police Department of Berlin</header>
      <SearchForm />
      <SearchResults incidents={incidents} />
    </div>
  );
};

export default App;
