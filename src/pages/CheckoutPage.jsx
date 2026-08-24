import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import AddressSection from "../components/Address/AddressSection";
import OrderSummary from "../components/Checkout/OrderSummary";
import PaymentSection from "../components/Checkout/PaymentSection";

import { fetchAddresses } from "../features/address/addressSlice";
import { placeOrder } from "../features/order/orderSlice";
import { clearCartState } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { addresses } = useSelector((state) => state.address);
  const { placing, error: orderError } = useSelector((state) => state.order);
  const cart = useSelector((state) => state.cart.cart);

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  useEffect(() => {
    if (!selectedAddressId && addresses.length > 0) {
      const defaultAddress = addresses.find((address) => address.isDefault);

      if (defaultAddress) {
        setSelectedAddressId(defaultAddress.id);
      } else {
        setSelectedAddressId(addresses[0].id);
      }
    }
  }, [addresses, selectedAddressId]);

  async function handlePlaceOrder() {
    if (!selectedAddressId || !cart) {
      return;
    }

    const result = await dispatch(
      placeOrder({
        deliveryAddressId: selectedAddressId,
        paymentMethod,
      }),
    );

    if (placeOrder.fulfilled.match(result)) {
      dispatch(clearCartState());

      navigate("/order-confirmation", {
        replace: true,
        state: {
          order: result.payload,
        },
      });
    }
  }

  return (
    <Box component='main'>
      <Container maxWidth='lg' sx={{ py: 2 }}>
        <Typography variant='h4' fontWeight={700} sx={{ mb: 4 }}>
          Checkout
        </Typography>

        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={3}>
              <AddressSection
                selectedAddressId={selectedAddressId}
                onSelectAddress={setSelectedAddressId}
                onAddressDeleted={(deletedAddressId) => {
                  if (selectedAddressId === deletedAddressId) {
                    setSelectedAddressId(null);
                  }
                }}
              />

              <PaymentSection
                paymentMethod={paymentMethod}
                onPaymentMethodChange={setPaymentMethod}
              />
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ position: "sticky", top: 24 }}>
              <Stack spacing={2}>
                <OrderSummary />

                {orderError && <Alert severity='error'>{orderError}</Alert>}

                <Button
                  variant='contained'
                  size='large'
                  fullWidth
                  disabled={!selectedAddressId || !cart || placing}
                  onClick={handlePlaceOrder}
                >
                  {placing
                    ? "Placing Order..."
                    : `Place Order • ₹${cart?.pricing?.totalAmount || 0}`}
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default CheckoutPage;
