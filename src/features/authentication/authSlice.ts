import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const initialState = {
  token: null,
  isAuthenticated: false,
  loading: false,
  user: null,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/login`,
        {
          email,
          password,
        }
      );
      const token = response.data.token;
      const decodedToken: any = jwt_decode(token);

      return { token, user: decodedToken };
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      // Return a general error message if no specific error is available
      return rejectWithValue({
        error: 'An error occurred while logging in. Please try again.',
      });
    }
  }
);

export const signUpUser = createAsyncThunk(
  'auth/signup',
  async (
    {
      name,
      email,
      password,
      password_confirm,
    }: {
      name: string;
      email: string;
      password: string;
      password_confirm: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/signup`,
        {
          name,
          email,
          password,
          password_confirm,
        }
      );
      const token = response.data.token;
      const decodedToken: any = jwt_decode(token);

      return { token, user: decodedToken };
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      // Return a general error message if no specific error is available
      return rejectWithValue({
        error: 'An error occurred while logging in. Please try again.',
      });
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    setAuthStatus: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { token, user } = action.payload;
        localStorage.setItem('token', token);
        state.token = token;
        state.user = user;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        const { token, user } = action.payload;
        localStorage.setItem('token', token);
        state.token = token;
        state.user = user;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(signUpUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { logout, setAuthStatus } = authSlice.actions;

export default authSlice.reducer;
