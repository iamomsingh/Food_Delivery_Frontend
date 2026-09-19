import api from "./axios";

export async function getAdminDashboard() {
  const response = await api.get("/admin/dashboard");

  return response.data.data;
}

export async function getAdminRevenue() {
  const response = await api.get("/admin/revenue");

  return response.data.data;
}

export async function getAdminRecentOrders(params = {}) {
  const response = await api.get("/admin/recent-orders", {
    params,
  });

  return response.data.data;
}

export async function getAdminOrderDetails(orderId) {
  const response = await api.get(`/admin/orders/${orderId}`);

  return response.data.data;
}

export async function getAdminAnalytics() {
  const response = await api.get("/admin/analytics");

  return response.data.data;
}
