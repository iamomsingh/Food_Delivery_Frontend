import api from "./axios";

export async function getAdminRestaurants(params = {}) {
  const response = await api.get("/admin/restaurants", {
    params,
  });

  return response.data.data;
}

export async function getAdminRestaurantDetails(restaurantId) {
  const response = await api.get(`/admin/restaurants/${restaurantId}`);

  return response.data.data;
}

export async function approveAdminRestaurant(restaurantId) {
  const response = await api.patch(
    `/admin/restaurants/${restaurantId}/approve`,
  );

  return response.data.data;
}

export async function rejectAdminRestaurant(restaurantId) {
  const response = await api.patch(`/admin/restaurants/${restaurantId}/reject`);

  return response.data.data;
}
