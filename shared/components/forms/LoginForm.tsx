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
import { login, register } from "../redux/auth/authActions";
import { UserInput } from "../../interface/allInterface";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toast } from "react-toastify";

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, isSuccess, isError, isInfo, user } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess) toast.success("Welcome");
    if (user) {
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  }, [user, router]);

  //
  const [form, setform] = useState({
    email: "",
    password: "",
    username: "",
  });

  const { email, password, username } = form;
  const newUser: UserInput = { email, password, username };
  //
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setform({ ...form, [e.target.id]: e.target.value });
  };
  //
  const Submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(login(newUser, router));
  };

  return (
    <>
      <h3 className="centerwithFlex">
        <img src="/img/home.jpg " alt="" height="130px" />
        <br />
        <span>Login</span>
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
              onChange={handleChange}
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
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Typography align="center" style={{ marginTop: "30px" }}>
          <Button
            color="primary"
            size="large"
            type="submit"
            variant="contained"
          >
            Login
          </Button>
        </Typography>
      </form>
    </>
  );
};

export default LoginForm;
