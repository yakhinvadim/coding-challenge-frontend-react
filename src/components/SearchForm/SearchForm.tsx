import React, { useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import { InlineDatePicker } from "material-ui-pickers";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import queryString from "query-string";

import { Incident } from "../../types";

const styles = createStyles({
  datePicker: {
    minHeight: 80
  },
  button: {
    marginTop: 12
  }
});

interface Props extends RouteComponentProps, WithStyles<typeof styles> {
  setAllIncidents: (incidents: Incident[] | null) => void;
}

const SearchForm: React.FunctionComponent<Props> = ({
  history,
  classes,
  setAllIncidents
}) => {
  const [textQuery, setTextQuery] = useState("");
  const [dateFrom, onDateFromChange] = useState(null as Date | null);
  const [dateTo, onDateToChange] = useState(null as Date | null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const query = queryString.stringify({
      dateFrom: dateFrom ? dateFrom.valueOf() / 1000 : "",
      dateTo: dateTo ? dateTo.valueOf() / 1000 : "",
      textQuery
    });

    history.push(`/?${query}`);
    setAllIncidents(null);
  };

  const handleTextQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTextQuery(event.target.value);
  };

  const DatePickerTemplate = (props: any) => {
    return (
      <InlineDatePicker
        clearable
        autoOk
        disableFuture
        keyboard
        className={classes.datePicker}
        format="dd.MM.yyyy"
        mask={value =>
          value
            ? [/\d/, /\d/, ".", /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/]
            : []
        }
        {...props}
      />
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        spacing={24}
        alignItems="flex-start"
        justify="space-between"
      >
        <Grid item xs={4}>
          <TextField
            id="text-query"
            label="Search"
            value={textQuery}
            onChange={handleTextQueryChange}
            placeholder="Cannondale"
            fullWidth
          />
        </Grid>
        <Grid item xs>
          <DatePickerTemplate
            value={dateFrom}
            onChange={onDateFromChange}
            label="From"
            placeholder="31.12.2017"
          />
        </Grid>
        <Grid item xs>
          <DatePickerTemplate
            value={dateTo}
            onChange={onDateToChange}
            label="To"
            placeholder="31.12.2018"
          />
        </Grid>
        <Grid item xs>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.button}
          >
            Find Cases
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default withStyles(styles)(withRouter(SearchForm));
