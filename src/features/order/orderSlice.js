import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { placeOrder as placeOrderApi } from "../../services/api/orderApi";

const initialState = {
  currentOrder: null,

  placing: false,
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
      });
  },
});

export const { clearCurrentOrder } = orderSlice.actions;

export default orderSlice.reducer;
