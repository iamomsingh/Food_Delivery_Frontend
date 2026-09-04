import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { setActiveRole } from "../../features/auth/authSlice";

const ROLE_CONFIG = {
  CUSTOMER: {
    label: "Customer",
    path: "/",
  },

  RESTAURANT_OWNER: {
    label: "Restaurant",
    path: "/restaurant",
  },

  DELIVERY: {
    label: "Delivery",
    path: "/delivery",
  },

  ADMIN: {
    label: "Admin",
    path: "/admin",
  },
};

function RoleSwitcher() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, activeRole } = useSelector((state) => state.auth);

  const roles = user?.roles || [];

  if (roles.length <= 1) {
    return null;
  }

  const handleRoleChange = (event) => {
    const role = event.target.value;

    dispatch(setActiveRole(role));

    const roleConfig = ROLE_CONFIG[role];

    if (roleConfig) {
      navigate(roleConfig.path);
    }
  };

  return (
    <FormControl
      size='small'
      sx={{
        minWidth: 150,
      }}
    >
      <InputLabel id='role-switcher-label'>Role</InputLabel>

      <Select
        labelId='role-switcher-label'
        value={activeRole || ""}
        label='Role'
        onChange={handleRoleChange}
      >
        {roles.map((role) => {
          const config = ROLE_CONFIG[role];

          return (
            <MenuItem key={role} value={role}>
              {config?.label || role}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

export default RoleSwitcher;
