import { Box, Stack, Typography } from "@mui/material";

import CartItemCard from "./CartItemCard";

function CartItemList({ items }) {
  return (
    <Box>
      {/* <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        sx={{ mb: 2 }}
      >
        <Typography variant='h6' fontWeight={700}>
          Your Items
        </Typography>

        <Typography variant='body2' color='text.secondary'>
          {items.length} {items.length === 1 ? "item" : "items"}
        </Typography>
      </Stack> */}

      <Stack spacing={2}>
        {items.map((item) => (
          <CartItemCard key={item.cartItemId} item={item} />
        ))}
      </Stack>
    </Box>
  );
}

export default CartItemList;
