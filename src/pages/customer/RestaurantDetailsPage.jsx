import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Box, Container } from "@mui/material";

import RestaurantHeader from "../../components/customer/restaurant/RestaurantHeader";
import MenuSection from "../../components/customer/menu/MenuSection";
import RestaurantCardSkeleton from "../../components/customer/restaurant/RestaurantCardSkeleton";
import ErrorState from "../../components/common/ErrorState";
import RestaurantReviews from "../../components/customer/restaurant/RestaurantReviews";

import { fetchRestaurantDetails } from "../../features/customer/restaurantSlice";

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
    return <RestaurantCardSkeleton />;
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
        <RestaurantReviews
          restaurantId={restaurant.id}
          restaurant={restaurant}
        />
      </Container>
    </Box>
  );
}

export default RestaurantDetailsPage;
