import api from "./axios";

// Menu api endpoint
export async function getRestaurantMenus(restaurantId) {
  const response = await api.get(`/restaurants/${restaurantId}/menus`);

  return response.data.data;
}

export async function createRestaurantMenu(restaurantId, data) {
  const response = await api.post(`/restaurants/${restaurantId}/menus`, data);

  return response.data.data;
}

export async function updateRestaurantMenu(menuId, data) {
  const response = await api.patch(`/menus/${menuId}`, data);

  return response.data.data;
}

export async function deleteRestaurantMenu(menuId) {
  const response = await api.delete(`/menus/${menuId}`);

  return response.data.data;
}

// Menu-item api endpoint
export async function getRestaurantMenuItems(restaurantId) {
  const response = await api.get(`/restaurants/${restaurantId}/menu-items`);

  return response.data.data;
}

export async function getRestaurantMenuItem(itemId) {
  const response = await api.get(`/menu-items/${itemId}`);

  return response.data.data;
}

export async function createMenuItem(menuId, data) {
  const response = await api.post(`/menus/${menuId}/items`, data);

  return response.data.data;
}

export async function updateMenuItem(itemId, data) {
  const response = await api.patch(`/menu-items/${itemId}`, data);

  return response.data.data;
}

export async function deleteMenuItem(itemId) {
  const response = await api.delete(`/menu-items/${itemId}`);

  return response.data.data;
}
