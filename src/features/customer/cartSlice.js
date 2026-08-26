import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../../services/api/cartApi";

const initialState = {
  cart: null,
  loading: false,
  error: null,

  updating: false,
  updatingItemId: null,
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getCart();

      return data.cart;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to fetch cart.",
      );
    }
  },
);

export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  async ({ menuItemId, quantity = 1 }, { rejectWithValue }) => {
    try {
      const data = await addToCart(menuItemId, quantity);

      return data.cart;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to add item to cart.",
      );
    }
  },
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ cartItemId, quantity }, { rejectWithValue }) => {
    try {
      const data = await updateCartItem(cartItemId, quantity);

      return data.cart;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to update cart item.",
      );
    }
  },
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (cartItemId, { rejectWithValue }) => {
    try {
      const data = await removeCartItem(cartItemId);

      return data.cart;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to remove cart item.",
      );
    }
  },
);

export const clearCartValue = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const data = await clearCart();

      return data.cart;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to Clear Cart",
      );
    }
  },
);

function replaceCart(state, newCart) {
  state.cart = newCart;
}

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    clearCartState: (state) => {
      state.cart = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cart = action.payload;
      })

      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unable to load cart.";
      })

      // add to cart
      .addCase(addCartItem.pending, (state) => {
        state.updating = true;
        state.error = null;
      })

      .addCase(addCartItem.fulfilled, (state, action) => {
        state.updating = false;
        state.cart = action.payload;
      })

      .addCase(addCartItem.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload || "Unable to add item to cart.";
      })

      // update cart items
      .addCase(updateCartItemQuantity.pending, (state, action) => {
        state.updatingItemId = action.meta.arg.cartItemId;
        state.error = null;
      })

      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.updatingItemId = null;
        replaceCart(state, action.payload);
      })

      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.updatingItemId = null;
        state.error = action.payload || "Unable to update cart item.";
      })

      // Delete cart items
      .addCase(deleteCartItem.pending, (state) => {
        state.updating = true;
        state.error = null;
      })

      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.updating = false;
        state.cart = action.payload;
      })

      .addCase(deleteCartItem.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload || "Unable to remove cart item.";
      })

      // clear cart
      .addCase(clearCartValue.pending, (state) => {
        state.updating = true;
        state.error = null;
      })

      .addCase(clearCartValue.fulfilled, (state, action) => {
        state.updating = false;
        state.cart = action.payload;
      })

      .addCase(clearCartValue.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload || "unable to clear cart.";
      });
  },
});

export const { clearCartState } = cartSlice.actions;

export default cartSlice.reducer;
