import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";

import RestaurantList from "./RestaurantList";
import RestaurantListPage from "../pages/RestaurantListPage";

function RestaurantSection({
  searchTerm,
  selectedCategory,
  sortBy,
  onSortChange,
  clearFilters,
  onRetry,
}) {
  return (
    <Box
      component='section'
      sx={{
        py: 3,
      }}
    >
      <Stack spacing={4}>
        <Stack
          direction='row'
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant='h3'>Featured Restaurants</Typography>

          <FormControl size='small' sx={{ width: 220 }}>
            <InputLabel>Sort By</InputLabel>

            <Select
              value={sortBy}
              label='Sort By'
              onChange={(event) => onSortChange(event.target.value)}
            >
              <MenuItem value='default'>Recommended</MenuItem>
              <MenuItem value='rating'>Rating</MenuItem>
              <MenuItem value='deliveryTime'>Delivery Time</MenuItem>
              <MenuItem value='name'>Name (A-Z)</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <RestaurantList
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          sortBy={sortBy}
          clearFilters={clearFilters}
          onRetry={onRetry}
        />
      </Stack>
    </Box>
  );
}

export default RestaurantSection;
