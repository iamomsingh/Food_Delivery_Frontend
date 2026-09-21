import api from "./axios";

// Apply as delivery partner
export async function applyAsDeliveryPartner(data) {
  const response = await api.post("/delivery/apply", data);

  return response.data.data;
}

// Get application status
export async function getDeliveryApplication() {
  const response = await api.get("/delivery/application");
  return response.data.data;
}

// Get delivery partner profile
export async function getDeliveryProfile() {
  const response = await api.get("/delivery/profile");

  return response.data.data;
}

// Update online/offline status
export async function updateDeliveryOnlineStatus(isOnline) {
  const response = await api.patch("/delivery/status", {
    isOnline,
  });

  return response.data.data;
}

// Get assigned orders
export async function getDeliveryOrders() {
  const response = await api.get("/delivery/orders");

  return response.data.data;
}

// Get assigned order details
export async function getDeliveryOrderDetails(orderId) {
  const response = await api.get(`/delivery/orders/${orderId}`);

  return response.data.data;
}

// Pick up order
export async function pickupDeliveryOrder(orderId) {
  const response = await api.patch(`/delivery/orders/${orderId}/pickup`);

  return response.data;
}

// Mark order out for delivery
export async function markOrderOutForDelivery(orderId) {
  const response = await api.patch(
    `/delivery/orders/${orderId}/out-for-delivery`,
  );

  return response.data;
}

// Deliver order
export async function deliverDeliveryOrder(orderId) {
  const response = await api.patch(`/delivery/orders/${orderId}/deliver`);

  return response.data;
}

// Get delivery partner stats
export async function getDeliveryStats() {
  const response = await api.get("/delivery/stats");

  return response.data.data;
}
