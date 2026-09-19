import {
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";

function OrderDeliveryPartnerCard({ deliveryPartner }) {
  const isAssigned = deliveryPartner && typeof deliveryPartner === "object";

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
        <Stack spacing={2}>
          <Stack
            direction='row'
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Stack direction='row' spacing={1} sx={{ alignItems: "center" }}>
              <DeliveryDiningOutlinedIcon fontSize='small' color='action' />

              <Typography variant='h6' fontWeight={600}>
                Delivery Partner
              </Typography>
            </Stack>

            <Chip
              size='small'
              label={isAssigned ? "Assigned" : "Not Assigned"}
              color={isAssigned ? "success" : "default"}
              variant='outlined'
            />
          </Stack>

          <Divider />

          {!isAssigned ? (
            <Typography variant='body2' color='text.secondary'>
              {deliveryPartner || "Delivery partner is not assigned now."}
            </Typography>
          ) : (
            <Stack spacing={1.25}>
              <Typography variant='body1' fontWeight={700}>
                {deliveryPartner.name || "Delivery Partner"}
              </Typography>

              {deliveryPartner.phone && (
                <Stack
                  direction='row'
                  spacing={1}
                  sx={{ alignItems: "center" }}
                >
                  <PhoneOutlinedIcon fontSize='small' color='action' />

                  <Typography variant='body2'>
                    {deliveryPartner.phone}
                  </Typography>
                </Stack>
              )}

              {deliveryPartner.vehicleType && (
                <Typography variant='body2' color='textSecondary'>
                  Vehicle: {deliveryPartner.vehicleType}
                </Typography>
              )}
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default OrderDeliveryPartnerCard;
