import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";

function PriceRow({ label, value, strong = false }) {
  return (
    <Stack direction='row' sx={{ justifyContent: "space-between" }} spacing={2}>
      <Typography
        variant='body2'
        color={strong ? "text.primary" : "textSecondary"}
        fontWeight={strong ? 700 : 400}
      >
        {label}
      </Typography>

      <Typography variant='body2' fontWeight={strong ? 700 : 500}>
        ₹{Number(value ?? 0).toFixed(2)}
      </Typography>
    </Stack>
  );
}

function DeliveryPricingCard({ order }) {
  return (
    <Card
      elevation={0}
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 3,
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Stack spacing={2}>
          <Typography variant='h6' fontWeight={700}>
            Payment & Pricing
          </Typography>

          <Divider />

          <PriceRow label='Subtotal' value={order?.subtotalAmount} />

          <PriceRow label='Delivery Fee' value={order?.deliveryFee} />

          <PriceRow label='Tax' value={order?.taxAmount} />

          <PriceRow label='Discount' value={order?.discountAmount} />

          <Divider />

          <PriceRow label='Total' value={order?.totalAmount} strong />

          <Stack
            direction='row'
            sx={{ justifyContent: "space-between" }}
            spacing={2}
          >
            <Typography variant='body2' color='textSecondary'>
              Payment Method
            </Typography>

            <Typography variant='body2' fontWeight={600}>
              {order?.paymentMethod}
            </Typography>
          </Stack>

          <Stack
            direction='row'
            sx={{ justifyContent: "space-between" }}
            spacing={2}
          >
            <Typography variant='body2' color='textSecondary'>
              Payment Status
            </Typography>

            <Typography variant='body2' fontWeight={600}>
              {order?.paymentStatus}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default DeliveryPricingCard;
