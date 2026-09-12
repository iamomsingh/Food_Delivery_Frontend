import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getAvailableDeliveryPartners } from "../../services/api/restaurantOwnerDeliveryPartnerApi";

const initialState = {
  partners: [],

  pagination: {
    page: 1,
    limit: 5,
    total: 0,
    totalPages: 0,
  },

  loading: false,
  error: null,
};

export const fetchAvailableDeliveryPartners = createAsyncThunk(
  "restaurantOwnerDeliveryPartner/fetchAvailableDeliveryPartners",
  async ({ page = 1, limit = 5 } = {}, { rejectWithValue }) => {
    try {
      const data = await getAvailableDeliveryPartners({
        page,
        limit,
      });

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch available delivery partners",
      );
    }
  },
);

const restaurantOwnerDeliveryPartnerSlice = createSlice({
  name: "restaurantOwnerDeliveryPartner",

  initialState,

  reducers: {
    clearDeliveryPartners: (state) => {
      state.partners = [];

      state.pagination = {
        page: 1,
        limit: 5,
        total: 0,
        totalPages: 0,
      };

      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableDeliveryPartners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAvailableDeliveryPartners.fulfilled, (state, action) => {
        state.loading = false;

        state.partners = action.payload.partners;
        state.pagination = action.payload.pagination;
      })

      .addCase(fetchAvailableDeliveryPartners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDeliveryPartners } =
  restaurantOwnerDeliveryPartnerSlice.actions;

export default restaurantOwnerDeliveryPartnerSlice.reducer;
