import React, { useEffect, useState } from "react";
import SearchForm from "./components/SearchForm/SearchForm";
import SearchResults from "./components/SearchResults/SearchResults";
import { Incident } from "./types.d";

const App = () => {
  const [incidents, setIncidents] = useState([] as Incident[]);
  useEffect(() => {
    fetch("https://bikewise.org:443/api/v2/incidents?incident_type=theft")
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
