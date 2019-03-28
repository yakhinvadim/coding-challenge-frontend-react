import React from "react";
import { Incident } from "../../types.d";

const MILLISECONDS_IN_ONE_SECOND = 1000;

type Props = {
  incident: Incident;
};

const Card: React.FunctionComponent<Props> = ({ incident }) => {
  return (
    <div>
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
    </div>
  );
};

export default Card;
