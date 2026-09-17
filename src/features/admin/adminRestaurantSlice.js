import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getAdminRestaurants,
  getAdminRestaurantDetails,
  approveAdminRestaurant,
  rejectAdminRestaurant,
} from "../../services/api/adminRestaurantApi";

const initialState = {
  restaurants: [],

  selectedRestaurant: null,

  pagination: {
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 0,
  },

  filters: {
    status: "",
  },

  loading: false,
  detailLoading: false,

  actionLoadingType: null,
  actionLoadingId: null,

  error: null,
  detailError: null,
  actionError: null,
};

// -----------------------------------------
// Fetch Restaurants
// -----------------------------------------

export const fetchAdminRestaurants = createAsyncThunk(
  "adminRestaurant/fetchAdminRestaurants",
  async ({ page = 1, limit = 10, status = "" } = {}, { rejectWithValue }) => {
    try {
      const params = {
        page,
        limit,
      };

      if (status) {
        params.status = status;
      }

      return await getAdminRestaurants(params);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch restaurants",
      );
    }
  },
);

// -----------------------------------------
// Fetch Restaurant Details
// -----------------------------------------

export const fetchAdminRestaurantDetails = createAsyncThunk(
  "adminRestaurant/fetchAdminRestaurantDetails",
  async (restaurantId, { rejectWithValue }) => {
    try {
      return await getAdminRestaurantDetails(restaurantId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch restaurant details",
      );
    }
  },
);

// -----------------------------------------
// Approve Restaurant
// -----------------------------------------

export const approveRestaurant = createAsyncThunk(
  "adminRestaurant/approveRestaurant",
  async (restaurantId, { rejectWithValue }) => {
    try {
      return await approveAdminRestaurant(restaurantId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to approve restaurant",
      );
    }
  },
);

// -----------------------------------------
// Reject Restaurant
// -----------------------------------------

export const rejectRestaurant = createAsyncThunk(
  "adminRestaurant/rejectRestaurant",
  async (restaurantId, { rejectWithValue }) => {
    try {
      return await rejectAdminRestaurant(restaurantId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to reject restaurant",
      );
    }
  },
);

const adminRestaurantSlice = createSlice({
  name: "adminRestaurant",

  initialState,

  reducers: {
    setRestaurantStatusFilter: (state, action) => {
      state.filters.status = action.payload;

      state.pagination.page = 1;
    },

    setRestaurantPage: (state, action) => {
      state.pagination.page = action.payload;
    },

    setRestaurantLimit: (state, action) => {
      state.pagination.limit = action.payload;

      state.pagination.page = 1;
    },

    clearSelectedRestaurant: (state) => {
      state.selectedRestaurant = null;
      state.detailError = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =====================================
      // FETCH RESTAURANTS
      // =====================================

      .addCase(fetchAdminRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAdminRestaurants.fulfilled, (state, action) => {
        state.loading = false;

        state.restaurants = action.payload.restaurants;

        state.pagination = action.payload.pagination;
      })

      .addCase(fetchAdminRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch restaurants";
      })

      // =====================================
      // FETCH DETAILS
      // =====================================

      .addCase(fetchAdminRestaurantDetails.pending, (state) => {
        state.detailLoading = true;
        state.detailError = null;
        state.selectedRestaurant = null;
      })

      .addCase(fetchAdminRestaurantDetails.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.selectedRestaurant = action.payload;
      })

      .addCase(fetchAdminRestaurantDetails.rejected, (state, action) => {
        state.detailLoading = false;
        state.detailError =
          action.payload || "Failed to fetch restaurant details";
      })

      // =====================================
      // APPROVE
      // =====================================

      .addCase(approveRestaurant.pending, (state, action) => {
        state.actionLoadingType = "APPROVE_RESTAURANT";
        state.actionLoadingId = action.meta.arg;
        state.actionError = null;
      })

      .addCase(approveRestaurant.fulfilled, (state, action) => {
        const updatedRestaurant = action.payload;

        const index = state.restaurants.findIndex(
          (restaurant) => restaurant.id === updatedRestaurant.id,
        );

        if (index !== -1) {
          state.restaurants[index] = updatedRestaurant;
        }

        if (state.selectedRestaurant?.id === updatedRestaurant.id) {
          state.selectedRestaurant = updatedRestaurant;
        }

        state.actionLoadingType = null;
        state.actionLoadingId = null;
        state.actionError = null;
      })

      .addCase(approveRestaurant.rejected, (state, action) => {
        state.actionLoadingType = null;
        state.actionLoadingId = null;
        state.actionError = action.payload || "Failed to approve restaurant";
      })

      // =====================================
      // REJECT
      // =====================================

      .addCase(rejectRestaurant.pending, (state, action) => {
        state.actionLoadingType = "REJECT_RESTAURANT";
        state.actionLoadingId = action.meta.arg;
        state.actionError = null;
      })

      .addCase(rejectRestaurant.fulfilled, (state, action) => {
        const updatedRestaurant = action.payload;

        const index = state.restaurants.findIndex(
          (restaurant) => restaurant.id === updatedRestaurant.id,
        );

        if (index !== -1) {
          state.restaurants[index] = updatedRestaurant;
        }

        if (state.selectedRestaurant?.id === updatedRestaurant.id) {
          state.selectedRestaurant = updatedRestaurant;
        }

        state.actionLoadingType = null;
        state.actionLoadingId = null;
        state.actionError = null;
      })

      .addCase(rejectRestaurant.rejected, (state, action) => {
        state.actionLoadingType = null;
        state.actionLoadingId = null;
        state.actionError = action.payload || "Failed to reject restaurant";
      });
  },
});

export const {
  setRestaurantStatusFilter,
  setRestaurantPage,
  setRestaurantLimit,
  clearSelectedRestaurant,
} = adminRestaurantSlice.actions;

export default adminRestaurantSlice.reducer;
