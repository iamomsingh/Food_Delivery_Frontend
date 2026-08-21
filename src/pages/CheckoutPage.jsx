import { Box, Container, Stack, Typography } from "@mui/material";

function CheckoutPage() {
  return (
    <Box component='main'>
      <Container maxWidth='lg' sx={{ py: 2 }}>
        <Typography variant='h4' fontWeight={700} sx={{ mb: 4 }}>
          Checkout
        </Typography>

        <Typography>Checkout page coming next...</Typography>
      </Container>
    </Box>
  );
}

export default CheckoutPage;
