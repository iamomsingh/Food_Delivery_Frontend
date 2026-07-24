import { useState } from "react";

import { Box, Container } from "@mui/material";

import HeroSection from "../components/HeroSection";
import RestaurantFilters from "../components/RestaurantFilters";
import RestaurantList from "../components/RestaurantList";

import { restaurants } from "../data/restaurants";

function HomePage() {
  const [activeFilter, setActiveFilter] = useState("All");

  let visibleRestaurants = restaurants;

  if (activeFilter === "Top Rated") {
    visibleRestaurants = restaurants.filter(
      (restaurant) => restaurant.rating >= 4.5,
    );
  }

  if (activeFilter === "Fast Delivery") {
    visibleRestaurants = restaurants.filter(
      (restaurant) => restaurant.deliveryMinutes <= 25,
    );
  }

  if (activeFilter === "Free Delivery") {
    visibleRestaurants = restaurants.filter(
      (restaurant) => restaurant.deliveryFee === 0,
    );
  }

  return (
    <Box component='main'>
      <Container maxWidth='lg'>
        <HeroSection />

        <RestaurantFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <RestaurantList restaurants={visibleRestaurants} />
      </Container>
    </Box>
  );
}

export default HomePage;
