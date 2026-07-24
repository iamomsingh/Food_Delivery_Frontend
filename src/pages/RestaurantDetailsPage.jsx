import { useParams } from "react-router";

import { Container, Typography } from "@mui/material";

function RestaurantDetailsPage() {
  const { restaurantId } = useParams();

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Typography variant='h4'>Restaurant Details</Typography>

      <Typography color='text.secondary'>
        Restaurant ID: {restaurantId}
      </Typography>
    </Container>
  );
}

export default RestaurantDetailsPage;
