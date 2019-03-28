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
        <Card incident={incident} />
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
