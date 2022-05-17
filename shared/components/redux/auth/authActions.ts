import axios from "axios";
import {
  loginFail,
  loginSuccess,
  pending,
  registerFail,
  registerSuccess,
} from "./authSlice";

import { UserInput } from "../../../interface/allInterface";
import { NextRouter } from "next/router";
import { Dispatch } from "redux";
import { toast, ToastContainer } from "react-toastify";

export const register =
  (user: any, router: NextRouter) => async (dispatch: Dispatch) => {
    try {
      dispatch(pending());

      const { data } = await axios.post("/api/cloudinary/register", user);
      toast.success(data.msg);
      dispatch(registerSuccess(data));
      if (data.msg) {
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    } catch (error: any) {
      dispatch(registerFail(error.data));
    }
  };

export const login = (value: any, router: any) => async (dispatch: any) => {
  try {
    dispatch(pending());

    const { data } = await axios.post("/api/auth/login", value, {
      withCredentials: true,
      headers: { crossDomain: true, "Content-Type": "application/json" },
    });

    window.localStorage.setItem("user", JSON.stringify(data));
    if (data) {
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }

    dispatch(loginSuccess(data));
  } catch (error: any) {
    dispatch(loginFail(error.data));
  }
};
