import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import { Box, Container } from "@mui/material";

import RoleBasedNavbar from "../../components/common/RoleBasedNavbar";
import Footer from "../../components/common/Footer";

import { fetchRestaurants } from "../../features/customer/restaurantSlice";

function PublicLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  return (
    <>
      <RoleBasedNavbar />

      <Container maxWidth='xl'>
        <Box
          component='main'
          sx={{
            minHeight: "80vh",
            py: 4,
          }}
        >
          <Outlet />
        </Box>
      </Container>

      <Footer />
    </>
  );
}

export default PublicLayout;
