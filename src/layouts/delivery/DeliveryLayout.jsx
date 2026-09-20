import { useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import DeliveryNavbar from "../../components/delivery/DeliveryNavbar";
import DeliverySidebar from "../../components/delivery/DeliverySidebar";

import {
  DELIVERY_NAVBAR_HEIGHT,
  DELIVERY_SIDEBAR_WIDTH,
  DELIVERY_CONTENT_MAX_WIDTH,
} from "./deliveryLayout.constants";

function DeliveryLayout() {
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
      <DeliveryNavbar onMenuClick={openMobileSidebar} />

      <Box
        sx={{
          display: "flex",
          pt: {
            xs: `${DELIVERY_NAVBAR_HEIGHT.mobile}px`,
            md: `${DELIVERY_NAVBAR_HEIGHT.desktop}px`,
          },

          minHeight: "100vh",
        }}
      >
        {/* Desktop Sidebar */}
        <Box
          component='aside'
          sx={{
            width: `${DELIVERY_SIDEBAR_WIDTH}px`,
            flexShrink: 0,
            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
          <DeliverySidebar />
        </Box>

        {/* Main Content */}
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
              maxWidth: `${DELIVERY_CONTENT_MAX_WIDTH}px`,
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

      {/* Mobile Sidebar Drawer */}
      <DeliverySidebar
        mobileOpen={mobileSidebarOpen}
        onMobileClose={closeMobileSidebar}
      />
    </Box>
  );
}

export default DeliveryLayout;
