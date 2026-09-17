import api from "./axios";

export async function getAdminDeliveryPartners(params = {}) {
  const response = await api.get("/admin/delivery-partners", {
    params,
  });

  return response.data.data;
}

export async function getAdminDeliveryPartnerDetails(partnerId) {
  const response = await api.get(`/admin/delivery-partners/${partnerId}`);

  return response.data.data;
}

export async function approveAdminDeliveryPartner(partnerId) {
  const response = await api.patch(
    `/admin/delivery-partners/${partnerId}/approve`,
  );

  return response.data.data;
}

export async function rejectAdminDeliveryPartner(partnerId) {
  const response = await api.patch(
    `/admin/delivery-partners/${partnerId}/reject`,
  );

  return response.data.data;
}

export async function suspendAdminDeliveryPartner(partnerId) {
  const response = await api.patch(
    `/admin/delivery-partners/${partnerId}/suspend`,
  );

  return response.data.data;
}

export async function unsuspendAdminDeliveryPartner(partnerId) {
  const response = await api.patch(
    `/admin/delivery-partners/${partnerId}/unsuspend`,
  );

  return response.data.data;
}
