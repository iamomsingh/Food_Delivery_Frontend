import { useDispatch, useSelector } from "react-redux";

import { Box, Button, Typography } from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { logout } from "../../features/auth/authSlice";

function RestaurantOwnerAccount() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logout());
  };

  return (
    <Box
      sx={{
        px: 2,
        pb: 2,
      }}
    >
      <Box
        sx={{
          mb: 1,
          px: 1,
        }}
      >
        <Typography variant='body2' fontWeight={600}>
          {user?.firstName} {user?.lastName}
        </Typography>

        <Typography
          variant='caption'
          color='text.secondary'
          sx={{
            display: "block",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {user?.email}
        </Typography>
      </Box>

      <Button
        fullWidth
        color='inherit'
        startIcon={<LogoutOutlinedIcon />}
        onClick={handleLogout}
        sx={{
          justifyContent: "flex-start",
          borderRadius: 2,
        }}
      >
        Logout
      </Button>
    </Box>
  );
}

export default RestaurantOwnerAccount;
