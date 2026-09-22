import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  registerUser,
  loginUser,
  refreshAccessToken,
  getCurrentUser,
  logoutUser,
} from "../../services/api/authApi";
import {
  changeUserPassword,
  getUserProfile,
  updateUserProfile,
} from "../../services/api/userApi";

const initialState = {
  user: null,
  accessToken: null,

  activeRole: null,

  loading: false,
  error: null,

  isAuthenticated: false,
  authInitialized: false,

  // Profile
  profileLoading: false,
  profileError: null,
  profileUpdating: false,
  profileUpdateError: null,

  // Password
  passwordChanging: false,
  passwordChangeError: null,
  passwordChangeSuccess: false,
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

export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getUserProfile();

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile",
      );
    }
  },
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const data = await updateUserProfile(profileData);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile",
      );
    }
  },
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (passwordData, { rejectWithValue }) => {
    try {
      const data = await changeUserPassword(passwordData);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to change password",
      );
    }
  },
);

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

      state.profileLoading = false;
      state.profileError = null;
      state.profileUpdating = false;
      state.profileUpdateError = null;

      state.passwordChanging = false;
      state.passwordChangeError = null;
      state.passwordChangeSuccess = false;
    });

    // Fetch profile
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.profileLoading = true;
        state.profileError = null;
      })

      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profileLoading = false;

        state.user = action.payload;
      })

      .addCase(fetchProfile.rejected, (state, action) => {
        state.profileLoading = false;

        state.profileError = action.payload || "Failed to fetch profile";
      });

    // Update profile
    builder
      .addCase(updateProfile.pending, (state) => {
        state.profileUpdating = true;
        state.profileUpdateError = null;
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profileUpdating = false;

        state.user = action.payload;
      })

      .addCase(updateProfile.rejected, (state, action) => {
        state.profileUpdating = false;

        state.profileUpdateError = action.payload || "Failed to update profile";
      });

    // Change password
    builder
      .addCase(changePassword.pending, (state) => {
        state.passwordChanging = true;
        state.passwordChangeError = null;
        state.passwordChangeSuccess = false;
      })

      .addCase(changePassword.fulfilled, (state) => {
        state.passwordChanging = false;
        state.passwordChangeSuccess = true;
      })

      .addCase(changePassword.rejected, (state, action) => {
        state.passwordChanging = false;

        state.passwordChangeError =
          action.payload || "Failed to change password";
      });
  },
});

export const { clearAuth, setAccessToken, setAuthInitialized, setActiveRole } =
  authSlice.actions;

export default authSlice.reducer;
