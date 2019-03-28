import React from "react";
import { Incident } from "../../types";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import bike from "./bike.svg";
import CardMedia from "@material-ui/core/CardMedia";
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";

const MILLISECONDS_IN_ONE_SECOND = 1000;

const styles = createStyles({
  media: {
    width: 300,
    height: 300
  }
});
interface Props extends WithStyles<typeof styles> {
  incident: Incident;
}

const IncidentCard: React.FunctionComponent<Props> = ({
  incident,
  classes
}) => {
  return (
    <Card>
      <CardMedia
        image={incident.media.image_url_thumb || bike}
        className={classes.media}
      />
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

export default withStyles(styles)(IncidentCard);
