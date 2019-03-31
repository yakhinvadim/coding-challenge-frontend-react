import React from "react";
import {
  withStyles,
  WithStyles,
  createStyles,
  Theme
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

import { IncidentContent } from "../../types";
import getLocaleDateAndTime from "../../utils/getLocaleDateAndTime";

const styles = (theme: Theme) =>
  createStyles({
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
  incident: IncidentContent;
  withLink?: boolean;
}

const IncidentCardContent: React.FunctionComponent<Props> = ({
  incident,
  withLink,
  classes
}) => {
  const LinkToIncidentPage: React.FunctionComponent = props => (
    <RouterLink to={`/case/${incident.id}`} {...props} />
  );

  return (
    <div className={classes.cardContent}>
      {withLink ? (
        <Link component={LinkToIncidentPage} variant="h6" gutterBottom>
          {incident.title}
        </Link>
      ) : (
        <Typography variant="h6" gutterBottom>
          {incident.title || "Loading..."}
        </Typography>
      )}

      <Typography variant="body1" gutterBottom>
        {incident.description || "No description"}
      </Typography>

      <Typography variant="body1" gutterBottom>
        {incident.occurred_at && incident.address
          ? `${getLocaleDateAndTime(incident.occurred_at)} — ${
              incident.address
            }`
          : "..."}
      </Typography>

      <Typography variant="caption" className={classes.cardFooter}>
        {incident.updated_at
          ? `Reported: ${getLocaleDateAndTime(incident.updated_at)}`
          : "..."}
      </Typography>
    </div>
  );
};

export default withStyles(styles)(IncidentCardContent);
