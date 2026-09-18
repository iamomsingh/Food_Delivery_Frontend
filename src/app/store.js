import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "../features/customer/cartSlice";
import restaurantReducer from "../features/customer/restaurantSlice";
import authReducer from "../features/auth/authSlice";
import addressReducer from "../features/customer/addressSlice";
import orderReducer from "../features/customer/orderSlice";
import restaurantOwnerReducer from "../features/restaurant/restaurantOwnerSlice";
import restaurantOwnerOrderReducer from "../features/restaurant/restaurantOwnerOrderSlice";
import restaurantOwnerDeliveryPartnerReducer from "../features/restaurant/restaurantOwnerDeliveryPartnerSlice";
import restaurantOwnerMenuReducer from "../features/restaurant/restaurantOwnerMenuSlice";
import adminRestaurantReducer from "../features/admin/adminRestaurantSlice";
import adminDeliveryPartnerReducer from "../features/admin/adminDeliveryPartnerSlice";
import adminUserReducer from "../features/admin/adminUserSlice";
import adminDashboardReducer from "../features/admin/adminDashboardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    restaurant: restaurantReducer,
    cart: cartReducer,
    address: addressReducer,
    order: orderReducer,
    restaurantOwner: restaurantOwnerReducer,
    restaurantOwnerOrder: restaurantOwnerOrderReducer,
    restaurantOwnerDeliveryPartner: restaurantOwnerDeliveryPartnerReducer,
    restaurantOwnerMenu: restaurantOwnerMenuReducer,
    adminRestaurant: adminRestaurantReducer,
    adminDeliveryPartner: adminDeliveryPartnerReducer,
    adminUser: adminUserReducer,
    adminDashboard: adminDashboardReducer,
  },
});
