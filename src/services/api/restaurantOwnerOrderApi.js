import api from "./axios";

export async function getRestaurantOrders(restaurantId, params = {}) {
  const response = await api.get(`/restaurants/${restaurantId}/orders`, {
    params,
  });

  return response.data.data;
}

export async function getRestaurantOrder(restaurantId, orderId) {
  const response = await api.get(
    `/restaurants/${restaurantId}/orders/${orderId}`,
  );

  return response.data.data;
}

export async function acceptRestaurantOrder(restaurantId, orderId) {
  const response = await api.patch(
    `/restaurants/${restaurantId}/orders/${orderId}/accept`,
  );

  return response.data.data;
}

export async function rejectRestaurantOrder(restaurantId, orderId) {
  const response = await api.patch(
    `/restaurants/${restaurantId}/orders/${orderId}/reject`,
  );

  return response.data.data;
}

export async function markRestaurantOrderPreparing(restaurantId, orderId) {
  const response = await api.patch(
    `/restaurants/${restaurantId}/orders/${orderId}/preparing`,
  );

  return response.data.data;
}

export async function markRestaurantOrderReadyForPickup(restaurantId, orderId) {
  const response = await api.patch(
    `/restaurants/${restaurantId}/orders/${orderId}/ready-for-pickup`,
  );

  return response.data.data;
}

export async function assignRestaurantDeliveryPartner(
  restaurantId,
  orderId,
  deliveryPartnerId,
) {
  const response = await api.patch(
    `/restaurants/${restaurantId}/orders/${orderId}/assign-delivery-partner`,
    {
      deliveryPartnerId,
    },
  );

  return response.data.data;
}
