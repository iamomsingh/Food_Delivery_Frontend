import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  createReview,
  getRestaurantReviews,
  // getDeliveryPartnerReviews,
  updateReview,
  deleteReview,
  getOrderReview,
  getMyDeliveryReviews,
} from "../../services/api/reviewApi";

const initialState = {
  orderReview: null,
  orderReviewLoading: false,
  orderReviewError: null,

  restaurantReviews: [],
  restaurantReviewsPagination: null,
  restaurantReviewsLoading: false,
  restaurantReviewsError: null,

  myDeliveryReviews: [],
  myDeliveryReviewsPagination: null,
  myDeliveryReviewsLoading: false,
  myDeliveryReviewsError: null,

  creating: false,
  createError: null,
  createdReview: null,

  updating: false,
  updateError: null,
  updatedReview: null,

  deleting: false,
  deleteError: null,
  deleteSuccess: false,
};

export const fetchOrderReview = createAsyncThunk(
  "review/fetchOrderReview",
  async (orderId, { rejectWithValue }) => {
    try {
      return await getOrderReview(orderId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch order review",
      );
    }
  },
);

export const fetchRestaurantReviews = createAsyncThunk(
  "review/fetchRestaurantReviews",

  async ({ restaurantId, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const data = await getRestaurantReviews(restaurantId, {
        page,
        limit,
      });

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch restaurant reviews",
      );
    }
  },
);

export const fetchMyDeliveryReviews = createAsyncThunk(
  "review/fetchMyDeliveryReviews",
  async ({ deliveryPartnerId, page = 1, limit = 5 }, { rejectWithValue }) => {
    try {
      return await getMyDeliveryReviews(deliveryPartnerId, {
        page,
        limit,
      });
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch customer feedback",
      );
    }
  },
);

export const submitReview = createAsyncThunk(
  "review/submitReview",

  async ({ orderId, reviewData }, { rejectWithValue }) => {
    try {
      const data = await createReview(orderId, reviewData);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to submit review",
      );
    }
  },
);

export const editReview = createAsyncThunk(
  "review/editReview",

  async ({ reviewId, reviewData }, { rejectWithValue }) => {
    try {
      const data = await updateReview(reviewId, reviewData);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update review",
      );
    }
  },
);

export const removeReview = createAsyncThunk(
  "review/removeReview",

  async (reviewId, { rejectWithValue }) => {
    try {
      await deleteReview(reviewId);

      return reviewId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete review",
      );
    }
  },
);

const reviewSlice = createSlice({
  name: "review",

  initialState,

  reducers: {
    clearCreateReviewError(state) {
      state.createError = null;
    },

    clearUpdateReviewError(state) {
      state.updateError = null;
    },

    clearDeleteReviewError(state) {
      state.deleteError = null;
    },

    clearReviewErrors(state) {
      state.createError = null;
      state.updateError = null;
      state.deleteError = null;
      state.restaurantReviewsError = null;
      state.deliveryPartnerReviewsError = null;
    },

    resetReviewActionState(state) {
      state.creating = false;
      state.createError = null;
      state.createdReview = null;

      state.updating = false;
      state.updateError = null;
      state.updatedReview = null;

      state.deleting = false;
      state.deleteError = null;
      state.deleteSuccess = false;
    },
  },

  extraReducers: (builder) => {
    // ==========================================
    // Order Review
    // ==========================================

    builder
      .addCase(fetchOrderReview.pending, (state) => {
        state.orderReviewLoading = true;
        state.orderReviewError = null;
        state.orderReview = null;
      })
      .addCase(fetchOrderReview.fulfilled, (state, action) => {
        state.orderReviewLoading = false;
        state.orderReview = action.payload;
      })
      .addCase(fetchOrderReview.rejected, (state, action) => {
        state.orderReviewLoading = false;
        state.orderReviewError = action.payload;
      });

    // ==========================================
    // Restaurant Reviews
    // ==========================================

    builder
      .addCase(fetchRestaurantReviews.pending, (state) => {
        state.restaurantReviewsLoading = true;
        state.restaurantReviewsError = null;
      })

      .addCase(fetchRestaurantReviews.fulfilled, (state, action) => {
        state.restaurantReviewsLoading = false;

        state.restaurantReviews = action.payload.reviews;

        state.restaurantReviewsPagination = action.payload.pagination;
      })

      .addCase(fetchRestaurantReviews.rejected, (state, action) => {
        state.restaurantReviewsLoading = false;

        state.restaurantReviewsError =
          action.payload || "Failed to fetch restaurant reviews";
      });

    // Deliver-Partner Reviews
    builder
      .addCase(fetchMyDeliveryReviews.pending, (state) => {
        state.myDeliveryReviewsLoading = true;
        state.myDeliveryReviewsError = null;
      })

      .addCase(fetchMyDeliveryReviews.fulfilled, (state, action) => {
        state.myDeliveryReviewsLoading = false;

        state.myDeliveryReviews = action.payload.reviews || [];

        state.myDeliveryReviewsPagination = action.payload.pagination || null;
      })

      .addCase(fetchMyDeliveryReviews.rejected, (state, action) => {
        state.myDeliveryReviewsLoading = false;
        state.myDeliveryReviewsError = action.payload;
      });

    // ==========================================
    // Create Review
    // ==========================================

    builder
      .addCase(submitReview.pending, (state) => {
        state.creating = true;
        state.createError = null;
        state.createdReview = null;
      })

      .addCase(submitReview.fulfilled, (state, action) => {
        state.creating = false;

        state.createdReview = action.payload;
      })

      .addCase(submitReview.rejected, (state, action) => {
        state.creating = false;

        state.createError = action.payload || "Failed to submit review";
      });

    // ==========================================
    // Update Review
    // ==========================================

    builder
      .addCase(editReview.pending, (state) => {
        state.updating = true;
        state.updateError = null;
        state.updatedReview = null;
      })

      .addCase(editReview.fulfilled, (state, action) => {
        state.updating = false;

        state.updatedReview = action.payload;
      })

      .addCase(editReview.rejected, (state, action) => {
        state.updating = false;

        state.updateError = action.payload || "Failed to update review";
      });

    // ==========================================
    // Delete Review
    // ==========================================

    builder
      .addCase(removeReview.pending, (state) => {
        state.deleting = true;
        state.deleteError = null;
        state.deleteSuccess = false;
      })

      .addCase(removeReview.fulfilled, (state) => {
        state.deleting = false;
        state.deleteSuccess = true;
      })

      .addCase(removeReview.rejected, (state, action) => {
        state.deleting = false;

        state.deleteError = action.payload || "Failed to delete review";
      });
  },
});

export const {
  clearCreateReviewError,
  clearUpdateReviewError,
  clearDeleteReviewError,
  clearReviewErrors,
  resetReviewActionState,
} = reviewSlice.actions;

export default reviewSlice.reducer;
