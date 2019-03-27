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
      {incidents.map(incident => (
        <Card
          title={incident.title}
          description={incident.description}
          occurredAt={incident.occurred_at}
          updatedAt={incident.updated_at}
        />
      ))}
      pagination
    </div>
  );
};

export default SearchResults;
