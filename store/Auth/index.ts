import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import axios from "axios";
import { RootState } from "..";
import { showMessage } from "../Message";
import API from "../../config/Api";
import cookie from "js-cookie";
interface AuthState {
  isAuthenticated: boolean;
  user: {
    _id: string;
    username: string;
    email: string;
  } | null;
  registrationError: string | null;
}
interface RegisterData {
  username: string;
  email: string;
  password: string;
}
interface ErrorResponse {
  message: string;
}
interface LoginData {
  username: string;
  password: string;
}

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ username, email, password }: RegisterData, { dispatch }) => {
    try {
      const response = await axios.post(API.USER_REGISTER, {
        username,
        email,
        password,
      });
      dispatch(
        showMessage({
          message: "User registered successfully",
          variant: "success",
        })
      );
      return response.data;
    } catch (error) {
      const errorMessage: ErrorResponse = error.response.data;
      dispatch(
        showMessage({ message: errorMessage.message, variant: "error" })
      );
      // return Promise.reject(error);
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }: LoginData, { dispatch }) => {
    try {
      const response = await axios.post(API.USER_LOGIN, {
        username,
        password,
      });
      dispatch(
        showMessage({
          message: "User logged in successfully",
          variant: "success",
        })
      );
      return response.data?.data;
    } catch (error) {
      const errorMessage: ErrorResponse = error.response.data;
      dispatch(
        showMessage({ message: errorMessage.message, variant: "error" })
      );
      return errorMessage;
    }
  }
);

export const fetchUserDetail = createAsyncThunk(
  "auth/fetchUserDetail",
  async (_, { dispatch }): Promise<{ isUserValid: boolean }> => {
    try {
      const token = cookie.get("token");
      const response = await axios.get(API.USER_PROFILE, {
        headers: {
          token: token,
        },
      });
      if (!response.data.success) {
        return { isUserValid: false };
      }

      dispatch(login(response.data?.data));
      return { isUserValid: true };
    } catch (error) {
      const errorMessage: ErrorResponse = error.response.data;
      dispatch(
        showMessage({ message: errorMessage.message, variant: "error" })
      );
      return { isUserValid: false };
    }
  }
);

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  registrationError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(
      state,
      action: PayloadAction<{ username: string; email: string; _id: string }>
    ) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      cookie.remove("token");
    },
  },

  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const token = action.payload.token;
      state.isAuthenticated = true;
      delete action.payload.token;
      cookie.set("token", token);
      state.user = action.payload?.user;
    });

    // builder.addCase(fetchUserDetail.fulfilled, (state, action) => {
    //   state.user = action.payload?.user;
    // });
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
