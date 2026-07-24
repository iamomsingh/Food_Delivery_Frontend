import { Outlet } from "react-router";

import Navbar from "../components/Navbar";

function CustomerLayout() {
  return (
    <>
      <Navbar />

      <Outlet />
    </>
  );
}

export default CustomerLayout;
