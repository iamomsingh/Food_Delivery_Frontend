import { ROLES } from "./roles";

export const ROLE_CONFIG = {
  [ROLES.CUSTOMER]: {
    label: "Customer",
    path: "/",
  },

  [ROLES.RESTAURANT_OWNER]: {
    label: "Restaurant",
    path: "/restaurant",
  },

  [ROLES.DELIVERY]: {
    label: "Delivery",
    path: "/delivery",
  },

  [ROLES.ADMIN]: {
    label: "Admin",
    path: "/admin/dashboard",
  },
};
