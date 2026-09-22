import { useSelector } from "react-redux";

import PublicNavbar from "../public/PublicNavbar";
import CustomerNavbar from "../customer/CustomerNavbar";

function RoleBasedNavbar() {
  const { isAuthenticated, activeRole, authInitialized } = useSelector(
    (state) => state.auth,
  );

  if (!isAuthenticated && activeRole === "null") {
    return <PublicNavbar />;
  }

  if (activeRole === "CUSTOMER") {
    return <CustomerNavbar />;
  }

  return <PublicNavbar />;
}

export default RoleBasedNavbar;
