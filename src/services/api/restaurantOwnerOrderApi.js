import api from "./axios";

export async function getRestaurantOrders(restaurantId, params = {}) {
  const response = await api.get(`/restaurants/${restaurantId}/orders`);

  return response.data.data;
}

export async function getRestaurantOrder(restaurantId, orderId) {
  const response = await api.get(
    `/restaurants/${restaurantId}/orders/${orderId}`,
  );

  return response.data.data;
}
