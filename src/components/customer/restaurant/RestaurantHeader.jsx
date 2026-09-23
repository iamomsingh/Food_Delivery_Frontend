import {
  Avatar,
  Box,
  CardMedia,
  Chip,
  Divider,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

function RestaurantHeader({ restaurant }) {
  return (
    <Box component='section'>
      {/* Cover Image */}
      <CardMedia
        component='img'
        image={restaurant.coverImageUrl || "https://placehold.co/1200x350"}
        alt={restaurant.name}
        sx={{
          height: { xs: 220, md: 320 },
          borderRadius: 3,
          objectFit: "cover",
        }}
      />

      {/* Restaurant Info */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={4}
        sx={{
          mt: -6,
          px: 4,
          position: "relative",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Avatar
          src={restaurant.logoUrl}
          alt={restaurant.name}
          sx={{
            width: 110,
            height: 110,
            border: "4px solid white",
            boxShadow: 3,
            bgcolor: "grey.200",
          }}
        />

        <Box flex={1}>
          <Stack sx={{ mt: { xs: 0, md: 6 } }}>
            <Typography variant='h4' fontWeight={700}>
              {restaurant.name}
            </Typography>

            <Typography variant='body1' color='text.Secondary' sx={{ mt: 1 }}>
              {restaurant.description}
            </Typography>
          </Stack>

          {/* Tags */}
          <Stack direction='row' spacing={1} flexWrap='wrap' sx={{ mt: 3 }}>
            {restaurant.isPureVeg && <Chip label='Pure Veg' color='success' />}

            <Chip icon={<AccessTimeOutlinedIcon />} label='30-40 mins' />
          </Stack>

          {/* Address */}
          {/* <Stack direction='row' spacing={1} alignItems='center' sx={{ mt: 3 }}>
            <LocationOnOutlinedIcon color='action' fontSize='small' />

            <Typography color='text.secondary'>Mumbai, India</Typography>
          </Stack> */}
        </Box>

        <Box>
          <Stack>
            {/* Rating Card */}
            <Paper
              elevation={2}
              sx={{
                p: 2,
                minWidth: 120,
                textAlign: "center",
                alignSelf: "flex-start",
              }}
            >
              <Typography fontWeight={700}>
                ⭐ {restaurant.averageRating || 0}
              </Typography>

              <Typography variant='caption' color='text.secondary'>
                {restaurant.totalReviews} Reviews
              </Typography>
            </Paper>
          </Stack>
        </Box>
      </Stack>

      <Divider sx={{ mt: 4 }} />
    </Box>
  );
}

export default RestaurantHeader;
