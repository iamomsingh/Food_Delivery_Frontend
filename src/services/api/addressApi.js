import api from "./axios";

export async function getAddresses() {
  const response = await api.get("/address");

  return response.data.data;
}

export async function getAddressById(addressId) {
  const response = await api.get(`/address/${addressId}`);

  return response.data.data;
}

export async function createAddress(addressData) {
  const response = await api.post("/address", addressData);

  return response.data.data;
}

export async function updateAddress(addressId, addressData) {
  const response = await api.patch(`/address/${addressId}`, addressData);

  return response.data.data;
}

export async function makeDefaultAddress(addressId) {
  const response = await api.patch(`/address/${addressId}/default`);

  return response.data.data;
}

export async function deleteAddress(addressId) {
  const response = await api.delete(`/address/${addressId}`);

  return response.data.data;
}
