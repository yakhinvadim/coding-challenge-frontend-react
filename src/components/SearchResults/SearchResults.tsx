import React from "react";
import Card from "../Card/Card";
import { Incident } from "../../types.d";

type Props = {
  incidents: Incident[];
};

const Loading: React.FunctionComponent = () => {
  return <div>loading...</div>;
};

const Incidents: React.FunctionComponent<Props> = ({ incidents }) => {
  return (
    <>
      {incidents.map(incident => (
        <Card
          title={incident.title}
          description={incident.description}
          occurredAt={incident.occurred_at}
          updatedAt={incident.updated_at}
        />
      ))}
    </>
  );
};

const SearchResults: React.FunctionComponent<Props> = ({ incidents }) => {
  return (
    <div>
      total: {incidents.length}
      {incidents.length ? <Incidents incidents={incidents} /> : <Loading />}
      pagination
    </div>
  );
};

export default SearchResults;
