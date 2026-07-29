import { Box, Chip, Typography } from "@mui/material";

function RestaurantFilters({ activeFilter, onFilterChange }) {
  const filters = ["All", "Top Rated", "Fast Delivery", "Free Delivery"];

  return (
    <Box sx={{ my: 2 }}>
      <Typography variant='h5' component='h2' sx={{ mb: 2 }}>
        Popular near you
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          overflowX: "auto",
          pb: 1,
        }}
      >
        {filters.map((filter) => (
          <Chip
            key={filter}
            label={filter}
            clickable
            color={activeFilter === filter ? "primary" : "default"}
            variant={activeFilter === filter ? "filled" : "outlined"}
            onClick={() => onFilterChange(filter)}
          />
        ))}
      </Box>
    </Box>
  );
}

export default RestaurantFilters;
