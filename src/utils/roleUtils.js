import { ROLES } from "../constants/roles";
import { ROLE_CONFIG } from "../constants/roleRoutes";

export function getDefaultRole(roles = []) {
  if (roles.includes(ROLES.CUSTOMER)) {
    return ROLES.CUSTOMER;
  }

  return roles[0] || null;
}

export function getRoleEntryPoint(role) {
  return ROLE_CONFIG[role] || "/";
}
