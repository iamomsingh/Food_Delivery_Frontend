import { Container, Typography } from "@mui/material";

function OrderDetailsPage() {
  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Typography variant='h4' component='h1' fontWeight={700}>
        Order Details Page
      </Typography>
    </Container>
  );
}

export default OrderDetailsPage;
