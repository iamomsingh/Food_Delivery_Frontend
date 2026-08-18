import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Container, Stack, Typography } from "@mui/material";

import { fetchCart } from "../features/cart/cartSlice";

import CartRestaurantHeader from "../components/cart/CartRestaurantHeader";
import CartItemList from "../components/cart/CartItemsList";
import CartSummary from "../components/cart/CartSummary";
import EmptyCart from "../components/cart/EmptyCart";
import ErrorState from "../components/ErrorState";
import CartPageSkeleton from "../components/cart/CartPageSkeleton";

function CartPage() {
  const dispatch = useDispatch();

  const { cart, loading, error } = useSelector((state) => state.cart);

  if (loading) {
    return (
      <Box component='main'>
        <Container maxWidth='lg' sx={{ py: 5 }}>
          <Typography variant='h4' fontWeight={700} sx={{ mb: 4 }}>
            Your Cart
          </Typography>

          <CartPageSkeleton />
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Box component='main'>
        <Container maxWidth='lg' sx={{ py: 5 }}>
          <Typography variant='h4' fontWeight={700} sx={{ mb: 4 }}>
            Your Cart
          </Typography>

          <ErrorState
            title='Unable to load your cart'
            message={error}
            onRetry={() => dispatch(fetchCart())}
          />
        </Container>
      </Box>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <Box component='main'>
        <Container maxWidth='lg' sx={{ py: 5 }}>
          <Typography variant='h4' fontWeight={700} sx={{ mb: 4 }}>
            Your Cart
          </Typography>

          <EmptyCart />
        </Container>
      </Box>
    );
  }

  return (
    <Box component='main'>
      <Container maxWidth='lg'>
        <Typography variant='h4' fontWeight={700} sx={{ mb: 4 }}>
          Your Cart
        </Typography>

        <Box>
          <CartRestaurantHeader
            restaurant={cart.restaurant}
            totalItems={cart.totalItems}
          />

          <Box
            sx={{
              mt: 4,
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "minmax(0, 1fr) 360px",
              },
              gap: 3,
              alignItems: "start",
            }}
          >
            <CartItemList items={cart.items} />

            <CartSummary pricing={cart.pricing} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default CartPage;
