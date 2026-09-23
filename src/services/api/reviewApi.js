import api from "./axios";

// Create review for an order
export async function createReview(orderId, reviewData) {
  const response = await api.post(`/orders/${orderId}/reviews`, reviewData);

  return response.data.data;
}

// Get Order review
export async function getOrderReview(orderId) {
  const response = await api.get(`/orders/${orderId}/review`);
  return response.data.data;
}

// Get restaurant reviews
export async function getRestaurantReviews(restaurantId, params = {}) {
  const response = await api.get(`/restaurants/${restaurantId}/reviews`, {
    params,
  });

  return response.data.data;
}

// Delivery-partner can see his review
export async function getMyDeliveryReviews(deliveryPartnerId, params = {}) {
  const response = await api.get(`/delivery/${deliveryPartnerId}/reviews`, {
    params,
  });

  return response.data.data;
}

// Update review
export async function updateReview(reviewId, reviewData) {
  const response = await api.patch(`/reviews/${reviewId}`, reviewData);

  return response.data.data;
}

// Delete review
export async function deleteReview(reviewId) {
  const response = await api.delete(`/reviews/${reviewId}`);

  return response.data;
}
