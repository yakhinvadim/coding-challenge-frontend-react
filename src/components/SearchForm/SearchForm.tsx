import React from "react";
import TextField from "@material-ui/core/TextField";
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import { InlineDatePicker } from "material-ui-pickers";
import { MaybeDate } from "../../types";

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
      <TextField
        id="text-query"
        label="Search"
        value={textQuery}
        onChange={onTextQueryChange}
      />
      <DatePickerTemplate
        value={dateFrom}
        onChange={onDateFromChange}
        label="From"
        placeholder="31/12/2017"
      />
      <DatePickerTemplate
        value={dateTo}
        onChange={onDateToChange}
        label="To"
        placeholder="31/12/2018"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default withStyles(styles)(SearchForm);
