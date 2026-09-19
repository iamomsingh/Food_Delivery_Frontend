import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";

import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";

function OrderRestaurantCard({ restaurant }) {
  if (!restaurant) {
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
            <StorefrontOutlinedIcon fontSize='small' color='action' />

            <Typography variant='h6' fontWeight={600}>
              Restaurant
            </Typography>
          </Stack>

          <Divider />

          <Stack spacing={1.25}>
            <Typography variant='body1' fontWeight={700}>
              {restaurant.name}
            </Typography>

            <Stack direction='row' spacing={1} sx={{ alignItems: "center" }}>
              <LinkOutlinedIcon fontSize='small' color='action' />

              <Typography variant='body2' color='textSecondary'>
                {restaurant.slug}
              </Typography>
            </Stack>

            <Stack direction='row' spacing={1} sx={{ alignItems: "center" }}>
              <PhoneOutlinedIcon fontSize='small' color='action' />

              <Typography variant='body2'>{restaurant.phone || "—"}</Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default OrderRestaurantCard;
