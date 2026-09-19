import {
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";

const PAYMENT_STATUS_CONFIG = {
  PENDING: {
    label: "Pending",
    color: "warning",
  },
  PAID: {
    label: "Paid",
    color: "success",
  },
};

function formatCurrency(value) {
  return `₹${Number(value ?? 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function OrderPricingCard({ pricing }) {
  if (!pricing) {
    return null;
  }

  const paymentStatus = PAYMENT_STATUS_CONFIG[pricing.paymentStatus] ?? {
    label: pricing.paymentStatus || "Unknown",
    color: "default",
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        border: 1,
        borderColor: "divider",
        boxShadow: "none",
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
        <Stack spacing={2}>
          <Stack direction='row' spacing={1} sx={{ alignItems: "center" }}>
            <PaymentsOutlinedIcon fontSize='small' color='action' />

            <Typography variant='h6' fontWeight={600}>
              Payment & Pricing
            </Typography>
          </Stack>

          <Divider />

          <Grid container spacing={5}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Stack spacing={1.25}>
                <PriceRow label='Subtotal' value={pricing.subtotalAmount} />

                <PriceRow label='Delivery Fee' value={pricing.deliveryFee} />

                <PriceRow label='Tax' value={pricing.taxAmount} />

                <PriceRow
                  label='Discount'
                  value={pricing.discountAmount}
                  negative
                />

                <Divider sx={{ my: 0.5 }} />

                <Stack
                  direction='row'
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant='body1' fontWeight={700}>
                    Total
                  </Typography>

                  <Typography variant='h6' fontWeight={800}>
                    {formatCurrency(pricing.totalAmount)}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <Stack spacing={2}>
                <Stack spacing={0.75}>
                  <Typography variant='caption' color='textSecondary'>
                    Payment Method
                  </Typography>

                  <Typography variant='body2' fontWeight={700}>
                    {pricing.paymentMethod || "—"}
                  </Typography>
                </Stack>

                <Stack spacing={0.75}>
                  <Typography variant='caption' color='textSecondary'>
                    Payment Status
                  </Typography>

                  <Chip
                    label={paymentStatus.label}
                    color={paymentStatus.color}
                    variant='outlined'
                    size='small'
                    sx={{
                      alignSelf: "flex-start",
                      fontWeight: 600,
                    }}
                  />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
}

function PriceRow({ label, value, negative = false }) {
  return (
    <Stack direction='row' sx={{ justifyContent: "space-between" }} spacing={2}>
      <Typography variant='body2' color='textSecondary'>
        {label}
      </Typography>

      <Typography variant='body2' fontWeight={600}>
        {negative && Number(value ?? 0) > 0 ? "-" : ""}
        {formatCurrency(value)}
      </Typography>
    </Stack>
  );
}

export default OrderPricingCard;
