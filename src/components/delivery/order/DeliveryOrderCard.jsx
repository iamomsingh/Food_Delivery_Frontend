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

import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useNavigate } from "react-router-dom";

function getStatusColor(status) {
  switch (status) {
    case "READY_FOR_PICKUP":
      return "warning";

    case "PICKED_UP":
      return "info";

    case "OUT_FOR_DELIVERY":
      return "primary";

    default:
      return "default";
  }
}

function getStatusLabel(status) {
  switch (status) {
    case "READY_FOR_PICKUP":
      return "Ready for Pickup";

    case "PICKED_UP":
      return "Picked Up";

    case "OUT_FOR_DELIVERY":
      return "Out for Delivery";

    default:
      return status;
  }
}

function DeliveryOrderCard({ order }) {
  const navigate = useNavigate();

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        border: 1,
        borderColor: "divider",
        borderRadius: 3,
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 3,
        },
      }}
    >
      <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
        <Stack spacing={2.5}>
          {/* Header */}
          <Stack
            direction='row'
            spacing={2}
            sx={{
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography variant='caption' color='textSecondary'>
                Order ID
              </Typography>

              <Typography
                variant='subtitle1'
                fontWeight={700}
                sx={{
                  wordBreak: "break-all",
                }}
              >
                #{order.orderId}
              </Typography>
            </Box>

            <Chip
              label={getStatusLabel(order.status)}
              color={getStatusColor(order.status)}
              size='small'
              sx={{
                fontWeight: 600,
                flexShrink: 0,
              }}
            />
          </Stack>

          <Divider />

          {/* Restaurant */}
          <Stack
            direction='row'
            spacing={1.5}
            sx={{ alignItems: "flex-start" }}
          >
            <RestaurantOutlinedIcon color='primary' fontSize='small' />

            <Box>
              <Typography variant='body2' fontWeight={600}>
                {order.restaurant?.name}
              </Typography>

              <Typography variant='caption' color='textSecondary'>
                {order.restaurant?.phone}
              </Typography>
            </Box>
          </Stack>

          {/* Customer */}
          <Stack direction='row' spacing={1.5} alignItems='flex-start'>
            <PersonOutlineOutlinedIcon color='action' fontSize='small' />

            <Box>
              <Typography variant='body2' fontWeight={600}>
                {order.customer?.name}
              </Typography>

              <Typography variant='caption' color='textSecondary'>
                {order.customer?.phone || "Phone not available"}
              </Typography>
            </Box>
          </Stack>

          {/* Address */}
          <Stack direction='row' spacing={1.5} alignItems='flex-start'>
            <LocationOnOutlinedIcon color='action' fontSize='small' />

            <Box sx={{ minWidth: 0 }}>
              <Typography variant='body2' fontWeight={600}>
                {order.deliveryAddress?.label || "Delivery Address"}
              </Typography>

              <Typography variant='body2' color='textSecondary'>
                {order.deliveryAddress?.address}
              </Typography>

              <Typography variant='caption' color='textSecondary'>
                {order.deliveryAddress?.city}, {order.deliveryAddress?.state}{" "}
                {order.deliveryAddress?.pinCode}
              </Typography>
            </Box>
          </Stack>

          <Divider />

          {/* Footer */}
          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={2}
            sx={{
              justifyContent: "space-between",
              alignItems: {
                xs: "stretch",
                sm: "center",
              },
            }}
          >
            <Box>
              <Typography variant='caption' color='textSecondary'>
                Order Amount
              </Typography>

              <Typography variant='h6' fontWeight={700}>
                ₹{Number(order.totalAmount).toFixed(2)}
              </Typography>
            </Box>

            <Button
              variant='contained'
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate(`/delivery/orders/${order.orderId}`)}
            >
              View Details
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default DeliveryOrderCard;
