import { ROLES } from "./roles";

export const ROLE_CONFIG = {
  [ROLES.CUSTOMER]: {
    label: "Customer",
    path: "/",
  },

  [ROLES.RESTAURANT]: {
    label: "Restaurant",
    path: "/restaurant/dashboard",
  },

  [ROLES.DELIVERY]: {
    label: "Delivery",
    path: "/delivery/dashboard",
  },

  [ROLES.ADMIN]: {
    label: "Admin",
    path: "/admin/dashboard",
  },
};
