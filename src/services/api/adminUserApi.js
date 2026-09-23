import api from "./axios";

export async function getAdminUsers(params = {}) {
  const response = await api.get("/admin/users", {
    params,
  });

  return response.data.data;
}

export async function getAdminUserDetails(userId) {
  const response = await api.get(`/admin/users/${userId}`);

  return response.data.data;
}

export async function updateAdminUserStatus(userId, status) {
  const response = await api.patch(`/admin/users/${userId}/status`, {
    status,
  });

  return response.data.data;
}

export async function assignAdminRole(userId, role = "ADMIN") {
  const response = await api.post(`/admin/users/${userId}/roles`, { role });

  return response.data.data;
}

export async function removeAdminUserRole(userId, role) {
  const response = await api.delete(`/admin/users/${userId}/roles/${role}`);

  return response.data.data;
}
