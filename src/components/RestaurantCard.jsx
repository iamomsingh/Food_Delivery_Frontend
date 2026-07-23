import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import React from "react";

function RestaurantCard({ restaurant, onView }) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <CardMedia
        component='img'
        height='180'
        image={restaurant.imageUrl || "https://placehold.co/600x400"}
        alt={restaurant.name}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            mb: 1,
          }}
        >
          <Typography variant='h6' component='h2' fontWeight={700}>
            {restaurant.name}
          </Typography>

          <Chip label={`${restaurant.rating} ★`} size='small' />
        </Box>

        <Typography variant='body2' color='text.secondary'>
          {restaurant.cuisine}
        </Typography>

        <Typography variant='body2' sx={{ mt: 1 }}>
          {restaurant.deliveryMinutes} min
        </Typography>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          fullWidth
          variant='contained'
          onClick={() => onView(restaurant)}
        >
          View Restaurant
        </Button>
      </CardActions>
    </Card>
  );
}

export default RestaurantCard;
