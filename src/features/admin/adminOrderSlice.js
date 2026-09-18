import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getAdminRecentOrders } from "../../services/api/adminDashboardApi";

const initialFilters = {
  status: "",
  paymentMethod: "",
  paymentStatus: "",
  restaurantId: "",
  minAmount: "",
  maxAmount: "",
  fromDate: "",
  toDate: "",
};

const initialState = {
  orders: [],

  pagination: {
    totalItems: 0,
    currentPage: 1,
    totalPages: 0,
    pageSize: 20,
  },

  filters: {
    ...initialFilters,
  },

  loading: false,
  error: null,
};

export const fetchAdminOrders = createAsyncThunk(
  "adminOrder/fetchOrders",
  async ({ page = 1, limit = 20, filters = {} } = {}, { rejectWithValue }) => {
    try {
      return await getAdminRecentOrders({
        page,
        limit,

        ...filters,
      });
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders",
      );
    }
  },
);

const adminOrderSlice = createSlice({
  name: "adminOrder",

  initialState,

  reducers: {
    setOrderFilter: (state, action) => {
      const { name, value } = action.payload;

      state.filters[name] = value;

      // Whenever a filter changes,
      // go back to page 1.
      state.pagination.currentPage = 1;
    },

    resetOrderFilters: (state) => {
      state.filters = {
        ...initialFilters,
      };

      state.pagination.currentPage = 1;
    },

    setOrderPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },

    setOrderPageSize: (state, action) => {
      state.pagination.pageSize = action.payload;

      state.pagination.currentPage = 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAdminOrders.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = action.payload.orders;

        state.pagination = action.payload.pagination;
      })

      .addCase(fetchAdminOrders.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to fetch orders";
      });
  },
});

export const {
  setOrderFilter,
  resetOrderFilters,
  setOrderPage,
  setOrderPageSize,
} = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
