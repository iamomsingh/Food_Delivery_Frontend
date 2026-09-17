import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getAdminDeliveryPartners,
  getAdminDeliveryPartnerDetails,
  approveAdminDeliveryPartner,
  rejectAdminDeliveryPartner,
  suspendAdminDeliveryPartner,
  unsuspendAdminDeliveryPartner,
} from "../../services/api/adminDeliveryPartnerApi";

const initialState = {
  applications: [],

  selectedPartner: null,

  pagination: {
    page: 1,
    limit: 10,
    total: 0,
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

// Get Delivery Partner Applications

export const fetchAdminDeliveryPartners = createAsyncThunk(
  "adminDeliveryPartner/fetchAdminDeliveryPartners",
  async ({ page = 1, limit = 10, status = "" } = {}, { rejectWithValue }) => {
    try {
      const params = {
        page,
        limit,
      };

      if (status) {
        params.status = status;
      }

      return await getAdminDeliveryPartners(params);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch delivery partners",
      );
    }
  },
);

// Get Delivery Partner Details

export const fetchAdminDeliveryPartnerDetails = createAsyncThunk(
  "adminDeliveryPartner/fetchAdminDeliveryPartnerDetails",
  async (partnerId, { rejectWithValue }) => {
    try {
      return await getAdminDeliveryPartnerDetails(partnerId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch delivery partner details",
      );
    }
  },
);

// Approve Delivery Partner

export const approveDeliveryPartner = createAsyncThunk(
  "adminDeliveryPartner/approveAdminDeliveryPartner",
  async (partnerId, { rejectWithValue }) => {
    try {
      return await approveAdminDeliveryPartner(partnerId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to approve delivery partner",
      );
    }
  },
);

// Reject Delivery Partner

export const rejectDeliveryPartner = createAsyncThunk(
  "adminDeliveryPartner/rejectAdminDeliveryPartner",
  async (partnerId, { rejectWithValue }) => {
    try {
      return await rejectAdminDeliveryPartner(partnerId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to reject delivery partner",
      );
    }
  },
);

// Suspend Delivery Partner

export const suspendDeliveryPartner = createAsyncThunk(
  "adminDeliveryPartner/suspendAdminDeliveryPartner",
  async (partnerId, { rejectWithValue }) => {
    try {
      return await suspendAdminDeliveryPartner(partnerId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to suspend delivery partner",
      );
    }
  },
);

// Unsuspend Delivery Partner

export const unsuspendDeliveryPartner = createAsyncThunk(
  "adminDeliveryPartner/unsuspendAdminDeliveryPartner",
  async (partnerId, { rejectWithValue }) => {
    try {
      return await unsuspendAdminDeliveryPartner(partnerId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to unsuspend delivery partner",
      );
    }
  },
);

// Slice

const adminDeliveryPartnerSlice = createSlice({
  name: "adminDeliveryPartner",

  initialState,

  reducers: {
    setDeliveryPartnerStatusFilter: (state, action) => {
      state.filters.status = action.payload;

      state.pagination.page = 1;
    },

    setDeliveryPartnerPage: (state, action) => {
      state.pagination.page = action.payload;
    },

    setDeliveryPartnerLimit: (state, action) => {
      state.pagination.limit = action.payload;

      state.pagination.page = 1;
    },

    clearSelectedDeliveryPartner: (state) => {
      state.selectedPartner = null;
      state.detailError = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchAdminDeliveryPartners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAdminDeliveryPartners.fulfilled, (state, action) => {
        state.loading = false;

        state.applications = action.payload.applications;

        state.pagination = action.payload.pagination;
      })

      .addCase(fetchAdminDeliveryPartners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch delivery partners";
      })

      .addCase(fetchAdminDeliveryPartnerDetails.pending, (state) => {
        state.detailLoading = true;
        state.detailError = null;

        state.selectedPartner = null;
      })

      .addCase(fetchAdminDeliveryPartnerDetails.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.selectedPartner = action.payload;
      })

      .addCase(fetchAdminDeliveryPartnerDetails.rejected, (state, action) => {
        state.detailLoading = false;
        state.detailError =
          action.payload || "Failed to fetch delivery partner details";
      })

      .addCase(approveDeliveryPartner.pending, (state, action) => {
        state.actionLoadingType = "APPROVE_DELIVERY_PARTNER";
        state.actionLoadingId = action.meta.arg;
        state.actionError = null;
      })

      .addCase(approveDeliveryPartner.fulfilled, (state, action) => {
        state.actionLoadingType = null;
        state.actionLoadingId = null;
        state.actionError = null;

        const index = state.applications.findIndex(
          (partner) => partner.id === action.payload.id,
        );

        if (index !== -1) {
          state.applications[index] = {
            ...state.applications[index],
            ...action.payload,
          };
        }

        if (state.selectedPartner?.id === action.payload.id) {
          state.selectedPartner = {
            ...state.selectedPartner,
            ...action.payload,
          };
        }
      })

      .addCase(approveDeliveryPartner.rejected, (state, action) => {
        state.actionLoadingType = null;
        state.actionLoadingId = null;
        state.actionError =
          action.payload || "Failed to approve delivery partner";
      })

      .addCase(rejectDeliveryPartner.pending, (state, action) => {
        state.actionLoadingType = "REJECT_DELIVERY_PARTNER";
        state.actionLoadingId = action.meta.arg;
        state.actionError = null;
      })

      .addCase(rejectDeliveryPartner.fulfilled, (state, action) => {
        state.actionLoadingType = null;
        state.actionLoadingId = null;
        state.actionError = null;

        const index = state.applications.findIndex(
          (partner) => partner.id === action.payload.id,
        );

        if (index !== -1) {
          state.applications[index] = {
            ...state.applications[index],
            ...action.payload,
          };
        }

        if (state.selectedPartner?.id === action.payload.id) {
          state.selectedPartner = {
            ...state.selectedPartner,
            ...action.payload,
          };
        }
      })

      .addCase(rejectDeliveryPartner.rejected, (state, action) => {
        state.actionLoadingType = null;
        state.actionLoadingId = null;
        state.actionError =
          action.payload || "Failed to reject delivery partner";
      })

      .addCase(suspendDeliveryPartner.pending, (state, action) => {
        state.actionLoadingType = "SUSPEND_DELIVERY_PARTNER";
        state.actionLoadingId = action.meta.arg;
        state.actionError = null;
      })

      .addCase(suspendDeliveryPartner.fulfilled, (state, action) => {
        state.actionLoadingType = null;
        state.actionLoadingId = null;
        state.actionError = null;

        const index = state.applications.findIndex(
          (partner) => partner.id === action.payload.id,
        );

        if (index !== -1) {
          state.applications[index] = {
            ...state.applications[index],
            ...action.payload,
          };
        }

        if (state.selectedPartner?.id === action.payload.id) {
          state.selectedPartner = {
            ...state.selectedPartner,
            ...action.payload,
          };
        }
      })

      .addCase(suspendDeliveryPartner.rejected, (state, action) => {
        state.actionLoadingType = null;
        state.actionLoadingId = null;
        state.actionError =
          action.payload || "Failed to suspend delivery partner";
      })

      .addCase(unsuspendDeliveryPartner.pending, (state, action) => {
        state.actionLoadingType = "UNSUSPEND_DELIVERY_PARTNER";
        state.actionLoadingId = action.meta.arg;
        state.actionError = null;
      })

      .addCase(unsuspendDeliveryPartner.fulfilled, (state, action) => {
        state.actionLoadingType = null;
        state.actionLoadingId = null;
        state.actionError = null;

        const index = state.applications.findIndex(
          (partner) => partner.id === action.payload.id,
        );

        if (index !== -1) {
          state.applications[index] = {
            ...state.applications[index],
            ...action.payload,
          };
        }

        if (state.selectedPartner?.id === action.payload.id) {
          state.selectedPartner = {
            ...state.selectedPartner,
            ...action.payload,
          };
        }
      })

      .addCase(unsuspendDeliveryPartner.rejected, (state, action) => {
        state.actionLoadingType = null;
        state.actionLoadingId = null;
        state.actionError =
          action.payload || "Failed to unsuspend delivery partner";
      });
  },
});

export const {
  setDeliveryPartnerStatusFilter,
  setDeliveryPartnerPage,
  setDeliveryPartnerLimit,
  clearSelectedDeliveryPartner,
} = adminDeliveryPartnerSlice.actions;

export default adminDeliveryPartnerSlice.reducer;
