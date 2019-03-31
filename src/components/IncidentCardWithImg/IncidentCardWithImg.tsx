import React from "react";
import {
  withStyles,
  WithStyles,
  createStyles,
  Theme
} from "@material-ui/core/styles";

import { Incident } from "../../types";
import defaultBikeImage from "./bike.svg";
import Paper from "@material-ui/core/Paper";
import IncidentCardContent from "../IncidentCardContent/IncidentCardContent";

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
    }
  });

interface Props extends WithStyles<typeof styles> {
  incident: Incident;
}

const IncidentCardWithImg: React.FunctionComponent<Props> = ({
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
      <IncidentCardContent incident={incident} />
    </Paper>
  );
};

export default withStyles(styles)(IncidentCardWithImg);
