import { useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSidebar from "../../components/admin/AdminSidebar";

import {
  ADMIN_NAVBAR_HEIGHT,
  ADMIN_SIDEBAR_WIDTH,
  ADMIN_CONTENT_MAX_WIDTH,
} from "./adminLayout.constants";

function AdminLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const openMobileSidebar = () => {
    setMobileSidebarOpen(true);
  };

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <AdminNavbar onMenuClick={openMobileSidebar} />

      <Box
        sx={{
          display: "flex",
          pt: {
            xs: `${ADMIN_NAVBAR_HEIGHT.mobile}px`,
            md: `${ADMIN_NAVBAR_HEIGHT.desktop}px`,
          },

          minHeight: "100vh",
        }}
      >
        <Box
          component='aside'
          sx={{
            width: `${ADMIN_SIDEBAR_WIDTH}px`,
            flexShrink: 0,
            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
          <AdminSidebar />
        </Box>

        <Box
          component='main'
          sx={{
            flexGrow: 1,
            minWidth: 0,
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: `${ADMIN_CONTENT_MAX_WIDTH}px`,
              margin: "0 auto",

              px: {
                xs: 2,
                sm: 3,
                md: 3,
                lg: 4,
              },

              py: {
                xs: 2,
                sm: 3,
                md: 3,
              },
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>

      <AdminSidebar
        mobileOpen={mobileSidebarOpen}
        onMobileClose={closeMobileSidebar}
      />
    </Box>
  );
}

export default AdminLayout;
