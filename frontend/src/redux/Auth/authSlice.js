import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login as loginService, register as registerService } from '../Auth/authService';

const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

const token = localStorage.getItem('token');

const initialState = {
  isAuthenticated: !!token,
  user: token ? decodeToken(token) : null,
  status: 'idle',
  error: null
};

export const loginAsync = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await loginService(email, password);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const registerAsync = createAsyncThunk(
  'auth/register',
  async ({ fullName, email, password }, thunkAPI) => {
    try {
      const response = await registerService(fullName, email, password);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('token');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.user = decodeToken(action.payload.token);
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(registerAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.user = decodeToken(action.payload.token);
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
