import React from "react";
import TextField from "@material-ui/core/TextField";
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";

const styles = createStyles({});

interface Props extends WithStyles<typeof styles> {
  onSubmit: (e: React.FormEvent) => void;
  textQuery: string;
  onTextQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchForm: React.FunctionComponent<Props> = ({
  onSubmit,
  textQuery,
  onTextQueryChange
}) => {
  return (
    <form onSubmit={onSubmit}>
      <TextField
        id="text-query"
        label="Search"
        value={textQuery}
        onChange={onTextQueryChange}
      />
    </form>
  );
};

export default withStyles(styles)(SearchForm);
