import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getRestaurantOrder,
  getRestaurantOrders,
} from "../../services/api/restaurantOwnerOrderApi";

const initialState = {
  orders: [],
  selectedOrder: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
  loading: false,
  detailLoading: false,
  error: null,
  detailError: null,
};

export const fetchRestaurantOrders = createAsyncThunk(
  "restaurantOwnerOrder/fetchRestaurantOrders",
  async ({ restaurantId, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const data = await getRestaurantOrders(restaurantId, {
        page,
        limit,
      });

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch restaurant orders",
      );
    }
  },
);

export const fetchRestaurantOrder = createAsyncThunk(
  "restaurantOwnerOrder/fetchRestaurantOrder",
  async ({ restaurantId, orderId }, { rejectWithValue }) => {
    try {
      const data = await getRestaurantOrder(restaurantId, orderId);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch order",
      );
    }
  },
);

const restaurantOwnerOrderSlice = createSlice({
  name: "restaurantOwnerOrder",

  initialState,

  reducers: {
    clearRestaurantOrders: (state) => {
      state.orders = [];
      state.pagination = {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
      };
      state.error = null;
    },

    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
      state.detailError = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurantOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchRestaurantOrders.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = action.payload.orders;
        state.pagination = action.payload.pagination;
      })

      .addCase(fetchRestaurantOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchRestaurantOrder.pending, (state) => {
        state.detailLoading = true;
        state.detailError = null;
      })

      .addCase(fetchRestaurantOrder.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.selectedOrder = action.payload;
      })

      .addCase(fetchRestaurantOrder.rejected, (state, action) => {
        state.detailLoading = false;
        state.detailError = action.payload;
      });
  },
});

export const { clearRestaurantOrders, clearSelectedOrder } =
  restaurantOwnerOrderSlice.actions;

export default restaurantOwnerOrderSlice.reducer;
