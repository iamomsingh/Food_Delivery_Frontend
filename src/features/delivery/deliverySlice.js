import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  applyAsDeliveryPartner,
  getDeliveryProfile,
  getDeliveryStats,
  updateDeliveryOnlineStatus,
} from "../../services/api/deliveryApi";

const initialState = {
  profile: null,
  stats: null,

  profileLoading: false,
  statsLoading: false,
  statusUpdating: false,
  applicationSubmitting: false,

  profileError: null,
  statsError: null,
  statusError: null,
  applicationError: null,
};

export const fetchDeliveryProfile = createAsyncThunk(
  "delivery/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      return await getDeliveryProfile();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch delivery profile",
      );
    }
  },
);

export const fetchDeliveryStats = createAsyncThunk(
  "delivery/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      return await getDeliveryStats();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch delivery statistics",
      );
    }
  },
);

export const updateDeliveryStatus = createAsyncThunk(
  "delivery/updateStatus",
  async (isOnline, { rejectWithValue }) => {
    try {
      return await updateDeliveryOnlineStatus(isOnline);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update online status",
      );
    }
  },
);

export const applyDeliveryPartner = createAsyncThunk(
  "delivery/apply",
  async (data, { rejectWithValue }) => {
    try {
      return await applyAsDeliveryPartner(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to submit application",
      );
    }
  },
);

const deliverySlice = createSlice({
  name: "delivery",

  initialState,

  reducers: {
    clearDeliveryErrors(state) {
      state.profileError = null;
      state.statsError = null;
      state.statusError = null;
      state.applicationError = null;
    },
  },

  extraReducers: (builder) => {
    // Profile
    builder
      .addCase(fetchDeliveryProfile.pending, (state) => {
        state.profileLoading = true;
        state.profileError = null;
      })

      .addCase(fetchDeliveryProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.profile = action.payload;
      })

      .addCase(fetchDeliveryProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileError = action.payload;
      });

    // Stats
    builder
      .addCase(fetchDeliveryStats.pending, (state) => {
        state.statsLoading = true;
        state.statsError = null;
      })

      .addCase(fetchDeliveryStats.fulfilled, (state, action) => {
        state.statsLoading = false;
        state.stats = action.payload;
      })

      .addCase(fetchDeliveryStats.rejected, (state, action) => {
        state.statsLoading = false;
        state.statsError = action.payload;
      });

    // Online/offline
    builder
      .addCase(updateDeliveryStatus.pending, (state) => {
        state.statusUpdating = true;
        state.statusError = null;
      })

      .addCase(updateDeliveryStatus.fulfilled, (state, action) => {
        state.statusUpdating = false;

        if (state.profile) {
          state.profile.isOnline = action.payload.isOnline;
          state.profile.isAvailable = action.payload.isAvailable;
        }

        if (state.stats) {
          state.stats.isOnline = action.payload.isOnline;
          state.stats.isAvailable = action.payload.isAvailable;
        }
      })

      .addCase(updateDeliveryStatus.rejected, (state, action) => {
        state.statusUpdating = false;
        state.statusError = action.payload;
      });

    // Application
    builder
      .addCase(applyDeliveryPartner.pending, (state) => {
        state.applicationSubmitting = true;
        state.applicationError = null;
      })

      .addCase(applyDeliveryPartner.fulfilled, (state, action) => {
        state.applicationSubmitting = false;
        state.profile = action.payload;
      })

      .addCase(applyDeliveryPartner.rejected, (state, action) => {
        state.applicationSubmitting = false;
        state.applicationError = action.payload;
      });
  },
});

export const { clearDeliveryErrors } = deliverySlice.actions;

export default deliverySlice.reducer;
