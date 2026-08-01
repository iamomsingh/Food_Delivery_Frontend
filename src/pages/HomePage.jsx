import { useState, useEffect } from "react";

import { Box, Container } from "@mui/material";

import HeroSection from "../components/HeroSection";
import RestaurantFilters from "../components/RestaurantFilters";
import RestaurantList from "../components/RestaurantList";
import CategorySection from "../components/CategorySection";
import RestaurantSection from "../components/RestaurantSection";
import { getRestaurants } from "../api/restaurantApi";
import RestaurantGridSkeleton from "../components/RestaurantGridSkeleton";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";

function HomePage() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchRestaurants() {
    try {
      setLoading(true);
      setError(null);

      const data = await getRestaurants();
      setRestaurants(data.restaurants);
      console.log(data.restaurants);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch = restaurant.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || restaurant.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const sortedRestaurants = [...filteredRestaurants];

  function clearFilters() {
    setSearchTerm("");
    setSelectedCategory("All");
    setSortBy("default");
  }

  if (loading) {
    return <RestaurantGridSkeleton />;
  }

  if (error) {
    return (
      <ErrorState
        title='Unable to load restaurants'
        message={error || "Something went wrong. Please try again."}
        onRetry={fetchRestaurants}
      />
    );
  }

  if (sortedRestaurants.length === 0) {
    return (
      <EmptyState
        title='No Restaurants Found'
        message='Try changing your search or category.'
        actionLabel='Clear Filters'
        onAction={clearFilters}
      />
    );
  }

  switch (sortBy) {
    case "rating":
      sortedRestaurants.sort((a, b) => b.rating - a.rating);
      break;

    case "name":
      sortedRestaurants.sort((a, b) => a.name.localeCompare(b.name));
      break;

    default:
      break;
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
          restaurants={sortedRestaurants}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </Container>
    </Box>
  );
}

export default HomePage;
