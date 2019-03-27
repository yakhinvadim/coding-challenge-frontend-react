import React from "react";

type Props = {
  title: string;
  description: string;
  occurredAt: number;
  updatedAt: number;
};

const Card: React.FunctionComponent<Props> = ({
  title,
  description,
  occurredAt,
  updatedAt
}) => {
  return (
    <div>
      title: {title}
      <br />
      description: {description}
      <br />
      occuredAt: {occurredAt}
      <br />
      updatedAt: {updatedAt}
      <br />
      <br />
    </div>
  );
};

export default Card;
