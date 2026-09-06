import { useState } from "react";
import { Outlet } from "react-router-dom";

import { Box } from "@mui/material";

import RestaurantOwnerNavbar from "../../components/restaurant/RestaurantOwnerNavbar";
import RestaurantOwnerSidebar from "../../components/restaurant/RestaurantOwnerSidebar";

function RestaurantLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMobileMenuOpen = () => {
    setMobileOpen(true);
  };

  const handleMobileMenuClose = () => {
    setMobileOpen(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <RestaurantOwnerNavbar onMenuClick={handleMobileMenuOpen} />

      <Box
        sx={{
          display: "flex",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <RestaurantOwnerSidebar
          mobileOpen={mobileOpen}
          onMobileClose={handleMobileMenuClose}
        />

        <Box
          component='main'
          sx={{
            flex: 1,
            minWidth: 0,
            p: {
              xs: 2,
              md: 4,
            },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default RestaurantLayout;
