import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getAdminUsers,
  getAdminUserDetails,
  updateAdminUserStatus as updateAdminUserStatusApi,
} from "../../services/api/adminUserApi";

const initialState = {
  users: [],

  selectedUser: null,

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

export const fetchAdminUsers = createAsyncThunk(
  "adminUser/fetchAdminUsers",
  async ({ page = 1, limit = 10, status = "" } = {}, { rejectWithValue }) => {
    try {
      return await getAdminUsers({
        page,
        limit,
        status,
      });
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users",
      );
    }
  },
);

export const fetchAdminUserDetails = createAsyncThunk(
  "adminUser/fetchAdminUserDetails",
  async (userId, { rejectWithValue }) => {
    try {
      return await getAdminUserDetails(userId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user details",
      );
    }
  },
);

export const updateAdminUserStatus = createAsyncThunk(
  "adminUser/updateAdminUserStatus",
  async ({ userId, status }, { rejectWithValue }) => {
    try {
      return await updateAdminUserStatusApi(userId, status);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update user status",
      );
    }
  },
);

const adminUserSlice = createSlice({
  name: "adminUser",

  initialState,

  reducers: {
    setUserStatusFilter: (state, action) => {
      state.filters.status = action.payload;
      state.pagination.page = 1;
    },

    setUserPage: (state, action) => {
      state.pagination.page = action.payload;
    },

    setUserLimit: (state, action) => {
      state.pagination.limit = action.payload;
      state.pagination.page = 1;
    },

    clearSelectedUser: (state) => {
      state.selectedUser = null;
      state.detailError = null;
    },

    clearUserActionError: (state) => {
      state.actionError = null;
    },
  },

  extraReducers: (builder) => {
    // =========================
    // Fetch Users
    // =========================

    builder
      .addCase(fetchAdminUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.loading = false;

        state.users = action.payload.users;

        state.pagination = action.payload.pagination;
      })

      .addCase(fetchAdminUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch users";
      });

    // =========================
    // Fetch User Details
    // =========================

    builder
      .addCase(fetchAdminUserDetails.pending, (state) => {
        state.detailLoading = true;
        state.detailError = null;

        // Prevent showing previous user's data
        state.selectedUser = null;
      })

      .addCase(fetchAdminUserDetails.fulfilled, (state, action) => {
        state.detailLoading = false;

        state.selectedUser = action.payload;
      })

      .addCase(fetchAdminUserDetails.rejected, (state, action) => {
        state.detailLoading = false;
        state.detailError = action.payload || "Failed to fetch user details";
      });

    // =========================
    // Update User Status
    // =========================

    builder
      .addCase(updateAdminUserStatus.pending, (state, action) => {
        state.actionLoadingType = "UPDATE_USER_STATUS";
        state.actionLoadingId = action.meta.arg.userId;
        state.actionError = null;
      })

      .addCase(updateAdminUserStatus.fulfilled, (state, action) => {
        state.actionLoadingType = null;
        state.actionLoadingId = null;

        const updatedUser = action.payload;

        // Update user in current list
        const index = state.users.findIndex(
          (user) => user.id === updatedUser.id,
        );

        if (index !== -1) {
          state.users[index] = {
            ...state.users[index],
            ...updatedUser,
          };
        }

        // Update selected user if it is currently open
        if (state.selectedUser?.id === updatedUser.id) {
          state.selectedUser = {
            ...state.selectedUser,
            ...updatedUser,
          };
        }
      })

      .addCase(updateAdminUserStatus.rejected, (state, action) => {
        state.actionLoadingType = null;
        state.actionLoadingId = null;

        state.actionError = action.payload || "Failed to update user status";
      });
  },
});

export const {
  setUserStatusFilter,
  setUserPage,
  setUserLimit,
  clearSelectedUser,
  clearUserActionError,
} = adminUserSlice.actions;

export default adminUserSlice.reducer;
