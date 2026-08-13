import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Box, Container, Typography } from "@mui/material";

import RestaurantHeader from "../components/RestaurantHeader";
import MenuSection from "../components/MenuSection";
import RestaurantGridSkeleton from "../components/RestaurantGridSkeleton";
import ErrorState from "../components/ErrorState";

import { fetchRestaurantDetails } from "../features/restaurants/restaurantSlice";

function RestaurantDetailsPage() {
  const { restaurantId } = useParams();

  const dispatch = useDispatch();

  const { restaurantDetails, detailsLoading, detailsError } = useSelector(
    (state) => state.restaurant,
  );

  useEffect(() => {
    dispatch(fetchRestaurantDetails(restaurantId));
  }, [dispatch, restaurantId]);

  if (detailsLoading || !restaurantDetails) {
    return <RestaurantGridSkeleton />;
  }

  if (!restaurantDetails || detailsError) {
    return (
      <ErrorState
        title='Unable to load restaurant'
        message={detailsError}
        onRetry={() => dispatch(fetchRestaurantDetails(restaurantId))}
      />
    );
  }

  const { restaurant, menus } = restaurantDetails;

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
