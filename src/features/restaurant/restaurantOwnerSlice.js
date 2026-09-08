import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOwnerRestaurants } from "../../services/api/restaurantOwnerApi";

const initialState = {
  restaurants: [],
  activeRestaurantId: null,
  loading: false,
  error: null,
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
      });
  },
});

export const { setActiveRestaurant } = restaurantOwnerSlice.actions;

export default restaurantOwnerSlice.reducer;
