import React from "react";
import {
  withStyles,
  WithStyles,
  createStyles,
  Theme
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { Incident } from "../../types";
import defaultBikeImage from "./bike.svg";
import getLocaleDateAndTime from "../../utils/getLocaleDateAndTime";
import Paper from "@material-ui/core/Paper";

const styles = (theme: Theme) =>
  createStyles({
    imageContainer: {
      width: 200,
      height: 200,
      flex: "none",
      backgroundImage: `url(${defaultBikeImage})`,
      backgroundSize: 200
    },
    image: {
      height: "100%"
    },
    card: {
      display: "flex"
    },
    cardContent: {
      flex: "auto",
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing.unit * 2
    },
    cardFooter: {
      marginTop: "auto",
      alignSelf: "flex-end",
      fontStyle: "italic"
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
    <Paper className={classes.card}>
      <div className={classes.imageContainer}>
        {incident.media.image_url_thumb && (
          <img src={incident.media.image_url_thumb} className={classes.image} />
        )}
      </div>
      <div className={classes.cardContent}>
        <Typography variant="h6" gutterBottom>
          {incident.title}
        </Typography>

        <Typography variant="body1" gutterBottom>
          {incident.description || "No description"}
        </Typography>

        <Typography variant="body1" gutterBottom>
          {getLocaleDateAndTime(incident.occurred_at)} — {incident.address}
        </Typography>

        <Typography variant="caption" className={classes.cardFooter}>
          Reported: {getLocaleDateAndTime(incident.updated_at)}
        </Typography>
      </div>
    </Paper>
  );
};

export default withStyles(styles)(IncidentCard);
