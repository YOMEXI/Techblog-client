import {
  Box,
  Grid,
  TextField,
  Divider,
  Typography,
  Button,
  InputLabel,
  Container,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { register } from "../redux/auth/authActions";
import { UserInput } from "../../interface/allInterface";

import { useAppDispatch, useAppSelector } from "../redux/hooks";

const RegisterForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, isSuccess, isError, isInfo } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  }, [isSuccess, dispatch]);

  //
  const [form, setform] = useState({
    email: "",
    password: "",
    username: "",
    forms: new FormData(),
  });

  const { email, password, username, forms } = form;
  const newUser: UserInput = { email, password, username };
  //

  let multipleHandleChange = (name: string) => (e: any) => {
    const value = name === "image" ? e.target.files[0] : e.target.value;
    forms.set(name, value as any);
    setform({ ...form, [name]: value });
  };
  //
  const Submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(register(forms, router));
  };

  return (
    <>
      <h3 className="centerwithFlex">
        <img src="/img/home.jpg " alt="" height="130px" />
        <br />
        <span>Register</span>
        {isLoading && (
          <CircularProgress sx={{ marginTop: "4px" }} color="primary" />
        )}
        {isInfo && (
          <Alert severity="error">{isInfo && isInfo.map((e: any) => e)}</Alert>
        )}
        {isError && <Alert severity="error">{isError}</Alert>}
      </h3>
      <form onSubmit={Submit}>
        <Grid
          container
          spacing={1}
          justifyContent="center"
          alignItems="center"
          className="formcontainer"
        >
          <Grid item xs={10} lg={7}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              id="email"
              onChange={multipleHandleChange("email")}
            />
          </Grid>
          <Grid item xs={10} lg={7}>
            <TextField
              fullWidth
              id="username"
              label="Username"
              variant="outlined"
              value={username}
              onChange={multipleHandleChange("username")}
            />
          </Grid>
          <Grid item xs={10} lg={7}>
            <TextField
              fullWidth
              type="password"
              label="Password"
              variant="outlined"
              value={password}
              id="password"
              onChange={multipleHandleChange("password")}
            />
            <Box sx={{ marginTop: 4 }}>
              <Button variant="contained" component="label" color="primary">
                {" "}
                <input
                  type="file"
                  onChange={multipleHandleChange("image")}
                  name=""
                />
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Typography align="center" style={{ marginTop: "30px" }}>
          <Button
            color="primary"
            size="large"
            type="submit"
            variant="contained"
          >
            Register
          </Button>
        </Typography>
      </form>
    </>
  );
};

export default RegisterForm;
