import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";

import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

function getStatusColor(status) {
  switch (status) {
    case "READY_FOR_PICKUP":
      return "warning";

    case "PICKED_UP":
      return "info";

    case "OUT_FOR_DELIVERY":
      return "primary";

    case "DELIVERED":
      return "success";

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

    case "DELIVERED":
      return "Delivered";

    default:
      return status;
  }
}

function DeliveryOrderHeader({ order }) {
  return (
    <Card
      elevation={0}
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 3,
      }}
    >
      <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
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
          <Stack direction='row' spacing={2} sx={{ alignItems: "center" }}>
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: 2.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "action.hover",
                color: "primary.main",
              }}
            >
              <LocalShippingOutlinedIcon />
            </Box>

            <Box>
              <Typography variant='caption' color='text.secondary'>
                Order
              </Typography>

              <Typography
                variant='h6'
                fontWeight={700}
                sx={{ wordBreak: "break-all" }}
              >
                #{order?.id}
              </Typography>
            </Box>
          </Stack>

          <Chip
            label={getStatusLabel(order?.status)}
            color={getStatusColor(order?.status)}
            sx={{ fontWeight: 600 }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}

export default DeliveryOrderHeader;
