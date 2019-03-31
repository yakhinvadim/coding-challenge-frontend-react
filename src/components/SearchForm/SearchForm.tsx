import React, { useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import { InlineDatePicker } from "material-ui-pickers";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import getUrlParams from "../../utils/getUrlParams";
import composeQueryString from "../../utils/composeQueryString";

const styles = createStyles({
  datePicker: {
    minHeight: 80
  },
  button: {
    marginTop: 12
  }
});

interface Props extends RouteComponentProps, WithStyles<typeof styles> {}

const SearchForm: React.FunctionComponent<Props> = ({ history, classes }) => {
  const { urlTextQuery, urlDateFrom, urlDateTo } = getUrlParams();
  const [textQuery, setTextQuery] = useState(urlTextQuery);
  const [dateFrom, onDateFromChange] = useState(urlDateFrom);
  const [dateTo, onDateToChange] = useState(urlDateTo);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (
      urlTextQuery !== textQuery ||
      urlDateFrom !== dateFrom ||
      urlDateTo !== dateTo
    ) {
      history.push(`/?${composeQueryString({ textQuery, dateFrom, dateTo })}`);
    }
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
            label="Search case descriptions"
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
