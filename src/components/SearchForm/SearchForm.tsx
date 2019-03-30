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
  const {
    textQuery: parsedTextQuery,
    dateFrom: parsedDateFrom,
    dateTo: parsedDateTo
  } = queryString.parse(location.search);

  const initialTextQuery =
    typeof parsedTextQuery === "string" ? parsedTextQuery : "";

  const initialDateFrom =
    typeof parsedDateFrom === "string"
      ? new Date(Number(parsedDateFrom) * 1000) // TODO handle wrong date
      : null;

  const initialDateTo =
    typeof parsedDateTo === "string"
      ? new Date(Number(parsedDateTo) * 1000) // TODO handle wrong date
      : null;

  const [textQuery, setTextQuery] = useState(initialTextQuery);
  const [dateFrom, onDateFromChange] = useState(initialDateFrom);
  const [dateTo, onDateToChange] = useState(initialDateTo);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let queryObj: { [key: string]: string } = {};
    if (dateFrom) {
      queryObj.dateFrom = String(dateFrom.getTime() / 1000);
    }
    if (dateTo) {
      queryObj.dateTo = String(dateTo.getTime() / 1000);
    }
    if (textQuery) {
      queryObj.textQuery = textQuery;
    }

    history.push(`/?${queryString.stringify(queryObj)}`);
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
            maxDate={dateTo}
          />
        </Grid>
        <Grid item xs>
          <DatePickerTemplate
            value={dateTo}
            onChange={onDateToChange}
            label="To"
            placeholder="31.12.2018"
            minDate={dateFrom}
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
