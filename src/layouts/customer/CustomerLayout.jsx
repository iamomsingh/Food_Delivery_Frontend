import { Outlet } from "react-router-dom";

import { Box, Container } from "@mui/material";

import CustomerNavbar from "../../components/customer/CustomerNavbar";
import Footer from "../../components/common/Footer";

function CustomerLayout() {
  return (
    <>
      <CustomerNavbar />

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
