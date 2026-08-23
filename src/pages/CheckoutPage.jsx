import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box, Container, Grid, Stack, Typography } from "@mui/material";

import AddressSection from "../components/Address/AddressSection";

import { fetchAddresses } from "../features/address/addressSlice";

function CheckoutPage() {
  const dispatch = useDispatch();
  const { addresses } = useSelector((state) => state.address);

  const [selectedAddressId, setSelectedAddressId] = useState(null);

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
          <Grid size={{ xs: 12, md: 6 }}>
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

              {/* PaymentSection will come here */}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }} sx={{ backgroundColor: "grey.100" }}>
            <Typography>Restaurant order lies here</Typography>
            <Typography>
              Selected Address:{" "}
              {selectedAddress ? JSON.stringify(selectedAddress) : "None"}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default CheckoutPage;
