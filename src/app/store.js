import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "../features/cart/cartSlice";
import restaurantReducer from "../features/restaurants/restaurantSlice";
import authReducer from "../features/auth/authSlice";
import addressReducer from "../features/address/addressSlice";
import orderReducer from "../features/order/orderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    restaurant: restaurantReducer,
    cart: cartReducer,
    address: addressReducer,
    order: orderReducer,
  },
});
