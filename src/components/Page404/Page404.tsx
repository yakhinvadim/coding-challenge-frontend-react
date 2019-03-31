import React from "react";
import Header from "../Header/Header";
import Wrapper from "../Wrapper/Wrapper";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

const LinkToIndexPage: React.FunctionComponent = props => (
  <RouterLink to="/" {...props} />
);

const Page404 = () => {
  return (
    <Wrapper>
      <Typography variant="h1" gutterBottom>
        Page not found
      </Typography>

      <Link component={LinkToIndexPage} variant="body1">
        Go to main page
      </Link>
    </Wrapper>
  );
};

export default Page404;
