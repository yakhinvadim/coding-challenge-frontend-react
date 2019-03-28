import React from "react";
import TextField from "@material-ui/core/TextField";
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import { InlineDatePicker } from "material-ui-pickers";
import { MaybeDate } from "../../types";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const styles = createStyles({});

interface Props extends WithStyles<typeof styles> {
  onSubmit: (e: React.FormEvent) => void;
  textQuery: string;
  onTextQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dateFrom: MaybeDate;
  dateTo: MaybeDate;
  onDateFromChange: (maybeDate: MaybeDate) => void;
  onDateToChange: (maybeDate: MaybeDate) => void;
}

const SearchForm: React.FunctionComponent<Props> = ({
  onSubmit,
  textQuery,
  onTextQueryChange,
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange
}) => {
  const DatePickerTemplate = (props: any) => {
    return (
      <InlineDatePicker
        disableFuture
        keyboard
        disableOpenOnEnter
        format="DD/MM/YYYY"
        mask={value =>
          value
            ? [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]
            : []
        }
        {...props}
      />
    );
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid
        container
        spacing={24}
        alignItems="flex-end"
        justify="space-between"
      >
        <Grid item xs={4}>
          <TextField
            id="text-query"
            label="Search"
            value={textQuery}
            onChange={onTextQueryChange}
            placeholder="Cannondale"
            fullWidth
          />
        </Grid>
        <Grid item xs>
          <DatePickerTemplate
            value={dateFrom}
            onChange={onDateFromChange}
            label="From"
            placeholder="31/12/2017"
          />
        </Grid>
        <Grid item xs>
          <DatePickerTemplate
            value={dateTo}
            onChange={onDateToChange}
            label="To"
            placeholder="31/12/2018"
          />
        </Grid>
        <Grid item xs>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Find Cases
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default withStyles(styles)(SearchForm);
