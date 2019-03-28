import React from "react";
import { Incident } from "../../types.d";

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
      occured at: {incident.occurred_at}
      <br />
      updated at: {incident.updated_at}
      <br />
      address: {incident.address}
      <br />
      <br />
    </div>
  );
};

export default Card;
