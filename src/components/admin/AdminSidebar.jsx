import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ReviewsIcon from "@mui/icons-material/RateReview";
import PaymentIcon from "@mui/icons-material/Payments";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import StorefrontIcon from "@mui/icons-material/Storefront";

import { useLocation, useNavigate } from "react-router-dom";

import {
  ADMIN_NAVBAR_HEIGHT,
  ADMIN_SIDEBAR_WIDTH,
  ADMIN_MOBILE_DRAWER_WIDTH,
} from "../../layouts/admin/adminLayout.constants";

const menuItems = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    label: "Restaurants",
    path: "/admin/restaurants",
    icon: <RestaurantIcon />,
  },
  {
    label: "Delivery Partners",
    path: "/admin/delivery-partners",
    icon: <LocalShippingIcon />,
  },
  {
    label: "Users",
    path: "/admin/users",
    icon: <PeopleIcon />,
  },
  {
    label: "Orders",
    path: "/admin/orders",
    icon: <ShoppingBagIcon />,
  },
  {
    label: "Restaurant Owner",
    path: "/admin/restaurant-owners",
    icon: <StorefrontIcon />,
  },
  // {
  //   label: "Reviews",
  //   path: "/admin/reviews",
  //   icon: <ReviewsIcon />,
  // },
  // {
  //   label: "Payments",
  //   path: "/admin/payments",
  //   icon: <PaymentIcon />,
  // },
  {
    label: "Analytics",
    path: "/admin/analytics",
    icon: <AnalyticsIcon />,
  },
];

function AdminSidebar({ mobileOpen = false, onMobileClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);

    if (onMobileClose) {
      onMobileClose();
    }
  };

  const isActive = (path) => {
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  const sidebarContent = (
    <Box
      sx={{
        height: "100%",
        bgcolor: "background.paper",
      }}
    >
      <List
        sx={{
          px: 1.5,
          py: 2,
        }}
      >
        {menuItems.map((item) => (
          <ListItemButton
            key={item.path}
            selected={isActive(item.path)}
            onClick={() => handleNavigation(item.path)}
            sx={{
              minHeight: 48,
              mb: 0.5,
              borderRadius: 2,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 42,
              }}
            >
              {item.icon}
            </ListItemIcon>

            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontSize: 14,
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Drawer
        variant='permanent'
        open
        sx={{
          display: {
            xs: "none",
            md: "block",
          },

          "& .MuiDrawer-paper": {
            width: `${ADMIN_SIDEBAR_WIDTH}px`,
            boxSizing: "border-box",

            top: `${ADMIN_NAVBAR_HEIGHT.desktop}px`,
            height: `calc(100vh - ${ADMIN_NAVBAR_HEIGHT.desktop}px)`,

            borderRight: 1,
            borderColor: "divider",
          },
        }}
      >
        {sidebarContent}
      </Drawer>

      <Drawer
        variant='temporary'
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: {
            xs: "block",
            md: "none",
          },

          "& .MuiDrawer-paper": {
            width: `${ADMIN_MOBILE_DRAWER_WIDTH}px`,
            boxSizing: "border-box",

            top: `${ADMIN_NAVBAR_HEIGHT.mobile}px`,
            height: `calc(100vh - ${ADMIN_NAVBAR_HEIGHT.mobile}px)`,
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    </>
  );
}

export default AdminSidebar;
