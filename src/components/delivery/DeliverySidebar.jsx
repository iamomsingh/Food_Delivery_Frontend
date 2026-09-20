import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

import { useLocation, useNavigate } from "react-router-dom";

import {
  DELIVERY_NAVBAR_HEIGHT,
  DELIVERY_SIDEBAR_WIDTH,
  DELIVERY_MOBILE_DRAWER_WIDTH,
} from "../../layouts/delivery/deliveryLayout.constants";

const navigationItems = [
  {
    label: "Dashboard",
    path: "/delivery/dashboard",
    icon: <DashboardOutlinedIcon />,
  },
  {
    label: "Orders",
    path: "/delivery/orders",
    icon: <ShoppingBagOutlinedIcon />,
  },
  {
    label: "Profile",
    path: "/delivery/profile",
    icon: <PersonOutlineOutlinedIcon />,
  },
];

function DeliverySidebar({ mobileOpen = false, onMobileClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);

    if (onMobileClose) {
      onMobileClose();
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const sidebarContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
      }}
    >
      {/* Sidebar Header */}
      <Box
        sx={{
          height: {
            xs: DELIVERY_NAVBAR_HEIGHT.mobile,
            md: DELIVERY_NAVBAR_HEIGHT.desktop,
          },
          display: "flex",
          alignItems: "center",
          px: 2.5,
          flexShrink: 0,
        }}
      >
        <Typography variant='subtitle1' fontWeight={700} noWrap>
          Delivery Partner
        </Typography>
      </Box>

      <Divider />

      {/* Navigation */}
      <List
        sx={{
          px: 1.5,
          py: 2,
        }}
      >
        {navigationItems.map((item) => (
          <ListItemButton
            key={item.path}
            selected={isActive(item.path)}
            onClick={() => handleNavigation(item.path)}
            sx={{
              minHeight: 46,
              mb: 0.5,
              borderRadius: 1.5,
              px: 1.5,

              "&.Mui-selected": {
                bgcolor: "action.selected",
              },

              "&.Mui-selected:hover": {
                bgcolor: "action.selected",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 40,
                color: "inherit",
              }}
            >
              {item.icon}
            </ListItemIcon>

            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontSize: 14,
                fontWeight: isActive(item.path) ? 600 : 400,
              }}
            />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Divider />

      <Box
        sx={{
          px: 2.5,
          py: 2,
        }}
      >
        <Typography variant='caption' color='text.secondary'>
          Delivery Partner
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <Box
        sx={{
          width: `${DELIVERY_SIDEBAR_WIDTH}px`,
          height: `calc(100vh - ${DELIVERY_NAVBAR_HEIGHT.desktop}px)`,
          position: "fixed",
          top: `${DELIVERY_NAVBAR_HEIGHT.desktop}px`,
          left: 0,
          borderRight: 1,
          borderColor: "divider",
          display: {
            xs: "none",
            md: "block",
          },
          overflowY: "auto",
        }}
      >
        {sidebarContent}
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        anchor='left'
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
            width: `${DELIVERY_MOBILE_DRAWER_WIDTH}px`,
            boxSizing: "border-box",
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    </>
  );
}

export default DeliverySidebar;
