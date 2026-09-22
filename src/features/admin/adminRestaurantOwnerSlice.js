import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getRestaurantOwnerApplications,
  getRestaurantOwnerApplication,
  approveRestaurantOwner,
  rejectRestaurantOwner,
} from "../../services/api/adminRestaurantOwnerApi";

const initialState = {
  applications: [],
  selectedApplication: null,

  loading: false,
  detailsLoading: false,
  actionLoading: false,

  error: null,
  detailsError: null,
  actionError: null,
};

export const fetchRestaurantOwnerApplications = createAsyncThunk(
  "adminRestaurantOwner/fetchApplications",
  async (_, { rejectWithValue }) => {
    try {
      return await getRestaurantOwnerApplications();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch restaurant owner applications.",
      );
    }
  },
);

export const fetchRestaurantOwnerApplication = createAsyncThunk(
  "adminRestaurantOwner/fetchApplication",
  async (applicationId, { rejectWithValue }) => {
    try {
      return await getRestaurantOwnerApplication(applicationId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch restaurant owner application.",
      );
    }
  },
);

export const approveRestaurantOwnerApplication = createAsyncThunk(
  "adminRestaurantOwner/approveApplication",
  async (applicationId, { rejectWithValue }) => {
    try {
      return await approveRestaurantOwner(applicationId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to approve restaurant owner application.",
      );
    }
  },
);

export const rejectRestaurantOwnerApplication = createAsyncThunk(
  "adminRestaurantOwner/rejectApplication",
  async ({ applicationId, rejectionReason }, { rejectWithValue }) => {
    try {
      return await rejectRestaurantOwner(applicationId, rejectionReason);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to reject restaurant owner application.",
      );
    }
  },
);

const adminRestaurantOwnerSlice = createSlice({
  name: "adminRestaurantOwner",

  initialState,

  reducers: {
    clearError(state) {
      state.error = null;
    },

    clearDetailsError(state) {
      state.detailsError = null;
    },

    clearActionError(state) {
      state.actionError = null;
    },

    clearSelectedApplication(state) {
      state.selectedApplication = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // --------------------------------
      // Fetch applications
      // --------------------------------
      .addCase(fetchRestaurantOwnerApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchRestaurantOwnerApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload;
      })

      .addCase(fetchRestaurantOwnerApplications.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to fetch restaurant owner applications.";
      })

      // --------------------------------
      // Fetch application details
      // --------------------------------
      .addCase(fetchRestaurantOwnerApplication.pending, (state) => {
        state.detailsLoading = true;
        state.detailsError = null;
      })

      .addCase(fetchRestaurantOwnerApplication.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.selectedApplication = action.payload;
      })

      .addCase(fetchRestaurantOwnerApplication.rejected, (state, action) => {
        state.detailsLoading = false;
        state.detailsError =
          action.payload || "Failed to fetch restaurant owner application.";
      })

      // --------------------------------
      // Approve
      // --------------------------------
      .addCase(approveRestaurantOwnerApplication.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })

      .addCase(approveRestaurantOwnerApplication.fulfilled, (state, action) => {
        state.actionLoading = false;

        const updatedApplication = action.payload;

        state.selectedApplication = updatedApplication;

        state.applications = state.applications.map((application) =>
          application.id === updatedApplication.id
            ? updatedApplication
            : application,
        );
      })

      .addCase(approveRestaurantOwnerApplication.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError =
          action.payload || "Failed to approve restaurant owner application.";
      })

      // --------------------------------
      // Reject
      // --------------------------------
      .addCase(rejectRestaurantOwnerApplication.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })

      .addCase(rejectRestaurantOwnerApplication.fulfilled, (state, action) => {
        state.actionLoading = false;

        const updatedApplication = action.payload;

        state.selectedApplication = updatedApplication;

        state.applications = state.applications.map((application) =>
          application.id === updatedApplication.id
            ? updatedApplication
            : application,
        );
      })

      .addCase(rejectRestaurantOwnerApplication.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError =
          action.payload || "Failed to reject restaurant owner application.";
      });
  },
});

export const {
  clearError,
  clearDetailsError,
  clearActionError,
  clearSelectedApplication,
} = adminRestaurantOwnerSlice.actions;

export default adminRestaurantOwnerSlice.reducer;
