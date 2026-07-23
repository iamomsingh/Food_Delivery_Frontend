import { useState } from "react";
import RestaurantList from "../components/RestaurantList";
import { restaurants } from "../data/restaurants";
import { Box, Button, Container, Typography } from "@mui/material";

function HomePage() {
  const [showTopRated, setShowTopRated] = useState(false);

  const visibleRestaurants = showTopRated
    ? restaurants.filter((restaurant) => restaurant.rating >= 4.5)
    : restaurants;

  function handleRestaurantClick(restaurant) {
    console.log("Selected:", restaurant);
  }

  return (
    <Container maxWidth='lg'>
      <Box
        component='main'
        sx={{
          py: 4,
        }}
      >
        <Typography variant='h4' component='h1' sx={{ mb: 1, fontWeight: 700 }}>
          Discover restaurants near you
        </Typography>

        <Typography color='text.secondary' sx={{ mb: 3 }}>
          Explore delicious food from restaurants around you.
        </Typography>
      </Box>

      <Button
        variant={showTopRated ? "outlined" : "contained"}
        onClick={() => setShowTopRated((current) => !current)}
      >
        {showTopRated ? "Show All Restaurants" : "Show Top Rated"}
      </Button>

      <RestaurantList
        restaurants={visibleRestaurants}
        onRestaurantView={handleRestaurantClick}
      />
    </Container>
  );
}

export default HomePage;
