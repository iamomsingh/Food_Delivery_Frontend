import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCart } from "./cartSlice";

function CustomerInitializer({ children }) {
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const isCustomer = isAuthenticated && user?.roles?.includes("CUSTOMER");

  useEffect(() => {
    if (isCustomer) {
      dispatch(fetchCart());
    }
  }, [dispatch, isCustomer]);

  return children;
}

export default CustomerInitializer;
