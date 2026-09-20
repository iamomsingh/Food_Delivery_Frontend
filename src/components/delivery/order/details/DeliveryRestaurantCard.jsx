import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";

import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";

function DeliveryRestaurantCard({ restaurant }) {
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        border: 1,
        borderColor: "divider",
        borderRadius: 3,
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Stack spacing={2}>
          <Stack direction='row' spacing={1.5} sx={{ alignItems: "center" }}>
            <RestaurantOutlinedIcon color='primary' />

            <Typography variant='h6' fontWeight={700}>
              Restaurant
            </Typography>
          </Stack>

          <Divider />

          <Stack spacing={1}>
            <Typography variant='body1' fontWeight={600}>
              {restaurant?.name}
            </Typography>

            <Stack direction='row' spacing={1} sx={{ alignItems: "center" }}>
              <PhoneOutlinedIcon fontSize='small' color='action' />

              <Typography variant='body2' color='textSecondary'>
                {restaurant?.phone || "Phone not available"}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default DeliveryRestaurantCard;
