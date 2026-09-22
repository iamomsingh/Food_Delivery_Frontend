import api from "./axios";

export async function getUserProfile() {
  const response = await api.get("/user/me");

  return response.data.data;
}

export async function updateUserProfile(profileData) {
  const response = await api.patch("/user/me", profileData);

  return response.data.data;
}

export async function changeUserPassword(passwordData) {
  const response = await api.patch("/user/change-password", passwordData);

  return response.data;
}
