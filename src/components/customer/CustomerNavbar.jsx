import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Drawer,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AddLocationIcon from "@mui/icons-material/AddLocation";

import AppLogo from "../common/AppLogo";
import RoleSwitcher from "../common/RoleSwitcher";
import UserAvatarMenu from "../common/UserAvatarMenu";

function CustomerNavbar() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const cartItemCount = useSelector((state) => state.cart.cart?.totalItems);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar
        position='sticky'
        elevation={0}
        color='inherit'
        sx={{
          BorderBottom: 1,
          BorderColor: "divider",
        }}
      >
        <Container maxWidth='xl'>
          <Toolbar
            disableGutters
            sx={{
              minHeight: 64,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <AppLogo />

            {!isMobile && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Button component={NavLink} to='/'>
                  Home
                </Button>

                <Button component={NavLink} to='/restaurants'>
                  Restaurants
                </Button>

                <Tooltip title='Cart'>
                  <IconButton
                    component={NavLink}
                    to='/cart'
                    aria-label='Shopping cart'
                  >
                    <Badge
                      badgeContent={cartItemCount}
                      color='primary'
                      invisible={cartItemCount === 0}
                    >
                      <ShoppingCartOutlinedIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>

                <RoleSwitcher />

                <IconButton
                  onClick={() => navigate("/addresses")}
                  aria-label='Open navigation menu'
                >
                  <AddLocationIcon color='action' />
                </IconButton>

                <UserAvatarMenu />
              </Box>
            )}

            {isMobile && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <Tooltip title='Cart'>
                  <IconButton
                    component={NavLink}
                    to='/cart'
                    aria-label='Shopping cart'
                  >
                    <Badge
                      badgeContent={cartItemCount}
                      color='primary'
                      invisible={cartItemCount === 0}
                    >
                      <ShoppingCartOutlinedIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>

                <IconButton
                  onClick={() => setDrawerOpen(true)}
                  aria-label='Open navigation menu'
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer anchor='right' open={drawerOpen} onClose={closeDrawer}>
        <Box
          sx={{
            width: 280,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2,
              py: 1.5,
            }}
          >
            <UserAvatarMenu />

            <IconButton
              onClick={closeDrawer}
              aria-label='Close navigation menu'
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider />

          <List>
            <ListItem disablePadding>
              <ListItemButton component={NavLink} to='/' onClick={closeDrawer}>
                <ListItemText primary='Home' />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component={NavLink}
                to='/restaurants'
                onClick={closeDrawer}
              >
                <ListItemText primary='Restaurants' />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component={NavLink}
                to='/orders'
                onClick={closeDrawer}
              >
                <ListItemText primary='My Orders' />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component={NavLink}
                to='/profile'
                onClick={closeDrawer}
              >
                <ListItemText primary='My Profile' />
              </ListItemButton>
            </ListItem>
          </List>

          <Divider />

          <Box sx={{ px: 2, py: 2 }}>
            <RoleSwitcher />
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

export default CustomerNavbar;
