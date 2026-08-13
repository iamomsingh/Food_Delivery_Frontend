import api from "./axios";

export async function getRestaurants(params) {
  const response = await api.get("/restaurants", {
    params,
  });

  return response.data.data;
}

export async function getRestaurantById(restaurantId) {
  const response = await api.get(`/restaurants/${restaurantId}`);

  return response.data.data;
}

export async function getRestaurantDetails(restaurantId) {
  const response = await api.get(`/restaurants/${restaurantId}/details`);

  return response.data.data;
}
