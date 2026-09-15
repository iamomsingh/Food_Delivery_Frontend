import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createOwnerRestaurant,
  deleteOwnerRestaurant,
  getOwnerRestaurants,
  updateOwnerRestaurant,
} from "../../services/api/restaurantOwnerApi";

const initialState = {
  restaurants: [],
  activeRestaurantId: null,

  loading: false,
  actionLoadingType: null,
  actionLoadingId: null,

  error: null,
  actionError: null,
};

export const fetchOwnerRestaurants = createAsyncThunk(
  "restaurantOwner/fetchOwnerRestaurants",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getOwnerRestaurants();

      return data.restaurants;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch restaurants",
      );
    }
  },
);

export const createRestaurant = createAsyncThunk(
  "restaurantOwner/createRestaurant",
  async (data, { rejectWithValue }) => {
    try {
      return await createOwnerRestaurant(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create restaurant",
      );
    }
  },
);

export const updateRestaurant = createAsyncThunk(
  "restaurantOwner/updateRestaurant",
  async ({ restaurantId, data }, { rejectWithValue }) => {
    try {
      return await updateOwnerRestaurant(restaurantId, data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update restaurant",
      );
    }
  },
);

export const deleteRestaurant = createAsyncThunk(
  "restaurantOwner/deleteRestaurant",
  async (restaurantId, { rejectWithValue }) => {
    try {
      await deleteOwnerRestaurant(restaurantId);

      return restaurantId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete restaurant",
      );
    }
  },
);

const restaurantOwnerSlice = createSlice({
  name: "restaurantOwner",

  initialState,

  reducers: {
    setActiveRestaurant: (state, action) => {
      state.activeRestaurantId = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchOwnerRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchOwnerRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload;

        const approvedRestaurant = action.payload.find(
          (restaurant) => restaurant.status === "APPROVED",
        );

        state.activeRestaurantId =
          approvedRestaurant?.id || action.payload[0]?.id || null;
      })

      .addCase(fetchOwnerRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createRestaurant.pending, (state) => {
        state.actionLoadingType = "CREATE_RESTAURANT";
        state.actionLoadingId = null;
        state.actionError = null;
      })

      .addCase(createRestaurant.fulfilled, (state, action) => {
        const newRestaurant = action.payload;

        state.restaurants.unshift(newRestaurant);

        // Make the newly created restaurant active
        state.activeRestaurantId = newRestaurant.id;

        state.actionLoadingType = null;
        state.actionLoadingId = null;
      })

      .addCase(createRestaurant.rejected, (state, action) => {
        state.actionLoadingType = null;
        state.actionLoadingId = null;
        state.actionError = action.payload;
      })

      .addCase(updateRestaurant.pending, (state, action) => {
        state.actionLoadingType = "UPDATE_RESTAURANT";
        state.actionLoadingId = action.meta.arg.restaurantId;
        state.actionError = null;
      })

      .addCase(updateRestaurant.fulfilled, (state, action) => {
        state.actionLoadingType = null;
        state.actionLoadingId = null;

        const updatedRestaurant = action.payload;

        const index = state.restaurants.findIndex(
          (restaurant) => restaurant.id === updatedRestaurant.id,
        );

        if (index !== -1) {
          state.restaurants[index] = updatedRestaurant;
        }
      })

      .addCase(updateRestaurant.rejected, (state, action) => {
        state.actionLoadingType = null;
        state.actionLoadingId = null;
        state.actionError = action.payload;
      })

      .addCase(deleteRestaurant.pending, (state, action) => {
        state.actionLoadingType = "DELETE_RESTAURANT";
        state.actionLoadingId = action.meta.arg;
        state.actionError = null;
      })

      .addCase(deleteRestaurant.fulfilled, (state, action) => {
        const deletedRestaurantId = action.payload;

        state.restaurants = state.restaurants.filter(
          (restaurant) => restaurant.id !== deletedRestaurantId,
        );

        if (state.activeRestaurantId === deletedRestaurantId) {
          const nextApprovedRestaurant = state.restaurants.find(
            (restaurant) => restaurant.status === "APPROVED",
          );

          state.activeRestaurantId =
            nextApprovedRestaurant?.id || state.restaurants[0]?.id || null;
        }

        state.actionLoadingType = null;
        state.actionLoadingId = null;
      })
      .addCase(deleteRestaurant.rejected, (state, action) => {
        state.actionLoadingType = null;
        state.actionLoadingId = null;
        state.actionError = action.payload;
      });
  },
});

export const { setActiveRestaurant } = restaurantOwnerSlice.actions;

export default restaurantOwnerSlice.reducer;
