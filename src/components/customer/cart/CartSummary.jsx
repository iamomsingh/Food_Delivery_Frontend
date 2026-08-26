import { useNavigate } from "react-router-dom";

import { Box, Button, Divider, Stack, Typography } from "@mui/material";

function CartSummary({ pricing }) {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        p: 3,
        width: "100%",
        boxSizing: "border-box",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        position: "sticky",
        top: 24,
      }}
    >
      <Typography
        variant='h6'
        fontWeight={900}
        sx={{ mb: 3, textAlign: "center" }}
      >
        Bill Details
      </Typography>

      <Stack spacing={2}>
        {/* Subtotal */}
        <Stack
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "center",
          }}
        >
          <Typography color='text.secondary'>Item Total</Typography>

          <Typography>₹{pricing.subtotalAmount}</Typography>
        </Stack>

        {/* Delivery */}
        <Stack
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "center",
          }}
        >
          <Typography color='text.secondary'>Delivery Fee</Typography>

          <Typography>₹{pricing.deliveryFee}</Typography>
        </Stack>

        {/* Tax */}
        <Stack
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "center",
          }}
        >
          <Typography color='text.secondary'>Tax</Typography>

          <Typography>₹{pricing.taxAmount}</Typography>
        </Stack>

        {/* Discount */}
        <Stack
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "center",
          }}
        >
          <Typography color='text.secondary'>Discount</Typography>

          <Typography color='success.main'>
            - ₹{pricing.discountAmount}
          </Typography>
        </Stack>
      </Stack>

      <Divider sx={{ my: 2.5 }} />

      {/* Total */}
      <Stack
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          alignItems: "center",
        }}
      >
        <Typography variant='h6' fontWeight={700}>
          Total
        </Typography>

        <Typography variant='h6' fontWeight={700}>
          ₹{pricing.totalAmount}
        </Typography>
      </Stack>

      <Button
        fullWidth
        variant='contained'
        size='large'
        onClick={() => navigate("/checkout")}
        sx={{
          mt: 3,
          borderRadius: 2,
          py: 1.4,
          fontWeight: 700,
        }}
      >
        Proceed to Checkout
      </Button>
    </Box>
  );
}

export default CartSummary;
