import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getRestaurantDetails,
  getRestaurants,
} from "../../services/api/restaurantApi";

const initialState = {
  restaurants: [],
  pagination: null,
  loading: false,
  error: null,

  restaurantDetails: null,
  detailsLoading: false,
  detailsError: null,
};

export const fetchRestaurants = createAsyncThunk(
  "restaurant/fetchRestaurants",
  async (params) => {
    const data = await getRestaurants(params);

    return data;
  },
);

export const fetchRestaurantDetails = createAsyncThunk(
  "restaurant/fetchRestaurantDetails",

  async (restaurantId) => {
    const data = await getRestaurantDetails(restaurantId);

    return data;
  },
);

const restaurantSlice = createSlice({
  name: "restaurant",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload.restaurants;
        state.pagination = action.payload.pagination;
      })

      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Restaurant details
      .addCase(fetchRestaurantDetails.pending, (state) => {
        state.detailsLoading = true;
        state.detailsError = null;
        state.restaurantDetails = null;
      })

      .addCase(fetchRestaurantDetails.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.restaurantDetails = action.payload;
      })

      .addCase(fetchRestaurantDetails.rejected, (state, action) => {
        state.detailsLoading = false;
        state.detailsError = action.error.message;
      });
  },
});

export default restaurantSlice.reducer;
