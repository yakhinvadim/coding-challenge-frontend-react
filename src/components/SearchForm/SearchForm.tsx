import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import { InlineDatePicker } from "material-ui-pickers";
import { MaybeDate } from "../../types";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import queryString from "query-string";
import { withRouter, RouteComponentProps } from "react-router-dom";

const styles = createStyles({});

interface Props extends RouteComponentProps, WithStyles<typeof styles> {}

const SearchForm: React.FunctionComponent<Props> = ({ history }) => {
  const [textQuery, setTextQuery] = useState("");
  const [dateFrom, onDateFromChange] = useState(null as MaybeDate);
  const [dateTo, onDateToChange] = useState(null as MaybeDate);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const query = queryString.stringify({
      search: textQuery,
      from: dateFrom ? dateFrom.valueOf() / 1000 : "",
      to: dateTo ? dateTo.valueOf() / 1000 : ""
    });

    history.push(`/?${query}`);
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
        style={{ minHeight: 80 }}
        format="DD.MM.YYYY"
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
            style={{ marginTop: 15 }}
          >
            Find Cases
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default withStyles(styles)(withRouter(SearchForm));
