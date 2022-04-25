import { createSlice } from "@reduxjs/toolkit";
import { DisplayUser } from "../../../interface/allInterface";

//
const storedUser: string | null =
  typeof window !== "undefined" ? localStorage.getItem("user") : null;
const user: DisplayUser | null = !!storedUser ? JSON.parse(storedUser) : null;

interface AsyncState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  isInfo: any;
}

interface AuthState extends AsyncState {
  user?: DisplayUser | null;
  isAuthenticated?: boolean;
}

const initialState: AuthState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  isInfo: "",
  user: user,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    pending: (state) => {
      state.isLoading = true;
    },

    registerSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    registerFail: (state, action) => {
      state.isLoading = false;
      state.isInfo = action.payload.message;
      state.isError = action.payload.error;
    },
    loginFail: (state, action) => {
      state.isLoading = false;
      state.isInfo = action.payload.message;
      state.isError = action.payload.error;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = JSON.parse(localStorage.getItem("user") || "{}");
    },
  },
});
export const {
  pending,
  registerFail,
  registerSuccess,
  loginSuccess,
  loginFail,
} = authSlice.actions;
export default authSlice.reducer;
