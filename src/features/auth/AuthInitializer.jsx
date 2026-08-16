import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { refresh, fetchCurrentUser, setAuthInitialized } from "./authSlice";

function AuthInitializer({ children }) {
  const dispatch = useDispatch();

  const { authInitialized } = useSelector((state) => state.auth);

  useEffect(() => {
    async function initializeAuth() {
      try {
        const result = await dispatch(refresh());

        if (refresh.fulfilled.match(result)) {
          await dispatch(fetchCurrentUser());
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
