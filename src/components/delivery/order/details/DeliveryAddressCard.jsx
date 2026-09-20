import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

function DeliveryAddressCard({ address }) {
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
        <Stack spacing={2}>
          <Stack direction='row' spacing={1.5} sx={{ alignItems: "center" }}>
            <LocationOnOutlinedIcon color='primary' />

            <Typography variant='h6' fontWeight={700}>
              Delivery Address
            </Typography>
          </Stack>

          <Divider />

          <Box>
            <Typography variant='body1' fontWeight={600}>
              {address?.label || "Delivery Address"}
            </Typography>

            <Typography variant='body2' color='textSecondary' sx={{ mt: 0.5 }}>
              {address?.address}
            </Typography>

            {address?.landmark && (
              <Typography
                variant='body2'
                color='textSecondary'
                sx={{ mt: 0.5 }}
              >
                Landmark: {address.landmark}
              </Typography>
            )}

            <Typography variant='body2' color='textSecondary' sx={{ mt: 0.5 }}>
              {address?.city}, {address?.state}
            </Typography>

            <Typography variant='body2' color='textSecondary'>
              {address?.country} - {address?.pinCode}
            </Typography>
          </Box>

          {address?.latitude && address?.longitude && (
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                bgcolor: "action.hover",
              }}
            >
              <Typography variant='caption' color='textSecondary'>
                Coordinates
              </Typography>

              <Typography variant='body2'>
                {address.latitude}, {address.longitude}
              </Typography>
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default DeliveryAddressCard;
