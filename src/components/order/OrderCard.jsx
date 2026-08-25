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

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";

const STATUS_CONFIG = {
  PLACED: {
    label: "Placed",
    color: "primary",
  },

  ACCEPTED: {
    label: "Accepted",
    color: "info",
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

  CANCALLED: {
    label: "Cancelled",
    color: "error",
  },
};

function OrderCard({ order, onViewOrder }) {
  const status = STATUS_CONFIG[order.status] || {
    label: order.status,
    color: "default",
  };

  const formattedDate = new Date(order.placedAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,

        transition: "0.2s",

        "&:hover": {
          borderColor: "primary.main",
          boxShadow: 2,
        },
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
        {/* Header */}

        <Stack
          direction='row'
          sx={{
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
          spacing={2}
        >
          <Stack
            direction='row'
            spacing={1.5}
            sx={{ alignItems: "center", minWidth: 0 }}
          >
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "action.hover",
                flexShrink: 0,
              }}
            >
              <RestaurantOutlinedIcon color='primary' />
            </Box>

            <Box minWidth={0}>
              <Typography fontWeight={700} noWrap>
                {order.restaurant?.name || "Restaurant"}
              </Typography>

              <Typography
                variant='body2'
                color='text.secondary'
                noWrap
                sx={{ mt: 0.25 }}
              >
                Order #{order.orderNumber}
              </Typography>
            </Box>
          </Stack>

          <Chip
            label={status.label}
            color={status.color}
            size='small'
            sx={{
              fontWeight: 600,
              flexShrink: 0,
            }}
          />
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* Order Information */}

        <Stack spacing={1.25}>
          <Stack direction='row' sx={{ justifyContent: "space-between" }}>
            <Typography variant='body2' color='text.secondary'>
              Ordered
            </Typography>

            <Typography variant='body2' fontWeight={500}>
              {formattedDate}
            </Typography>
          </Stack>

          <Stack direction='row' sx={{ justifyContent: "space-between" }}>
            <Typography variant='body2' color='text.secondary'>
              Payment
            </Typography>

            <Typography variant='body2' fontWeight={500}>
              {order.paymentStatus}
            </Typography>
          </Stack>

          <Stack
            direction='row'
            sx={{ justifyContent: "space-between", alignItems: "center" }}
            justifyContent='space-between'
            alignItems='center'
          >
            <Typography variant='body2' color='text.secondary'>
              Total
            </Typography>

            <Typography variant='h6' fontWeight={800}>
              ₹{order.totalAmount}
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* Action */}

        <Button
          fullWidth
          variant='outlined'
          endIcon={<ArrowForwardIcon />}
          onClick={() => onViewOrder(order.id)}
        >
          View Order
        </Button>
      </CardContent>
    </Card>
  );
}

export default OrderCard;
