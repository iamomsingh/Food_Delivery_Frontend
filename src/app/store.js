import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "../features/customer/cartSlice";
import restaurantReducer from "../features/customer/restaurantSlice";
import authReducer from "../features/auth/authSlice";
import addressReducer from "../features/customer/addressSlice";
import orderReducer from "../features/customer/orderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    restaurant: restaurantReducer,
    cart: cartReducer,
    address: addressReducer,
    order: orderReducer,
  },
});
