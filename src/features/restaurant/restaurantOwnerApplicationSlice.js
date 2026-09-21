import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  applyAsRestaurantOwner,
  getRestaurantOwnerApplication,
} from "../../services/api/restaurantOwnerApplicationApi";

const initialState = {
  application: null,

  applicationLoading: false,
  applicationSubmitting: false,

  applicationError: null,
  applicationSubmitError: null,
};

export const fetchRestaurantOwnerApplication = createAsyncThunk(
  "restaurantOwnerApplication/fetchApplication",
  async (_, { rejectWithValue }) => {
    try {
      return await getRestaurantOwnerApplication();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch restaurant owner application.",
      );
    }
  },
);

export const applyRestaurantOwner = createAsyncThunk(
  "restaurantOwnerApplication/apply",
  async (data, { rejectWithValue }) => {
    try {
      return await applyAsRestaurantOwner(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to submit restaurant owner application.",
      );
    }
  },
);

const restaurantOwnerApplicationSlice = createSlice({
  name: "restaurantOwnerApplication",

  initialState,

  reducers: {
    clearApplicationError(state) {
      state.applicationError = null;
    },

    clearApplicationSubmitError(state) {
      state.applicationSubmitError = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Fetch application
      .addCase(fetchRestaurantOwnerApplication.pending, (state) => {
        state.applicationLoading = true;
        state.applicationError = null;
      })

      .addCase(fetchRestaurantOwnerApplication.fulfilled, (state, action) => {
        state.applicationLoading = false;
        state.application = action.payload;
      })

      .addCase(fetchRestaurantOwnerApplication.rejected, (state, action) => {
        state.applicationLoading = false;
        state.applicationError =
          action.payload || "Failed to fetch restaurant owner application.";
      })

      // Submit application
      .addCase(applyRestaurantOwner.pending, (state) => {
        state.applicationSubmitting = true;
        state.applicationSubmitError = null;
      })

      .addCase(applyRestaurantOwner.fulfilled, (state, action) => {
        state.applicationSubmitting = false;
        state.application = action.payload;
      })

      .addCase(applyRestaurantOwner.rejected, (state, action) => {
        state.applicationSubmitting = false;
        state.applicationSubmitError =
          action.payload || "Failed to submit restaurant owner application.";
      });
  },
});

export const { clearApplicationError, clearApplicationSubmitError } =
  restaurantOwnerApplicationSlice.actions;

export default restaurantOwnerApplicationSlice.reducer;
