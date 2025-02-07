import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { Base_url } from "./constant";
import { SignupFormData } from "../sections/auth/singup-view";
import { LoginFormData } from "../sections/auth/login-view";
import { ForgetPassData } from "../sections/auth/forget-view";
import { FormData } from "../sections/auth/opt-view";

// API URLs
const signupUrl = `${Base_url}/users/signup`;
const loginUrl = `${Base_url}/users/login`;
const updateUrl = `${Base_url}/users/updateUserInformation`;
const logoutUrl = `${Base_url}/users/logout`;
const userSessionUrl = `${Base_url}/users/persistUserSession`;
const forgetPassUrl = `${Base_url}/users/sendResetPasswordOTP`;
const verifyOtpPassUrl = `${Base_url}/users/verifyOtp`;
const resetPassUrl = `${Base_url}/users/updatePassword`;

// Interfaces
interface User {
  login: boolean;
  user: {
    name: string;
    email: string;
    phone: string;
    address: string;
    id: string;
  };
}

// CREATE ASYNC THUNK
export const createuserAsync = createAsyncThunk(
  "user/create",
  async (formData: SignupFormData) => {
    try {
      const response = await axios.post(signupUrl, formData);
      toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  }
);

// LOGIN ASYNC THUNK
export const loginuserAsync = createAsyncThunk(
  "user/login",
  async (formData: LoginFormData) => {
    try {
      const response = await axios.post(loginUrl, formData);
      toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  }
);

// UPDATE ASYNC THUNK
export const updateuserAsync = createAsyncThunk(
  "user/update",
  async (formData: any) => {
    try {
      const response = await axios.post(updateUrl, formData);
      // toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  }
);

// LOGIN ASYNC THUNK
export const userSessionAsync = createAsyncThunk("user/session", async () => {
  try {
    const response = await axios.get(userSessionUrl);
    // console.log("response", response);
    return response.data;
  } catch (error: any) {
    throw error;
  }
});

// Logout Function
export const logoutUserAsync = createAsyncThunk("user/logout", async () => {
  try {
    const response = await axios.delete(logoutUrl);
    toast.success(response.data.message);
    return response.data;
  } catch (error: any) {
    throw error;
  }
});

// FORGET ASYNC THUNK
export const forgetuserAsync = createAsyncThunk(
  "user/forget",
  async (formData: ForgetPassData) => {
    try {
      const response = await axios.post(forgetPassUrl, formData);
      // toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  }
);

// VERIFY ASYNC THUNK
export const verifyOtpAsync = createAsyncThunk(
  "user/verify",
  async (formData: FormData) => {
    try {
      const response = await axios.post<User>(verifyOtpPassUrl, formData);
      // toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.error);
      throw error.response.data.error;
    }
  }
);

// RESET ASYNC THUNK
export const resetPassAsync = createAsyncThunk(
  "user/reset",
  async (resetPasswordData: any) => {
    const { id, resetPassword } = resetPasswordData;
    try {
      const response = await axios.post<any>(resetPassUrl, {
        id,
        resetPassword,
      });
      toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      throw error.response.data.error;
    }
  }
);

// INITIAL STATE
interface AuthState {
  user: User | null;
  loading: boolean;
  signupLoading: boolean;
  loginLoading: boolean;
  forgetLoading: boolean;
  updateLoading: boolean;
  forgetPasswordEmail: string | null;
  resetPassword: string | null;
  validateToken: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  signupLoading: false,
  loginLoading: false,
  forgetLoading: false,
  updateLoading: false,
  forgetPasswordEmail: null,
  resetPassword: null,
  validateToken: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // SIGN UP ADD CASE
      .addCase(createuserAsync.pending, (state) => {
        state.signupLoading = true;
      })
      .addCase(createuserAsync.fulfilled, (state, _action) => {
        state.signupLoading = false;
      })

      // UPDATE CASE
      .addCase(updateuserAsync.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateuserAsync.fulfilled, (state, _action) => {
        state.updateLoading = false;
      })

      // LOGIN ADD CASE
      .addCase(loginuserAsync.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(loginuserAsync.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.user = action.payload;
      })

      // Session ADD CASE
      .addCase(userSessionAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(userSessionAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })

      // FORGET PASSWORD ADD CASE
      .addCase(forgetuserAsync.pending, (state) => {
        state.forgetLoading = true;
      })
      .addCase(forgetuserAsync.fulfilled, (state) => {
        state.forgetLoading = false;
      })
      .addCase(forgetuserAsync.rejected, (state) => {
        state.forgetLoading = false;
      })

      // logout
      .addCase(logoutUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUserAsync.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
