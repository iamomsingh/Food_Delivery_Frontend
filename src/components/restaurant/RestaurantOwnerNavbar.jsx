import { useSelector } from "react-redux";

import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import AppLogo from "../common/AppLogo";
import RoleSwitcher from "../common/RoleSwitcher";
import UserAvatarMenu from "../common/UserAvatarMenu";
import RestaurantSelector from "./RestaurantSelector";

function RestaurantOwnerNavbar({ onMenuClick }) {
  const { user } = useSelector((state) => state.auth);

  const { restaurants, activeRestaurantId } = useSelector(
    (state) => state.restaurantOwner,
  );

  const activeRestaurant = restaurants.find(
    (restaurant) => restaurant.id === activeRestaurantId,
  );

  return (
    <AppBar
      position='sticky'
      elevation={0}
      color='inherit'
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Toolbar
        sx={{
          minHeight: 64,
          px: {
            xs: 2,
            md: 3,
          },
        }}
      >
        <IconButton
          onClick={onMenuClick}
          sx={{
            display: {
              xs: "inline-flex",
              md: "none",
            },
            mr: 1,
          }}
          aria-label='Open navigation'
        >
          <MenuIcon />
        </IconButton>

        <AppLogo />

        <Box
          sx={{
            ml: 3,
            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
          <Typography variant='subtitle1' fontWeight={600}>
            {activeRestaurant?.name || "Restaurant Dashboard"}
          </Typography>

          <Typography variant='caption' color='text.secondary'>
            {activeRestaurant?.status || "No restaurant selected"}
          </Typography>
        </Box>

        <Box
          sx={{
            ml: "auto",
            display: "flex",
            alignItems: "center",
            gap: {
              xs: 1,
              md: 2,
            },
          }}
        >
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <RestaurantSelector />
          </Box>

          <Box
            sx={{
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            <RoleSwitcher />
          </Box>

          <UserAvatarMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default RestaurantOwnerNavbar;
