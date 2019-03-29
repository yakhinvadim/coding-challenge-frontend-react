import React from "react";
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";

import { Incident } from "../../types";
import bike from "./bike.svg";
import getLocaleDateAndTime from "../../utils/getLocaleDateAndTime/getLocaleDateAndTime";

const styles = createStyles({
  media: {
    width: 200,
    height: 200,
    flex: "none"
  },
  card: {
    display: "flex"
  },
  cardContent: {
    flex: "auto",
    display: "flex",
    flexDirection: "column"
  },

  cardFooter: {
    marginTop: "auto",
    alignSelf: "flex-end"
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
    <Card className={classes.card}>
      <CardMedia
        image={incident.media.image_url_thumb || bike}
        className={classes.media}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h6" gutterBottom>
          {incident.title}
        </Typography>

        <Typography variant="body1" gutterBottom>
          {incident.description || "No description"}
        </Typography>

        <Typography variant="body1" gutterBottom>
          {getLocaleDateAndTime(incident.occurred_at)} — {incident.address}
        </Typography>

        <Typography variant="body2" className={classes.cardFooter}>
          Reported: {getLocaleDateAndTime(incident.updated_at)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(IncidentCard);
