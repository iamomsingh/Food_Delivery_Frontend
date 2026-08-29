import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import { Box, Container } from "@mui/material";

import Navbar from "../../components/customer/Navbar";
import Footer from "../../components/customer/Footer";

import { fetchRestaurants } from "../../features/customer/restaurantSlice";

function PublicLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  return (
    <>
      <Navbar />

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
