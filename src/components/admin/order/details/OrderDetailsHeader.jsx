import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";

import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";

const STATUS_CONFIG = {
  PLACED: {
    label: "Placed",
    color: "info",
  },
  ACCEPTED: {
    label: "Accepted",
    color: "primary",
  },
  PREPARING: {
    label: "Preparing",
    color: "warning",
  },
  READY_FOR_PICKUP: {
    label: "Ready for Pickup",
    color: "warning",
  },
  PICKED_UP: {
    label: "Picked Up",
    color: "info",
  },
  OUT_FOR_DELIVERY: {
    label: "Out for Delivery",
    color: "secondary",
  },
  DELIVERED: {
    label: "Delivered",
    color: "success",
  },
  CANCELLED: {
    label: "Cancelled",
    color: "error",
  },
  REJECTED: {
    label: "Rejected",
    color: "error",
  },
};

function formatDate(value) {
  if (!value) return "—";

  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function OrderDetailsHeader({ order }) {
  const status = STATUS_CONFIG[order.status] ?? {
    label: order.status,
    color: "default",
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        border: 1,
        borderColor: "divider",
        boxShadow: "none",
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: {
              xs: "flex-start",
              sm: "center",
            },
          }}
        >
          <Stack direction='row' spacing={1.5} sx={{ alignItems: "center" }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "action.hover",
              }}
            >
              <ReceiptLongOutlinedIcon />
            </Box>

            <Box>
              <Typography variant='h5' fontWeight={700}>
                {order.orderId}
              </Typography>

              <Typography variant='body2' color='textSecondary'>
                Placed {formatDate(order.placedAt)}
              </Typography>
            </Box>
          </Stack>

          <Chip
            label={status.label}
            color={status.color}
            sx={{
              fontWeight: 600,
            }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}

export default OrderDetailsHeader;
