import { Outlet } from "react-router-dom";

import { Box, Container } from "@mui/material";

import Navbar from "../../components/customer/Navbar";
import Footer from "../../components/customer/Footer";

function CustomerLayout() {
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

export default CustomerLayout;
