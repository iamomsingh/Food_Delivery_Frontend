import { useState } from "react";

import { Box, Container } from "@mui/material";

import HeroSection from "../components/HeroSection";
import RestaurantFilters from "../components/RestaurantFilters";
import RestaurantList from "../components/RestaurantList";
import CategorySection from "../components/CategorySection";

import { restaurants } from "../data/restaurants";

function HomePage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  let visibleRestaurants = restaurants;

  if (activeFilter === "Top Rated") {
    visibleRestaurants = restaurants.filter(
      (restaurant) => restaurant.rating >= 4.5,
    );
  }

  if (activeFilter === "Fast Delivery") {
    visibleRestaurants = restaurants.filter(
      (restaurant) => restaurant.deliveryTime <= 25,
    );
  }

  if (activeFilter === "Free Delivery") {
    visibleRestaurants = restaurants.filter(
      (restaurant) => restaurant.deliveryFee === 0,
    );
  }

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch = restaurant.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || restaurant.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <Box component='main'>
      <Container maxWidth='lg'>
        <HeroSection searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <CategorySection
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <RestaurantFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <RestaurantList restaurants={filteredRestaurants} />
      </Container>
    </Box>
  );
}

export default HomePage;
