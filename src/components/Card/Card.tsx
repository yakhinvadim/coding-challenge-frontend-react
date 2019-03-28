import React from "react";
import { Incident } from "../../types.d";
import Paper from "@material-ui/core/Paper";

const MILLISECONDS_IN_ONE_SECOND = 1000;

type Props = {
  incident: Incident;
};

const Card: React.FunctionComponent<Props> = ({ incident }) => {
  return (
    <Paper>
      {incident.media.image_url_thumb && (
        <img src={incident.media.image_url_thumb} />
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
    </Paper>
  );
};

export default Card;
