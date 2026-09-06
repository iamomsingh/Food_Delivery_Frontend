import { Outlet } from "react-router-dom";

import { Box, Container } from "@mui/material";

import RoleBasedNavbar from "../../components/common/RoleBasedNavbar";
import Footer from "../../components/common/Footer";

function AdminLayout() {
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

export default AdminLayout;
