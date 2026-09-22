import api from "./axios";

export async function getRestaurantOwnerApplications() {
  const response = await api.get("/admin/restaurant-owners");

  return response.data.data;
}

export async function getRestaurantOwnerApplication(applicationId) {
  const response = await api.get(`/admin/restaurant-owners/${applicationId}`);

  return response.data.data;
}

export async function approveRestaurantOwner(applicationId) {
  const response = await api.patch(
    `/admin/restaurant-owners/${applicationId}/approve`,
  );

  return response.data.data;
}

export async function rejectRestaurantOwner(applicationId, rejectionReason) {
  const response = await api.patch(
    `/admin/restaurant-owners/${applicationId}/reject`,
    {
      rejectionReason,
    },
  );

  return response.data.data;
}
