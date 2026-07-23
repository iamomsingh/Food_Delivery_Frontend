import { Box, Typography } from "@mui/material";
import RestaurantCard from "./RestaurantCard";

function RestaurantList({ restaurants, onRestaurantView }) {
  if (restaurants.length === 0) {
    return (
      <Typography color='text.secondary' sx={{ mt: 4 }}>
        No restaurants found.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",

        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        },

        gap: 2,
        mt: 4,
      }}
    >
      {restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
          onView={onRestaurantView}
        />
      ))}
    </Box>
  );
}

export default RestaurantList;
