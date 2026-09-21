import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  refresh,
  fetchCurrentUser,
  setAuthInitialized,
  setActiveRole,
} from "./authSlice";
import { fetchCart } from "../customer/cartSlice";
import { getDefaultRole } from "../../utils/roleUtils";
import { fetchDeliveryApplication } from "../delivery/deliverySlice";
import { fetchRestaurantOwnerApplication } from "../restaurant/restaurantOwnerApplicationSlice";

function AuthInitializer({ children }) {
  const dispatch = useDispatch();

  const { authInitialized } = useSelector((state) => state.auth);

  useEffect(() => {
    async function initializeAuth() {
      try {
        const result = await dispatch(refresh());

        if (refresh.fulfilled.match(result)) {
          const userResult = await dispatch(fetchCurrentUser());

          if (fetchCurrentUser.fulfilled.match(userResult)) {
            const user = userResult.payload;
            const defaultRole = getDefaultRole(user.roles);

            dispatch(setActiveRole(defaultRole));

            if (user.roles.includes("CUSTOMER")) {
              await dispatch(fetchDeliveryApplication());
              await dispatch(fetchRestaurantOwnerApplication());
              await dispatch(fetchCart());
            }
          }
        }
      } finally {
        dispatch(setAuthInitialized());
      }
    }

    initializeAuth();
  }, [dispatch]);

  if (!authInitialized) {
    return <div>Checking authentication...</div>;
  }

  return children;
}

export default AuthInitializer;
