export function getNextDeliveryAction(status) {
  switch (status) {
    case "READY_FOR_PICKUP":
      return {
        label: "Pick Up Order",
        action: "pickup",
      };

    case "PICKED_UP":
      return {
        label: "Start Delivery",
        action: "outForDelivery",
      };

    case "OUT_FOR_DELIVERY":
      return {
        label: "Mark as Delivered",
        action: "deliver",
      };

    default:
      return null;
  }
}
