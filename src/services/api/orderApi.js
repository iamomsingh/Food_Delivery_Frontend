import api from "./axios";

export async function placeOrder(deliveryAddressId, paymentMethod = "COD") {
  const response = await api.post("/orders", {
    deliveryAddressId,
    paymentMethod,
  });

  return response.data.data;
}

export async function getOrders(page = 1, limit = 10) {
  const response = await api.get("/orders", {
    params: {
      page,
      limit,
    },
  });

  return response.data.data;
}

export async function getOrderById(orderId) {
  const response = await api.get(`/orders/${orderId}`);

  return response.data.data;
}

export async function cancelOrder(orderId) {
  const response = await api.patch(`/orders/${orderId}/cancel`);

  return response.data.data;
}
