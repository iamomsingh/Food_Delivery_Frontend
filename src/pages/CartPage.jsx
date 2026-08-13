import { Grid } from "@mui/material";

import CartHeader from "../components/cart/CartHeader";
import CartItemsList from "../components/cart/CartItemsList";
import OrderSummary from "../components/cart/OrderSummary";

function CartPage() {
  return (
    <>
      <CartHeader />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <CartItemsList />
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <OrderSummary />
        </Grid>
      </Grid>
    </>
  );
}

export default CartPage;
