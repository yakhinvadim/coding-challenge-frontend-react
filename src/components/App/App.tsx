import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PageCase from "../PageCase/PageCase";
import PageIndex from "../PageIndex/PageIndex";
import Page404 from "../Page404/Page404";
import { Route, Switch } from "react-router-dom";

const styles = {
  "@global body": {
    overflowY: "overlay" as any // unofficial webkit value
  }
};

const App = () => {
  return (
    <Switch>
      <Route path="/" exact component={PageIndex} />
      <Route path="/case/:id" component={PageCase} />
      <Route component={Page404} />
    </Switch>
  );
};

export default withStyles(styles)(App);
