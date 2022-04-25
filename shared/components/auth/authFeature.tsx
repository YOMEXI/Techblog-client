import { Button, Grid, TextField } from "@mui/material";
import React from "react";

interface AuthFeature {
  text: string;
  label: string;
}

const AuthFeature: React.FC<AuthFeature> = ({ text, label }) => {
  return (
    <>
      <h3 className="centerwithFlex">
        <img src="/img/home.jpg " alt="" height="130px" />
        <br />
        <span>{text}</span>
      </h3>
      <Grid
        container
        spacing={1}
        justifyContent="center"
        alignItems="center"
        className="formcontainer"
      >
        <Grid item xs={10} md={6} lg={7}>
          <TextField fullWidth label={label} variant="outlined" value={label} />
        </Grid>
      </Grid>
      <Button variant="contained">Submit</Button>
    </>
  );
};

export default AuthFeature;
