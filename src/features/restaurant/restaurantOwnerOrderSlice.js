import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  acceptRestaurantOrder,
  getRestaurantOrder,
  getRestaurantOrders,
  markRestaurantOrderPreparing,
  markRestaurantOrderReadyForPickup,
  rejectRestaurantOrder,
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

  actionLoadingOrderId: null,

  error: null,
  detailError: null,
  actionError: null,
  actionErrorOrderId: null,
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

export const acceptOrder = createAsyncThunk(
  "restaurantOwnerOrder/acceptOrder",
  async ({ restaurantId, orderId }, { rejectWithValue }) => {
    try {
      const data = await acceptRestaurantOrder(restaurantId, orderId);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to accept order",
      );
    }
  },
);

export const rejectOrder = createAsyncThunk(
  "restaurantOwnerOrder/rejectOrder",
  async ({ restaurantId, orderId }, { rejectWithValue }) => {
    try {
      const data = await rejectRestaurantOrder(restaurantId, orderId);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to reject order",
      );
    }
  },
);

export const markOrderPreparing = createAsyncThunk(
  "restaurantOwnerOrder/markOrderPreparing",
  async ({ restaurantId, orderId }, { rejectWithValue }) => {
    try {
      const data = await markRestaurantOrderPreparing(restaurantId, orderId);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to mark order as preparing",
      );
    }
  },
);

export const markOrderReadyForPickup = createAsyncThunk(
  "restaurantOwnerOrder/markOrderReadyForPickup",
  async ({ restaurantId, orderId }, { rejectWithValue }) => {
    try {
      const data = await markRestaurantOrderReadyForPickup(
        restaurantId,
        orderId,
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to mark order as ready for pickup",
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
      })

      .addCase(acceptOrder.pending, (state, action) => {
        state.actionLoadingOrderId = action.meta.arg.orderId;
        state.actionError = null;
        state.actionErrorOrderId = null;
      })

      .addCase(acceptOrder.fulfilled, (state, action) => {
        state.actionLoadingOrderId = null;
        state.actionError = null;
        state.actionErrorOrderId = null;

        if (state.selectedOrder?.order) {
          state.selectedOrder.order.status = action.payload.status;
        }

        const order = state.orders.find(
          (order) => order.id === action.payload.id,
        );

        if (order) {
          order.status = action.payload.status;
        }
      })

      .addCase(acceptOrder.rejected, (state, action) => {
        state.actionLoadingOrderId = null;
        state.actionError = action.payload;
        state.actionErrorOrderId = action.meta.arg.orderId;
      })

      .addCase(rejectOrder.pending, (state, action) => {
        state.actionLoadingOrderId = action.meta.arg.orderId;
        state.actionError = null;
        state.actionErrorOrderId = null;
      })

      .addCase(rejectOrder.fulfilled, (state, action) => {
        state.actionLoadingOrderId = null;
        state.actionError = null;
        state.actionErrorOrderId = null;

        if (state.selectedOrder?.order) {
          state.selectedOrder.order.status = action.payload.status;
        }

        const order = state.orders.find(
          (order) => order.id === action.payload.id,
        );

        if (order) {
          order.status = action.payload.status;
        }
      })

      .addCase(rejectOrder.rejected, (state, action) => {
        state.actionLoadingOrderId = null;
        state.actionError = action.payload;
        state.actionErrorOrderId = action.meta.arg.orderId;
      })

      .addCase(markOrderPreparing.pending, (state, action) => {
        state.actionLoadingOrderId = action.meta.arg.orderId;
        state.actionError = null;
        state.actionErrorOrderId = null;
      })

      .addCase(markOrderPreparing.fulfilled, (state, action) => {
        state.actionLoadingOrderId = null;
        state.actionError = null;
        state.actionErrorOrderId = null;

        if (state.selectedOrder?.order) {
          state.selectedOrder.order.status = action.payload.status;
        }

        const order = state.orders.find(
          (order) => order.id === action.payload.id,
        );

        if (order) {
          order.status = action.payload.status;
        }
      })

      .addCase(markOrderPreparing.rejected, (state, action) => {
        state.actionLoadingOrderId = null;
        state.actionError = action.payload;
        state.actionErrorOrderId = action.meta.arg.orderId;
      })

      .addCase(markOrderReadyForPickup.pending, (state, action) => {
        state.actionLoadingOrderId = action.meta.arg.orderId;
        state.actionError = null;
        state.actionErrorOrderId = null;
      })

      .addCase(markOrderReadyForPickup.fulfilled, (state, action) => {
        state.actionLoadingOrderId = null;
        state.actionError = null;
        state.actionErrorOrderId = null;

        if (state.selectedOrder?.order) {
          state.selectedOrder.order.status = action.payload.status;
        }

        const order = state.orders.find(
          (order) => order.id === action.payload.id,
        );

        if (order) {
          order.status = action.payload.status;
        }
      })

      .addCase(markOrderReadyForPickup.rejected, (state, action) => {
        state.actionLoadingOrderId = null;
        state.actionError = action.payload;
        state.actionErrorOrderId = action.meta.arg.orderId;
      });
  },
});

export const { clearRestaurantOrders, clearSelectedOrder } =
  restaurantOwnerOrderSlice.actions;

export default restaurantOwnerOrderSlice.reducer;
