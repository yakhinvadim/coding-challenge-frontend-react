import React from "react";
import TextField from "@material-ui/core/TextField";
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import { DatePicker } from "material-ui-pickers";

const styles = createStyles({});

interface Props extends WithStyles<typeof styles> {
  onSubmit: (e: React.FormEvent) => void;
  textQuery: string;
  onTextQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dateFrom: Date;
  dateTo: Date;
  onDateFromChange: (d: Date) => void;
  onDateToChange: (d: Date) => void;
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
  return (
    <form onSubmit={onSubmit}>
      <TextField
        id="text-query"
        label="Search"
        value={textQuery}
        onChange={onTextQueryChange}
      />
      <DatePicker value={dateFrom} onChange={onDateFromChange} />
      <DatePicker value={dateTo} onChange={onDateToChange} />
      <button type="submit">Search</button>
    </form>
  );
};

export default withStyles(styles)(SearchForm);
