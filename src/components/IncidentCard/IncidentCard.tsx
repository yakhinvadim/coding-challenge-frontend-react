import React from "react";
import { Incident } from "../../types";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import bike from "./bike.svg";

const MILLISECONDS_IN_ONE_SECOND = 1000;

type Props = {
  incident: Incident;
};

const IncidentCard: React.FunctionComponent<Props> = ({ incident }) => {
  return (
    <Card>
      {incident.media.image_url_thumb ? (
        <img src={incident.media.image_url_thumb} />
      ) : (
        <img src={bike} width={300} height={300} />
      )}
      <br />
      title: {incident.title}
      <br />
      description: {incident.description}
      <br />
      occured at:{" "}
      {new Date(
        incident.occurred_at * MILLISECONDS_IN_ONE_SECOND
      ).toLocaleString()}
      <br />
      updated at:{" "}
      {new Date(
        incident.updated_at * MILLISECONDS_IN_ONE_SECOND
      ).toLocaleString()}
      <br />
      address: {incident.address}
      <br />
      <br />
    </Card>
  );
};

export default IncidentCard;
