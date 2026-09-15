import api from "./axios";

export async function createOwnerRestaurant(data) {
  const response = await api.post("/restaurants/", data);

  return response.data.data;
}

export async function getOwnerRestaurants() {
  const response = await api.get("/restaurants/me");

  return response.data.data;
}

export async function updateOwnerRestaurant(restaurantId, data) {
  const response = await api.patch(`/restaurants/${restaurantId}`, data);

  return response.data.data;
}

export async function deleteOwnerRestaurant(restaurantId) {
  const response = await api.delete(`/restaurants/${restaurantId}`);

  return response.data;
}
