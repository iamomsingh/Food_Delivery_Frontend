import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "../features/cart/cartSlice";
import restaurantReducer from "../features/restaurants/restaurantSlice";
import authReducer from "../features/auth/authSlice";
import addressReducer from "../features/address/addressSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    restaurant: restaurantReducer,
    cart: cartReducer,
    address: addressReducer,
  },
});
