import api from "./axios";

export async function applyAsRestaurantOwner(data) {
  const response = await api.post("/restaurant-owner/apply", data);
  return response.data.data;
}

export async function getRestaurantOwnerApplication() {
  const response = await api.get("/restaurant-owner/application");
  return response.data.data;
}
