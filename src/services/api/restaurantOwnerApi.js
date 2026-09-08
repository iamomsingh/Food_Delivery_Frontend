import api from "./axios";

export async function getOwnerRestaurants() {
  const response = await api.get("/restaurants/me");

  return response.data.data;
}
