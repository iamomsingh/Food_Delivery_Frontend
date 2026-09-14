import { NavLink } from "react-router-dom";

import {
  DashboardOutlined,
  RestaurantOutlined,
  ReceiptLongOutlined,
  StorefrontOutlined,
} from "@mui/icons-material";

import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import RoleSwitcher from "../common/RoleSwitcher";
import RestaurantOwnerAccount from "./RestaurantOwnerAccount";

const DRAWER_WIDTH = 240;

const NAV_ITEMS = [
  {
    label: "Dashboard",
    path: "/restaurant",
    icon: <DashboardOutlined />,
    end: true,
  },
  {
    label: "Orders",
    path: "/restaurant/orders",
    icon: <ReceiptLongOutlined />,
  },
  {
    label: "Menu",
    path: "/restaurant/menu",
    icon: <RestaurantOutlined />,
  },
  {
    label: "Restaurant",
    path: "/restaurant/management",
    icon: <StorefrontOutlined />,
  },
];

function RestaurantOwnerSidebar({ mobileOpen, onMobileClose }) {
  const navigation = (
    <>
      <List sx={{ p: 2, position: "sticky" }}>
        {NAV_ITEMS.map((item) => (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            end={item.end}
            onClick={onMobileClose}
            sx={{
              mb: 0.5,
              borderRadius: 2,

              "&.active": {
                bgcolor: "action.selected",
                color: "primary.main",

                "& .MuiListItemIcon-root": {
                  color: "primary.main",
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 40,
              }}
            >
              {item.icon}
            </ListItemIcon>

            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>

      <Divider />

      {/* Mobile role switcher */}
      <Box
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
          p: 2,
        }}
      >
        <RoleSwitcher />
      </Box>

      {/* Mobile account */}
      <Box
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
        }}
      >
        <RestaurantOwnerAccount />
      </Box>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <Box
        component='aside'
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
          width: DRAWER_WIDTH,
          flexShrink: 0,
          borderRight: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        {navigation}
      </Box>

      {/* Mobile Sidebar */}
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
        }}
      >
        <Box
          sx={{
            width: DRAWER_WIDTH,
            pt: 2,
          }}
          role='presentation'
        >
          {navigation}
        </Box>
      </Drawer>
    </>
  );
}

export default RestaurantOwnerSidebar;
