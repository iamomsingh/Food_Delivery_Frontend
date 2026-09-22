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
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StorefrontIcon from "@mui/icons-material/Storefront";

import { logout } from "../../features/auth/authSlice";

import UserAvatar from "./UserAvatar";
import { ROLES } from "../../constants/roles";

function UserAvatarMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const { application, applicationLoading } = useSelector(
    (state) => state.delivery,
  );

  const {
    application: restaurantOwnerApplication,
    applicationLoading: restaurantOwnerApplicationLoading,
  } = useSelector((state) => state.restaurantOwnerApplication);

  const isDeliveryPartner = user?.roles?.includes(ROLES.DELIVERY);
  const isRestaurantOwner = user?.roles?.includes(ROLES.RESTAURANT);

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

  const deliveryApplicationStatus = application?.status || null;

  let deliveryOption = null;

  if (isDeliveryPartner) {
    deliveryOption = {
      label: "Delivery Dashboard",
      path: "/delivery/dashboard",
    };
  } else if (!applicationLoading && !application) {
    deliveryOption = {
      label: "Become a Delivery_Partner",
      path: "/delivery/apply",
    };
  } else if (!applicationLoading && deliveryApplicationStatus === "PENDING") {
    deliveryOption = {
      label: "Application Pending",
      path: "/delivery/application",
    };
  } else if (!applicationLoading && deliveryApplicationStatus === "REJECTED") {
    deliveryOption = {
      label: "Application Rejected",
      path: "/delivery/apply",
    };
  } else if (!applicationLoading && deliveryApplicationStatus === "SUSPENDED") {
    deliveryOption = {
      label: "Account Suspended",
      path: null,
    };
  }

  let restaurantOwnerMenuItem = null;

  if (isRestaurantOwner) {
    restaurantOwnerMenuItem = {
      label: "Restaurant Dashboard",
      path: "/restaurant/dashboard",
    };
  } else if (
    !restaurantOwnerApplicationLoading &&
    !restaurantOwnerApplication
  ) {
    restaurantOwnerMenuItem = {
      label: "Become a Restaurant_Owner",
      path: "/restaurant-owner/apply",
    };
  } else if (
    !restaurantOwnerApplicationLoading &&
    restaurantOwnerApplication?.status === "PENDING"
  ) {
    restaurantOwnerMenuItem = {
      label: "Restaurant Pending",
      path: "/restaurant-owner/application",
    };
  } else if (
    !restaurantOwnerApplicationLoading &&
    restaurantOwnerApplication?.status === "REJECTED"
  ) {
    restaurantOwnerMenuItem = {
      label: "Restaurant Rejected",
      path: "/restaurant-owner/apply",
    };
  }

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

        {deliveryOption && (
          <>
            <MenuItem
              disabled={!deliveryOption.path}
              onClick={() => {
                if (!deliveryOption.path) return;

                handleClose();
                navigate(deliveryOption.path);
              }}
            >
              <ListItemIcon>
                <LocalShippingIcon fontSize='small' />
              </ListItemIcon>

              {deliveryOption.label}
            </MenuItem>

            <Divider />
          </>
        )}

        {restaurantOwnerMenuItem && (
          <>
            <MenuItem
              onClick={() => {
                handleClose();
                navigate(restaurantOwnerMenuItem.path);
              }}
            >
              <ListItemIcon>
                <StorefrontIcon fontSize='small' />
              </ListItemIcon>

              {restaurantOwnerMenuItem.label}
            </MenuItem>

            <Divider />
          </>
        )}

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
