import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Box, Container } from "@mui/material";
import { CartProvider } from "../context/CartContext";

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
