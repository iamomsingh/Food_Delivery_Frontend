import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  registerUser,
  loginUser,
  refreshAccessToken,
  getCurrentUser,
  logoutUser,
} from "../../services/api/authApi";

const initialState = {
  user: null,
  accessToken: null,

  activeRole: null,

  loading: false,
  error: null,

  isAuthenticated: false,
  authInitialized: false,
};

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await registerUser(userData);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "you have already a account.",
      );
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginUser(credentials);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed. please try again.",
      );
    }
  },
);

export const refresh = createAsyncThunk("auth/refresh", async () => {
  const data = await refreshAccessToken();

  return data;
});

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async () => {
    const data = await getCurrentUser();

    return data;
  },
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await logoutUser();
});

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    clearAuth(state) {
      state.user = null;
      state.accessToken = null;
      state.activeRole = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
    },

    setActiveRole(state, action) {
      state.activeRole = action.payload;
    },

    setAuthInitialized(state) {
      state.authInitialized = true;
      state.isAuthenticated = true;
    },
  },

  extraReducers: (builder) => {
    // Login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;

        const roles = action.payload.user.roles;

        state.activeRole = roles.includes("CUSTOMER") ? "CUSTOMER" : roles[0];
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed. Please try again.";
      });

    // Register
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "You have already a account.";
      });

    // Refresh
    builder
      .addCase(refresh.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(refresh.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
      })

      .addCase(refresh.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
      });

    // Current user
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    });

    // Logout
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.accessToken = null;
      state.activeRole = null;
      state.isAuthenticated = false;
      state.error = null;
    });
  },
});

export const { clearAuth, setAccessToken, setAuthInitialized, setActiveRole } =
  authSlice.actions;

export default authSlice.reducer;
