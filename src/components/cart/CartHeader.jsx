import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

function CartHeader() {
  const { totalItems } = useContext(CartContext);
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant='h4' fontWeight={700} gutterBottom>
        My Cart
      </Typography>

      <Typography variant='body1' color='text.secondary'>
        {totalItems} {totalItems === 1 ? "Item" : "Items"}
      </Typography>
    </Box>
  );
}

export default CartHeader;
