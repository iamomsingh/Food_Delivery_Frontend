import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getAdminAnalytics,
  getAdminDashboard,
  getAdminRevenue,
} from "../../services/api/adminDashboardApi";

const initialState = {
  overview: {
    users: null,
    restaurants: null,
    deliveryPartners: null,
    orders: null,
  },

  revenue: null,

  analytics: null,

  overviewLoading: false,
  revenueLoading: false,
  analyticsLoading: false,

  overviewError: null,
  revenueError: null,
  analyticsError: null,
};

export const fetchAdminDashboard = createAsyncThunk(
  "adminDashboard/fetchDashboard",
  async (_, { rejectWithValue }) => {
    try {
      return await getAdminDashboard();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch dashboard data",
      );
    }
  },
);

export const fetchAdminRevenue = createAsyncThunk(
  "adminDashboard/fetchRevenue",
  async (_, { rejectWithValue }) => {
    try {
      return await getAdminRevenue();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch revenue",
      );
    }
  },
);

export const fetchAdminAnalytics = createAsyncThunk(
  "adminDashboard/fetchAnalytics",
  async (_, { rejectWithValue }) => {
    try {
      return await getAdminAnalytics();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch analytics",
      );
    }
  },
);

const adminDashboardSlice = createSlice({
  name: "adminDashboard",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    // ---------------------------------------------
    // Dashboard overview
    // ---------------------------------------------

    builder
      .addCase(fetchAdminDashboard.pending, (state) => {
        state.overviewLoading = true;
        state.overviewError = null;
      })

      .addCase(fetchAdminDashboard.fulfilled, (state, action) => {
        state.overviewLoading = false;
        state.overview = action.payload;
      })

      .addCase(fetchAdminDashboard.rejected, (state, action) => {
        state.overviewLoading = false;

        state.overviewError =
          action.payload || "Failed to fetch dashboard data";
      });

    // ---------------------------------------------
    // Revenue
    // ---------------------------------------------

    builder
      .addCase(fetchAdminRevenue.pending, (state) => {
        state.revenueLoading = true;
        state.revenueError = null;
      })

      .addCase(fetchAdminRevenue.fulfilled, (state, action) => {
        state.revenueLoading = false;
        state.revenue = action.payload;
      })

      .addCase(fetchAdminRevenue.rejected, (state, action) => {
        state.revenueLoading = false;

        state.revenueError = action.payload || "Failed to fetch revenue";
      });

    builder
      .addCase(fetchAdminAnalytics.pending, (state) => {
        state.analyticsLoading = true;
        state.analyticsError = null;
      })
      .addCase(fetchAdminAnalytics.fulfilled, (state, action) => {
        state.analyticsLoading = false;
        state.analytics = action.payload;
      })
      .addCase(fetchAdminAnalytics.rejected, (state, action) => {
        state.analyticsLoading = false;
        state.analyticsError = action.payload || "Failed to fetch analytics";
      });
  },
});

export default adminDashboardSlice.reducer;
