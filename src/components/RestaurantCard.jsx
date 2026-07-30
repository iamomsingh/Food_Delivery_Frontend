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
import { Link } from "react-router";

function RestaurantCard({ restaurant }) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: {
            md: "translateY(-4px)",
          },

          boxShadow: {
            md: 6,
          },
        },
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

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Typography variant='body2'>{restaurant.deliveryTime}</Typography>

          <Typography variant='body2' color='text.secondary'>
            {restaurant.deliveryFee === 0
              ? "Free delivery"
              : `₹${restaurant.deliveryFee} delivery`}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          fullWidth
          variant='contained'
          component={Link}
          to={`/restaurants/${restaurant.id}`}
        >
          View Restaurant
        </Button>
      </CardActions>
    </Card>
  );
}

export default RestaurantCard;
