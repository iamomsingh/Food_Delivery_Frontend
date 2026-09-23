import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

import AppLogo from "../common/AppLogo";
import RoleSwitcher from "../common/RoleSwitcher";

import { DELIVERY_NAVBAR_HEIGHT } from "../../layouts/delivery/deliveryLayout.constants";
import UserAvatarMenu from "../common/UserAvatarMenu";

function DeliveryNavbar({ onMenuClick }) {
  return (
    <AppBar
      position='fixed'
      color='inherit'
      elevation={0}
      sx={{
        height: {
          xs: DELIVERY_NAVBAR_HEIGHT.mobile,
          md: DELIVERY_NAVBAR_HEIGHT.desktop,
        },
        borderBottom: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          minHeight: {
            xs: `${DELIVERY_NAVBAR_HEIGHT.mobile}px !important`,
            md: `${DELIVERY_NAVBAR_HEIGHT.desktop}px !important`,
          },
          px: {
            xs: 1.5,
            sm: 2,
            md: 3,
          },
          gap: 1,
        }}
      >
        {/* Mobile menu */}
        <IconButton
          onClick={onMenuClick}
          sx={{
            display: {
              xs: "inline-flex",
              md: "none",
            },
          }}
          aria-label='Open navigation menu'
        >
          <MenuIcon />
        </IconButton>

        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <AppLogo />
        </Box>

        {/* Role label */}
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },
            ml: 1,
            pl: 2,
            borderLeft: 1,
            borderColor: "divider",
          }}
        >
          Delivery Partner
        </Typography>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Role switcher */}
        <Box
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },
          }}
        >
          <RoleSwitcher />
        </Box>

        {/* Notifications */}
        <Tooltip title='Notifications'>
          <IconButton aria-label='Notifications'>
            <NotificationsNoneIcon />
          </IconButton>
        </Tooltip>

        {/* Account */}
        <UserAvatarMenu />
      </Toolbar>
    </AppBar>
  );
}

export default DeliveryNavbar;
