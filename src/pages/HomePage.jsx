import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { Box, Container } from "@mui/material";

import { fetchRestaurants } from "../features/restaurants/restaurantSlice";

import HeroSection from "../components/HeroSection";
import CategorySection from "../components/CategorySection";
import RestaurantSection from "../components/RestaurantSection";

function HomePage() {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  function clearFilters() {
    setSearchTerm("");
    setSelectedCategory("All");
    setSortBy("default");
  }

  return (
    <Box component='main'>
      <Container maxWidth='lg'>
        <HeroSection searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <CategorySection
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <RestaurantSection
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          clearFilters={clearFilters}
          onRetry={() => dispatch(fetchRestaurants())}
        />
      </Container>
    </Box>
  );
}

export default HomePage;
