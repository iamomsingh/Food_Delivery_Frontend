import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import {
  ArrowForward,
  LocationOn,
  Person,
  Restaurant,
} from "@mui/icons-material";

function getStatusConfig(status) {
  switch (status) {
    case "READY_FOR_PICKUP":
      return {
        label: "Ready for Pickup",
        color: "warning",
        actionLabel: "Pick Up Order",
      };

    case "PICKED_UP":
      return {
        label: "Picked Up",
        color: "info",
        actionLabel: "Start Delivery",
      };

    case "OUT_FOR_DELIVERY":
      return {
        label: "Out for Delivery",
        color: "primary",
        actionLabel: "Mark as Delivered",
      };

    case "DELIVERED":
      return {
        label: "Delivered",
        color: "success",
        actionLabel: null,
      };

    default:
      return {
        label: status || "Unknown",
        color: "default",
        actionLabel: null,
      };
  }
}

function ActiveDeliveryCard({
  activeOrder,
  actionLoading = false,
  actionError = null,
  onAction,
  onViewDetails,
}) {
  if (!activeOrder) {
    return (
      <Card>
        <CardContent>
          <Stack spacing={1}>
            <Typography variant='h6' fontWeight={600}>
              No Active Delivery
            </Typography>

            <Typography variant='body2' color='text.secondary'>
              You currently don't have an active delivery.
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  const statusConfig = getStatusConfig(activeOrder.status);

  return (
    <Card
      sx={{
        width: "100%",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Stack spacing={2.5}>
          {/* Header */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            gap={1}
            sx={{
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
            }}
          >
            <Box>
              <Typography
                variant='overline'
                color='textSecondary'
                fontWeight={600}
              >
                Active Delivery
              </Typography>

              <Typography variant='h6' fontWeight={700}>
                Order #{activeOrder.orderId?.slice(0, 8)}
              </Typography>
            </Box>

            <Chip
              label={statusConfig.label}
              color={statusConfig.color}
              size='small'
            />
          </Stack>

          <Divider />

          {/* Restaurant */}
          <Stack
            direction='row'
            spacing={1.5}
            sx={{ alignItems: "flex-start" }}
          >
            <Restaurant color='action' />

            <Box>
              <Typography variant='body2' color='textSecondary'>
                Restaurant
              </Typography>

              <Typography variant='body1' fontWeight={600}>
                {activeOrder.restaurant?.name || "Restaurant"}
              </Typography>

              {activeOrder.restaurant?.phone && (
                <Typography variant='body2' color='textSecondary'>
                  {activeOrder.restaurant.phone}
                </Typography>
              )}
            </Box>
          </Stack>

          {/* Customer */}
          <Stack
            direction='row'
            spacing={1.5}
            sx={{ alignItems: "flex-start" }}
          >
            <Person color='action' />

            <Box>
              <Typography variant='body2' color='textSecondary'>
                Customer
              </Typography>

              <Typography variant='body1' fontWeight={600}>
                {activeOrder.customer?.name || "Customer"}
              </Typography>

              {activeOrder.customer?.phone && (
                <Typography variant='body2' color='textSecondary'>
                  {activeOrder.customer.phone}
                </Typography>
              )}
            </Box>
          </Stack>

          {/* Delivery Address */}
          <Stack
            direction='row'
            spacing={1.5}
            sx={{ alignItems: "flex-start" }}
          >
            <LocationOn color='action' />

            <Box>
              <Typography variant='body2' color='textSecondary'>
                Delivery Address
              </Typography>

              <Typography variant='body1' fontWeight={600}>
                {activeOrder.deliveryAddress?.label || "Delivery Address"}
              </Typography>

              <Typography variant='body2' color='textSecondary'>
                {activeOrder.deliveryAddress?.address}
              </Typography>

              <Typography variant='body2' color='textSecondary'>
                {[
                  activeOrder.deliveryAddress?.city,
                  activeOrder.deliveryAddress?.state,
                  activeOrder.deliveryAddress?.pinCode,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </Typography>
            </Box>
          </Stack>

          <Divider />

          {/* Amount */}
          <Stack
            direction='row'
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant='body2' color='textSecondary'>
              Order Amount
            </Typography>

            <Typography variant='h6' fontWeight={700}>
              ₹{Number(activeOrder.totalAmount || 0).toFixed(2)}
            </Typography>
          </Stack>

          {/* Action Error */}
          {actionError && (
            <Box
              sx={{
                p: 1.5,
                borderRadius: 1,
                bgcolor: "error.main",
                color: "error.contrastText",
              }}
            >
              <Typography variant='body2'>{actionError}</Typography>
            </Box>
          )}

          {/* Primary Action */}
          {statusConfig.actionLabel && (
            <Button
              variant='contained'
              size='large'
              fullWidth
              endIcon={<ArrowForward />}
              loading={actionLoading}
              disabled={actionLoading}
              onClick={onAction}
              sx={{
                minHeight: 48,
                fontWeight: 700,
              }}
            >
              {statusConfig.actionLabel}
            </Button>
          )}

          {/* Details */}
          {onViewDetails && (
            <Button
              variant='text'
              fullWidth
              onClick={onViewDetails}
              disabled={actionLoading}
            >
              View Delivery Details
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default ActiveDeliveryCard;
