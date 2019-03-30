import React from "react";
import ReactDOM from "react-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router } from "react-router-dom";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import CssBaseline from "@material-ui/core/CssBaseline";

import App from "./components/App/App";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

ReactDOM.render(
  <Router>
    <MuiThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <>
          <CssBaseline />
          <App />
        </>
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  </Router>,
  document.getElementById("root")
);
