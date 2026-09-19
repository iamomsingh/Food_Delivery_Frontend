import {
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

function OrderDeliveryCard({ delivery }) {
  if (!delivery) {
    return null;
  }

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
          <Stack direction='row' spacing={1} sx={{ alignItems: "center" }}>
            <LocationOnOutlinedIcon fontSize='small' color='action' />

            <Typography variant='h6' fontWeight={600}>
              Delivery Address
            </Typography>
          </Stack>

          <Divider />

          <Stack spacing={1}>
            <Stack direction='row' spacing={1} sx={{ alignItems: "center" }}>
              <PersonOutlineOutlinedIcon fontSize='small' color='action' />

              <Typography variant='body2' fontWeight={600}>
                {delivery.name || "—"}
              </Typography>
            </Stack>

            <Stack direction='row' spacing={1} sx={{ alignItems: "center" }}>
              <PhoneOutlinedIcon fontSize='small' color='action' />

              <Typography variant='body2'>{delivery.phone || "—"}</Typography>
            </Stack>
          </Stack>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography variant='caption' color='textSecondary'>
                Address
              </Typography>

              <Typography variant='body2'>{delivery.address || "—"}</Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant='caption' color='text.Secondary'>
                Landmark
              </Typography>

              <Typography variant='body2'>
                {delivery.landmark || "—"}
              </Typography>
            </Grid>

            <Grid size={{ xs: 6, md: 3 }}>
              <Typography variant='caption' color='textSecondary'>
                City
              </Typography>

              <Typography variant='body2'>{delivery.city || "—"}</Typography>
            </Grid>

            <Grid size={{ xs: 6, md: 3 }}>
              <Typography variant='caption' color='textSecondary'>
                State
              </Typography>

              <Typography variant='body2'>{delivery.state || "—"}</Typography>
            </Grid>

            <Grid size={{ xs: 6, md: 3 }}>
              <Typography variant='caption' color='textSecondary'>
                Country
              </Typography>

              <Typography variant='body2'>{delivery.country || "—"}</Typography>
            </Grid>

            <Grid size={{ xs: 6, md: 3 }}>
              <Typography variant='caption' color='textSecondary'>
                Pincode
              </Typography>

              <Typography variant='body2'>{delivery.pincode || "—"}</Typography>
            </Grid>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default OrderDeliveryCard;
