import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { Box, Container, Typography } from "@mui/material";
import RestaurantHeader from "../components/RestaurantHeader";
import MenuSection from "../components/MenuSection";
import { getRestaurantDetails } from "../api/restaurantApi";
import RestaurantGridSkeleton from "../components/RestaurantGridSkeleton";
import ErrorState from "../components/ErrorState";

function RestaurantDetailsPage() {
  const [restaurant, setRestaurant] = useState(null);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { restaurantId } = useParams();

  async function fetchRestaurantDetails() {
    try {
      setLoading(true);
      setError(null);

      const data = await getRestaurantDetails(restaurantId);

      setRestaurant(data.restaurant);

      setMenus(data.menus);
    } catch (error) {
      console.error(error);

      setError("Failed to load restaurant.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRestaurantDetails();
  }, [restaurantId]);

  if (loading) {
    return <RestaurantGridSkeleton />;
  }

  if (error) {
    return (
      <ErrorState
        title='Unable to load restaurant'
        message={error}
        onRetry={fetchRestaurantDetails}
      />
    );
  }

  return (
    <Box component='main'>
      <Container maxWidth='lg' sx={{ py: 4 }}>
        <RestaurantHeader restaurant={restaurant} />
        <MenuSection menus={menus} />
      </Container>
    </Box>
  );
}

export default RestaurantDetailsPage;
