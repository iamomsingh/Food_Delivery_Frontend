import {
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";

function formatVehicleType(vehicleType) {
  if (!vehicleType) {
    return "Not available";
  }

  return vehicleType
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function DeliveryVehicleCard({ profile }) {
  return (
    <Card
      sx={{
        height: "100%",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography variant='h6' fontWeight={700}>
          Vehicle Information
        </Typography>

        <Typography
          variant='body2'
          color='textSecondary'
          sx={{ mt: 0.5, mb: 2.5 }}
        >
          Vehicle registered for deliveries.
        </Typography>

        <Stack spacing={2}>
          <Stack direction='row' spacing={1.5} sx={{ alignItems: "center" }}>
            <DirectionsCarIcon color='action' />

            <Stack spacing={0.25}>
              <Typography variant='caption' color='textSecondary'>
                Vehicle Type
              </Typography>

              <Chip
                label={formatVehicleType(profile?.vehicleType)}
                size='small'
              />
            </Stack>
          </Stack>

          <Divider />

          <Stack direction='row' spacing={1.5} sx={{ alignItems: "center" }}>
            <ConfirmationNumberOutlinedIcon color='action' />

            <Stack spacing={0.25}>
              <Typography variant='caption' color='textSecondary'>
                Vehicle Number
              </Typography>

              <Typography variant='body1' fontWeight={600}>
                {profile?.vehicleNumber || "Not available"}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default DeliveryVehicleCard;
