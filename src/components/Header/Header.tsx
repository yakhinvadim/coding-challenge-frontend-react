import React from "react";
import logo from "./logo.png";
import { Typography } from "@material-ui/core";

const Header = () => {
  return (
    <header style={{ display: "flex", alignItems: "center" }}>
      <img src={logo} alt="Logo" width={150} height={150} />
      <div style={{ marginLeft: 24 }}>
        <Typography variant="h3" gutterBottom>
          Police Department of Berlin
        </Typography>
        <Typography variant="h5">Stolen Bikes</Typography>
      </div>
    </header>
  );
};

export default Header;
