import { AppBar, Avatar, Box, IconButton, Toolbar } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AppLogo from "../common/AppLogo";
import RoleSwitcher from "../common/RoleSwitcher";

function AdminNavbar({ onMenuClick }) {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogoClick = () => {
    navigate("/admin/dashboard");
  };

  return (
    <AppBar
      position='fixed'
      elevation={1}
      color='inherit'
      sx={{
        height: {
          xs: 56,
          md: 64,
        },
        bgcolor: "background.paper",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          minHeight: {
            xs: "56px !important",
            md: "64px !important",
          },

          px: {
            xs: 2,
            sm: 3,
            md: 3,
          },
        }}
      >
        <IconButton
          color='inherit'
          onClick={onMenuClick}
          sx={{
            display: {
              xs: "inline-flex",
              md: "none",
            },

            mr: 1,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Box
          onClick={handleLogoClick}
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <AppLogo />
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box
          sx={{
            display: {
              xs: "none",
              md: "block",
            },

            mr: 2,
          }}
        >
          <RoleSwitcher />
        </Box>

        <IconButton color='inherit'>
          <NotificationsNoneIcon />
        </IconButton>

        <IconButton sx={{ ml: 1 }}>
          <Avatar
            sx={{
              width: 36,
              height: 36,
            }}
          >
            {user?.firstName?.charAt(0)?.toUpperCase() || "A"}
          </Avatar>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default AdminNavbar;
