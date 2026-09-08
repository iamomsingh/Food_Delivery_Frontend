import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

import {
  AccountCircle,
  LocationOn,
  Logout,
  ReceiptLong,
} from "@mui/icons-material";

import { logout } from "../../features/auth/authSlice";

import UserAvatar from "./UserAvatar";

function UserAvatarMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    navigate("/profile");
  };

  const handleOrders = () => {
    handleClose();
    navigate("/orders");
  };

  const handleAddresses = () => {
    handleClose();
    navigate("/address");
  };

  const handleLogout = async () => {
    handleClose();

    await dispatch(logout());

    navigate("/");
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        aria-label='Open account menu'
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup='true'
        aria-expanded={open ? "true" : undefined}
      >
        <UserAvatar user={user} />
      </IconButton>

      <Menu
        id='account-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {/* User information */}
        <MenuItem disabled>
          <div>
            <Typography fontWeight={700}>
              {user?.firstName} {user?.lastName}
            </Typography>

            <Typography variant='body2' color='text.secondary'>
              {user?.email}
            </Typography>
          </div>
        </MenuItem>

        <Divider />

        {/* Profile */}
        <MenuItem onClick={handleProfile}>
          <ListItemIcon>
            <AccountCircle fontSize='small' />
          </ListItemIcon>
          My Profile
        </MenuItem>

        {/* Orders */}
        <MenuItem onClick={handleOrders}>
          <ListItemIcon>
            <ReceiptLong fontSize='small' />
          </ListItemIcon>
          My Orders
        </MenuItem>

        {/* Addresses */}
        <MenuItem onClick={handleAddresses}>
          <ListItemIcon>
            <LocationOn fontSize='small' />
          </ListItemIcon>
          My Addresses
        </MenuItem>

        <Divider />

        {/* Logout */}
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default UserAvatarMenu;
