import { useSelector } from "react-redux";

import {
  Box,
  Card,
  CardContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";

import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";

function PaymentSection({ paymentMethod, onPaymentMethodChange }) {
  const cart = useSelector((state) => state.cart.cart);

  if (!cart) {
    return null;
  }

  return (
    <Box component='section'>
      <Typography variant='h5' fontWeight={700}>
        Payment Method
      </Typography>

      <Typography
        variant='body2'
        color='text.secondary'
        sx={{ mt: 0.5, mb: 2 }}
      >
        Choose how you want to pay for your order.
      </Typography>

      <RadioGroup
        value={paymentMethod}
        onChange={(event) => onPaymentMethodChange(event.target.value)}
      >
        <Card
          elevation={0}
          sx={{
            border: "2px solid",
            borderColor: paymentMethod === "COD" ? "primary.main" : "divider",
            borderRadius: 3,
            transition: "0.2s",
          }}
        >
          <CardContent sx={{ p: 2 }}>
            <FormControlLabel
              value='COD'
              control={<Radio />}
              sx={{
                width: "100%",
                m: 0,
                alignItems: "flex-start",
              }}
              label={
                <Stack direction='row' spacing={1.5} alignItems='center'>
                  <PaymentsOutlinedIcon color='primary' />

                  <Box>
                    <Typography fontWeight={700}>Cash on Delivery</Typography>

                    <Typography
                      variant='body2'
                      color='text.secondary'
                      sx={{ mt: 0.25 }}
                    >
                      Pay when your order is delivered.
                    </Typography>
                  </Box>
                </Stack>
              }
            />
          </CardContent>
        </Card>
      </RadioGroup>
    </Box>
  );
}

export default PaymentSection;
