import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "../features/customer/cartSlice";
import restaurantReducer from "../features/customer/restaurantSlice";
import authReducer from "../features/auth/authSlice";
import addressReducer from "../features/customer/addressSlice";
import orderReducer from "../features/customer/orderSlice";
import restaurantOwnerReducer from "../features/restaurant/restaurantOwnerSlice";
import restaurantOwnerOrderReducer from "../features/restaurant/restaurantOwnerOrderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    restaurant: restaurantReducer,
    cart: cartReducer,
    address: addressReducer,
    order: orderReducer,
    restaurantOwner: restaurantOwnerReducer,
    restaurantOwnerOrder: restaurantOwnerOrderReducer,
  },
});
