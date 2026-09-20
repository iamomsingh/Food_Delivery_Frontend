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

function ActiveDeliveryCard({ order }) {
  const navigate = useNavigate();

  const {
    orderId,
    status,
    totalAmount,
    restaurant,
    customer,
    deliveryAddress,
  } = order;

  return (
    <Card
      elevation={0}
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 3,
        height: "100%",
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
            <Box>
              <Typography variant='caption' color='textSecondary'>
                Order
              </Typography>

              <Typography
                variant='subtitle1'
                fontWeight={700}
                sx={{
                  wordBreak: "break-all",
                }}
              >
                #{orderId.slice(0, 8)}
              </Typography>
            </Box>

            <Chip
              label={getStatusLabel(status)}
              color={getStatusColor(status)}
              size='small'
              sx={{ fontWeight: 600 }}
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
                {restaurant?.name}
              </Typography>

              <Typography variant='caption' color='textSecondary'>
                {restaurant?.phone}
              </Typography>
            </Box>
          </Stack>

          {/* Customer */}
          <Stack
            direction='row'
            spacing={1.5}
            sx={{ alignItems: "flex-start" }}
          >
            <PersonOutlineOutlinedIcon color='action' fontSize='small' />

            <Box>
              <Typography variant='body2' fontWeight={600}>
                {customer?.name}
              </Typography>

              <Typography variant='caption' color='textSecondary'>
                {customer?.phone || "Phone not available"}
              </Typography>
            </Box>
          </Stack>

          {/* Address */}
          <Stack
            direction='row'
            spacing={1.5}
            sx={{ alignItems: "flex-start" }}
          >
            <LocationOnOutlinedIcon color='action' fontSize='small' />

            <Box>
              <Typography variant='body2' fontWeight={600}>
                {deliveryAddress?.label || "Delivery Address"}
              </Typography>

              <Typography variant='body2' color='textSecondary'>
                {deliveryAddress?.address}
              </Typography>

              <Typography variant='caption' color='textSecondary'>
                {deliveryAddress?.city}, {deliveryAddress?.state}{" "}
                {deliveryAddress?.pinCode}
              </Typography>
            </Box>
          </Stack>

          <Divider />

          {/* Footer */}
          <Stack
            direction='row'
            spacing={2}
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant='caption' color='textSecondary'>
                Order Amount
              </Typography>

              <Typography variant='h6' fontWeight={700}>
                ₹{Number(totalAmount).toFixed(2)}
              </Typography>
            </Box>

            <Button
              variant='outlined'
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate(`/delivery/orders/${orderId}`)}
            >
              View
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default ActiveDeliveryCard;
