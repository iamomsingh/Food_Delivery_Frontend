import api from "./axios";

export async function getRestaurants() {
  const response = await api.get("/restaurants");

  return response.data.data;
}

export async function getRestaurantDetails(restaurantId) {
  const response = await api.get(`/restaurants/${restaurantId}/details`);

  return response.data.data;
}
