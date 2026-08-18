import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { refresh, fetchCurrentUser, setAuthInitialized } from "./authSlice";
import { fetchCart } from "../cart/cartSlice";
import { fetchRestaurants } from "../restaurants/restaurantSlice";

function AuthInitializer({ children }) {
  const dispatch = useDispatch();

  const { authInitialized } = useSelector((state) => state.auth);

  useEffect(() => {
    async function initializeAuth() {
      try {
        const result = await dispatch(refresh());

        if (refresh.fulfilled.match(result)) {
          await dispatch(fetchCurrentUser());
          await dispatch(fetchRestaurants());
          await dispatch(fetchCart());
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
