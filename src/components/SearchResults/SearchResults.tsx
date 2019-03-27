import React from "react";
import Card from "../Card/Card";
import { Incident } from "../../types.d";

type Props = {
  incidents: Incident[];
};

const SearchResults: React.FunctionComponent<Props> = ({ incidents }) => {
  return (
    <div>
      total: XX
      {incidents.map(incident => JSON.stringify(incident))}
      <Card />
      <Card />
      pagination
    </div>
  );
};

export default SearchResults;
