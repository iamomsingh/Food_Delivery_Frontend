import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getDeliveryOrders,
  getDeliveryOrderDetails,
  pickupDeliveryOrder,
  markOrderOutForDelivery,
  deliverDeliveryOrder,
} from "../../services/api/deliveryApi";

const initialState = {
  orders: [],
  selectedOrder: null,

  ordersLoading: false,
  orderDetailsLoading: false,
  actionLoading: false,

  ordersError: null,
  orderDetailsError: null,
  actionError: null,
};

export const fetchDeliveryOrders = createAsyncThunk(
  "deliveryOrder/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      return await getDeliveryOrders();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch assigned orders",
      );
    }
  },
);

export const fetchDeliveryOrderDetails = createAsyncThunk(
  "deliveryOrder/fetchOrderDetails",
  async (orderId, { rejectWithValue }) => {
    try {
      return await getDeliveryOrderDetails(orderId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch order details",
      );
    }
  },
);

export const pickupOrder = createAsyncThunk(
  "deliveryOrder/pickupOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      return await pickupDeliveryOrder(orderId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to pickup order",
      );
    }
  },
);

export const outForDelivery = createAsyncThunk(
  "deliveryOrder/outForDelivery",
  async (orderId, { rejectWithValue }) => {
    try {
      return await markOrderOutForDelivery(orderId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update order",
      );
    }
  },
);

export const deliverOrder = createAsyncThunk(
  "deliveryOrder/deliverOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      return await deliverDeliveryOrder(orderId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to deliver order",
      );
    }
  },
);

const deliveryOrderSlice = createSlice({
  name: "deliveryOrder",

  initialState,

  reducers: {
    clearSelectedDeliveryOrder(state) {
      state.selectedOrder = null;
    },

    clearDeliveryOrderErrors(state) {
      state.ordersError = null;
      state.orderDetailsError = null;
      state.actionError = null;
    },
  },

  extraReducers: (builder) => {
    // Orders
    builder
      .addCase(fetchDeliveryOrders.pending, (state) => {
        state.ordersLoading = true;
        state.ordersError = null;
      })

      .addCase(fetchDeliveryOrders.fulfilled, (state, action) => {
        state.ordersLoading = false;
        state.orders = action.payload;
      })

      .addCase(fetchDeliveryOrders.rejected, (state, action) => {
        state.ordersLoading = false;
        state.ordersError = action.payload;
      });

    // Order details
    builder
      .addCase(fetchDeliveryOrderDetails.pending, (state) => {
        state.orderDetailsLoading = true;
        state.orderDetailsError = null;
      })

      .addCase(fetchDeliveryOrderDetails.fulfilled, (state, action) => {
        state.orderDetailsLoading = false;
        state.selectedOrder = action.payload;
      })

      .addCase(fetchDeliveryOrderDetails.rejected, (state, action) => {
        state.orderDetailsLoading = false;
        state.orderDetailsError = action.payload;
      });

    // Pickup
    builder
      .addCase(pickupOrder.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })

      .addCase(pickupOrder.fulfilled, (state) => {
        state.actionLoading = false;
      })

      .addCase(pickupOrder.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      });

    // Out for delivery
    builder
      .addCase(outForDelivery.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })

      .addCase(outForDelivery.fulfilled, (state) => {
        state.actionLoading = false;
      })

      .addCase(outForDelivery.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      });

    // Deliver
    builder
      .addCase(deliverOrder.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })

      .addCase(deliverOrder.fulfilled, (state) => {
        state.actionLoading = false;
      })

      .addCase(deliverOrder.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      });
  },
});

export const { clearSelectedDeliveryOrder, clearDeliveryOrderErrors } =
  deliveryOrderSlice.actions;

export default deliveryOrderSlice.reducer;
