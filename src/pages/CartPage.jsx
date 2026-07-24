import { Container, Typography } from "@mui/material";

function CartPage() {
  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Typography variant='h4' component='h1' fontWeight={700}>
        Your Cart
      </Typography>
    </Container>
  );
}

export default CartPage;
