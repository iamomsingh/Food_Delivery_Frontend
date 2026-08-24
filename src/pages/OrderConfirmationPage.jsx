import { useLocation, useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";

function OrderConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const order = location.state?.order;

  if (!order) {
    return (
      <Container maxWidth='sm' sx={{ py: 8 }}>
        <Card
          elevation={0}
          sx={{ border: "1px solid", borderColor: "divider" }}
        >
          <CardContent sx={{ p: 4, textAlign: "center" }}>
            <Typography variant='h5' fontWeight={700}>
              Order information not found
            </Typography>

            <Typography color='text.secondary' sx={{ mt: 1 }}>
              We couldn't find the order you're looking for.
            </Typography>

            <Button
              variant='contained'
              sx={{ mt: 3 }}
              onClick={() => navigate("/orders")}
            >
              View My Orders
            </Button>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Box component='main'>
      <Container maxWidth='sm' sx={{ py: 8 }}>
        <Card
          elevation={0}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
          }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
            <Stack spacing={2} alignItems='center' textAlign='center'>
              <CheckCircleOutlineIcon color='success' sx={{ fontSize: 72 }} />

              <Typography variant='h4' fontWeight={800}>
                Order Placed Successfully!
              </Typography>

              <Typography color='text.secondary'>
                Your order has been placed and sent to the restaurant.
              </Typography>

              <Box sx={{ pt: 1 }}>
                <Typography variant='body2' color='text.secondary'>
                  Order Number
                </Typography>

                <Typography variant='h6' fontWeight={700}>
                  {order.orderNumber}
                </Typography>
              </Box>

              <Box sx={{ pt: 1 }}>
                <Typography variant='body2' color='text.secondary'>
                  Total Amount
                </Typography>

                <Typography variant='h5' fontWeight={800}>
                  ₹{order.totalAmount}
                </Typography>
              </Box>

              <Box sx={{ pt: 1 }}>
                <Typography variant='body2' color='text.secondary'>
                  Payment Method
                </Typography>

                <Typography fontWeight={600}>
                  {order.paymentMethod === "COD"
                    ? "Cash on Delivery"
                    : order.paymentMethod}
                </Typography>
              </Box>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                sx={{ width: "100%", pt: 2 }}
              >
                <Button
                  fullWidth
                  variant='contained'
                  onClick={() => navigate(`/orders/${order.id}`)}
                >
                  View Order
                </Button>

                <Button
                  fullWidth
                  variant='outlined'
                  onClick={() => navigate("/")}
                >
                  Continue Shopping
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default OrderConfirmationPage;
