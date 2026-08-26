import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  placeOrder as placeOrderApi,
  getOrderById,
  getOrders,
  cancelOrder as cancelOrderApi,
} from "../../services/api/orderApi";

const initialState = {
  currentOrder: null,

  orders: [],
  pagination: null,

  placing: false,
  loading: false,
  ordersLoading: false,

  cancelling: false,
  cancellingOrderId: null,

  error: null,
};

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async ({ deliveryAddressId, paymentMethod = "COD" }, { rejectWithValue }) => {
    try {
      const data = await placeOrderApi(deliveryAddressId, paymentMethod);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to place order.",
      );
    }
  },
);

export const fetchOrderById = createAsyncThunk(
  "order/fetchOrderById",
  async (orderId, { rejectWithValue }) => {
    try {
      return await getOrderById(orderId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to load order.",
      );
    }
  },
);

export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",

  async ({ page = 1, limit = 10 } = {}, { rejectWithValue }) => {
    try {
      const data = await getOrders(page, limit);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to load orders.",
      );
    }
  },
);

export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",

  async (orderId, { rejectWithValue }) => {
    try {
      const data = await cancelOrderApi(orderId);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to cancel order.",
      );
    }
  },
);

const orderSlice = createSlice({
  name: "order",

  initialState,

  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.placing = true;
        state.error = null;
      })

      .addCase(placeOrder.fulfilled, (state, action) => {
        state.placing = false;
        state.error = null;
        state.currentOrder = action.payload;
      })

      .addCase(placeOrder.rejected, (state, action) => {
        state.placing = false;
        state.error = action.payload || "Unable to place order.";
      })

      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentOrder = null;
      })

      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.currentOrder = action.payload;
      })

      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unable to place order.";
      })

      .addCase(fetchOrders.pending, (state) => {
        state.ordersLoading = true;
        state.error = null;
      })

      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.ordersLoading = false;
        state.error = null;

        state.orders = action.payload.orders;
        state.pagination = action.payload.pagination;
      })

      .addCase(fetchOrders.rejected, (state, action) => {
        state.ordersLoading = false;

        state.error = action.payload || "Unable to load orders.";
      })

      .addCase(cancelOrder.pending, (state, action) => {
        state.cancelling = true;
        state.cancellingOrderId = action.meta.arg;
        state.error = null;
      })

      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.cancelling = false;
        state.cancellingOrderId = null;
        state.error = null;

        state.currentOrder = action.payload;

        state.orders = state.orders.map((order) =>
          order.id === action.payload.id
            ? {
                ...order,
                status: action.payload.status,
              }
            : order,
        );
      })

      .addCase(cancelOrder.rejected, (state, action) => {
        state.cancelling = false;
        state.cancellingOrderId = null;

        state.error = action.payload || "Unable to cancel order.";
      });
  },
});

export const { clearCurrentOrder } = orderSlice.actions;

export default orderSlice.reducer;
