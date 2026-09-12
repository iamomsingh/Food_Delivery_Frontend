import api from "./axios";

export async function getAvailableDeliveryPartners(params = {}) {
  const response = await api.get("/restaurants/delivery-partners/available", {
    params,
  });

  return response.data.data;
}
