import Alert from "@mui/material/Alert";
import { createTheme } from "@mui/material/styles";
import axios from "axios";
import Router, { NextRouter } from "next/router";
import { toast } from "react-toastify";
import { mutate } from "swr";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#040303",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#000000",
      contrastText: "#ffffff",
    },
  },
});

export const successMessage: any = ({ message }: any) => {
  <Alert severity="error">{message}</Alert>;
};

export const errorMessage: any = ({ message }: any) => {
  <Alert severity="error">{message}</Alert>;
};

export const ToastSuccess = (msg: any) => {
  return toast.success(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const ToastFailure = (msg: any) => {
  return toast.error(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

//
export const likeFeed = async (
  id: number,
  feedId: number,
  liked: boolean,
  user: any
) => {
  if (!user) return toast.error("Unauthorized Please login");
  if (liked) {
    const { data } = await axios.post(`/api/feed/unlike/${id}`);
    mutate(`/api/feed/${feedId}`);
  } else {
    const { data } = await axios.post(`/api/feed/like/${id}`);
    mutate(`/api/feed/${feedId}`);
  }
};

export const logout = async (router: NextRouter) => {
  const res = await axios.get(`/api/cloudinary/logout`);

  if (res) {
    toast.success(res.data.msg);
    window.location.href = "/auth/login";
    localStorage.removeItem("user");
  }
};
