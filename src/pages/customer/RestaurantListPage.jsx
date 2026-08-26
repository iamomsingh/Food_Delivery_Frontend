import { Box, Container } from "@mui/material";

import RestaurantFilters from "../../components/customer/restaurant/RestaurantFilters";
import RestaurantList from "../../components/customer/restaurant/RestaurantList";

function RestaurantListPage() {
  return (
    <Box component='main'>
      <Container maxWidth='lg'>
        <RestaurantFilters />

        <RestaurantList searchTerm='' selectedCategory='All' sortBy='default' />
      </Container>
    </Box>
  );
}

export default RestaurantListPage;
