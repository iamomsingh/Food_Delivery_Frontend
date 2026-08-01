import api from "./axios";

export async function getRestaurants() {
  const response = await api.get("/restaurants");

  return response.data.data;
}
