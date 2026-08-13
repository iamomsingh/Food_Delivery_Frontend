import { useSelector } from "react-redux";

import { Box, Typography } from "@mui/material";

import RestaurantCard from "./RestaurantCard";
import RestaurantGridSkelton from "./RestaurantGridSkeleton";
import ErrorState from "./ErrorState";
import EmptyState from "./EmptyState";

function RestaurantList({
  searchTerm,
  selectedCategory,
  sortBy,
  clearFilters,
  onRetry,
}) {
  const { restaurants, pagination, loading, error } = useSelector(
    (state) => state.restaurant,
  );

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch = restaurant.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || restaurant.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const sortedRestaurants = [...filteredRestaurants];

  switch (sortBy) {
    case "rating":
      sortedRestaurants.sort((a, b) => b.averageRating - a.averageRating);
      break;

    case "name":
      sortedRestaurants.sort((a, b) => a.name.localeCompare(b.name));
      break;

    default:
      break;
  }

  if (loading) {
    return <RestaurantGridSkelton />;
  }

  if (error) {
    return (
      <ErrorState
        title='Unable to load restaurants'
        message={error || "Something went wrong. Please try again."}
        onRetry={onRetry}
      />
    );
  }

  if (sortedRestaurants.length === 0) {
    return (
      <EmptyState
        title='No Restaurants Found'
        message='Currently there is no active restaurants in your Area.'
        actionLabel='Clear Filters'
        onAction={clearFilters}
      />
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
      {sortedRestaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </Box>
  );
}

export default RestaurantList;
