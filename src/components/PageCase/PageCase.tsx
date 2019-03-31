import React from "react";
import { RouteComponentProps } from "react-router";
import Grid from "@material-ui/core/Grid";

import Header from "../Header/Header";
import Wrapper from "../Wrapper/Wrapper";
import IncidentCardWithMap from "../IncidentCardWithMap/IncidentCardWithMap";

interface Props extends RouteComponentProps<{ id: string }> {}

const PageCase: React.FunctionComponent<Props> = ({ match }) => {
  return (
    <Wrapper>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          <IncidentCardWithMap incidentId={match.params.id} />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default PageCase;
