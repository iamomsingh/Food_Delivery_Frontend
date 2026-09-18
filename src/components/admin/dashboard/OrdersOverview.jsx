import {
  Box,
  Card,
  CardContent,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

const orderStatuses = [
  {
    key: "placedOrders",
    label: "Placed",
  },
  {
    key: "acceptedOrders",
    label: "Accepted",
  },
  {
    key: "preparingOrders",
    label: "Preparing",
  },
  {
    key: "readyForPickupOrders",
    label: "Ready for Pickup",
  },
  {
    key: "pickedUpOrders",
    label: "Picked Up",
  },
  {
    key: "outForDeliveryOrders",
    label: "Out for Delivery",
  },
  {
    key: "deliveredOrders",
    label: "Delivered",
  },
  {
    key: "cancelledOrders",
    label: "Cancelled",
  },
  {
    key: "rejectedOrders",
    label: "Rejected",
  },
];

function OrdersOverview({ orders, loading = false }) {
  return (
    <Card
      sx={{
        borderRadius: 3,
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Stack spacing={2.5}>
          {/* Section header */}
          <Box>
            <Typography variant='h6' fontWeight={600}>
              Order Status
            </Typography>

            {!loading && orders && (
              <Typography
                variant='body2'
                color='textSecondary'
                sx={{ mt: 0.5 }}
              >
                {orders.activeOrders ?? 0} active ·{" "}
                {orders.completedOrders ?? 0} completed
              </Typography>
            )}

            {loading && <Skeleton variant='text' width={180} />}
          </Box>

          {/* Status tiles */}
          <Grid container spacing={1.5}>
            {orderStatuses.map((status) => (
              <Grid
                key={status.key}
                size={{
                  xs: 6,
                  sm: 4,
                  md: 3,
                  lg: 2,
                }}
              >
                <Box
                  sx={{
                    p: 1.5,

                    border: 1,
                    borderColor: "divider",
                    borderRadius: 2,

                    bgcolor: "background.default",
                  }}
                >
                  <Stack spacing={0.75}>
                    <Typography
                      variant='caption'
                      color='text.secondary'
                      sx={{
                        minHeight: 32,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {status.label}
                    </Typography>

                    {loading ? (
                      <Skeleton variant='text' width={35} height={30} />
                    ) : (
                      <Typography variant='h6' fontWeight={700}>
                        {orders?.[status.key] ?? 0}
                      </Typography>
                    )}
                  </Stack>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default OrdersOverview;
