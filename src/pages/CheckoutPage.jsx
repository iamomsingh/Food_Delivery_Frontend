import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box, Container, Grid, Stack, Typography } from "@mui/material";

import AddressSection from "../components/Address/AddressSection";

import { fetchAddresses } from "../features/address/addressSlice";
import OrderSummary from "../components/Checkout/OrderSummary";
import PaymentSection from "../components/Checkout/PaymentSection";

function CheckoutPage() {
  const dispatch = useDispatch();
  const { addresses } = useSelector((state) => state.address);

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

  const selectedAddress = addresses.find(
    (address) => address.id === selectedAddressId,
  );

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
            <OrderSummary />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default CheckoutPage;
