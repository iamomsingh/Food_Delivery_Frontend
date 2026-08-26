import { useSelector } from "react-redux";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

function OrderSummary() {
  const cart = useSelector((state) => state.cart.cart);

  if (!cart || !cart.items?.length) {
    return null;
  }

  const { restaurant, items, pricing } = cart;

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant='h5' sx={{ textAlign: "center", fontWeight: 700 }}>
          Order Summary
        </Typography>

        {restaurant && (
          <Box sx={{ mt: 2 }}>
            <Typography variant='body1' sx={{ fontWeight: 700 }}>
              {restaurant.name}
            </Typography>

            <Typography
              variant='body2'
              color='text.secondary'
              sx={{ mt: 0.25 }}
            >
              Your order from this restaurant
            </Typography>
          </Box>
        )}

        <Divider sx={{ my: 2.5 }} />

        {/* Cart Items */}

        <Stack spacing={2}>
          {items.map((item) => {
            const menuItem = item.menuItem;

            return (
              <Stack
                key={item.cartItemId}
                direction='row'
                spacing={1.5}
                sx={{ alignItems: "center" }}
              >
                <CardMedia
                  component='img'
                  image={menuItem?.imageUrl || "https://placehold.co/80"}
                  alt={menuItem?.name}
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 2,
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />

                <Box
                  sx={{
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <Typography variant='body2' sx={{ fontWeight: 550 }} noWrap>
                    {menuItem?.name}
                  </Typography>

                  <Stack
                    direction='row'
                    spacing={0.75}
                    sx={{ mt: 0.5, alignItems: "center" }}
                  >
                    <Chip
                      label={`Qty ${item.quantity}`}
                      size='small'
                      sx={{
                        height: 22,
                        fontSize: "0.7rem",
                      }}
                    />

                    <Typography variant='caption' color='text.secondary'>
                      ₹{item.unitPrice} each
                    </Typography>
                  </Stack>
                </Box>

                <Typography
                  variant='body2'
                  fontWeight={700}
                  sx={{ flexShrink: 0, fontWeight: 600 }}
                >
                  ₹{item.totalPrice}
                </Typography>
              </Stack>
            );
          })}
        </Stack>

        <Divider sx={{ my: 2.5 }} />

        <Stack spacing={1.25}>
          <Stack direction='row' sx={{ justifyContent: "space-between" }}>
            <Typography color='text.secondary'>Subtotal</Typography>

            <Typography sx={{ fontWeight: 600 }}>
              ₹{pricing.subtotalAmount}
            </Typography>
          </Stack>

          <Stack direction='row' sx={{ justifyContent: "space-between" }}>
            <Typography color='text.secondary'>Delivery Fee</Typography>

            <Typography sx={{ fontWeight: 600 }}>
              ₹{pricing.deliveryFee}
            </Typography>
          </Stack>

          <Stack direction='row' sx={{ justifyContent: "space-between" }}>
            <Typography color='text.secondary'>Taxes</Typography>

            <Typography sx={{ fontWeight: 600 }}>
              ₹{pricing.taxAmount}
            </Typography>
          </Stack>

          {Number(pricing.discountAmount) > 0 && (
            <Stack direction='row' sx={{ justifyContent: "space-between" }}>
              <Typography color='success.main'>Discount</Typography>

              <Typography color='success.main' sx={{ fontWeight: 700 }}>
                -₹{pricing.discountAmount}
              </Typography>
            </Stack>
          )}
        </Stack>

        <Divider sx={{ my: 2.5 }} />

        <Stack
          direction='row'
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Box>
            <Typography variant='h6' sx={{ fontWeight: 700 }}>
              Total
            </Typography>

            <Typography variant='caption' color='text.secondary'>
              Inclusive of all applicable charges
            </Typography>
          </Box>

          <Typography variant='h5' sx={{ fontWeight: 800 }}>
            ₹{pricing.totalAmount}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default OrderSummary;
