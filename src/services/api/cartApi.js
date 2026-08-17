import api from "./axios";

export async function getCart() {
  const response = await api.get("/cart");

  return response.data.data;
}

export async function addToCart(menuItemId, quantity = 1) {
  const response = await api.post("/cart/items", {
    menuItemId,
    quantity,
  });

  return response.data.data;
}

export async function updateCartItem(cartItemId, quantity) {
  const response = await api.patch(`/cart/items/${cartItemId}`, {
    quantity,
  });

  return response.data.data;
}

export async function removeCartItem(cartItemId) {
  const response = await api.delete(`/cart/items/${cartItemId}`);

  return response.data.data;
}

export async function clearCart() {
  const response = await api.delete(`/cart`);

  return response.data.data;
}
