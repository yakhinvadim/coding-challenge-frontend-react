import React from "react";
import ReactDOM from "react-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router } from "react-router-dom";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";

import App from "./components/App/App";

import "./index.css";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

ReactDOM.render(
  <Router>
    <MuiThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <App />
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  </Router>,
  document.getElementById("root")
);
