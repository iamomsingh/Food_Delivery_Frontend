import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";

import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";
import CircleIcon from "@mui/icons-material/Circle";

function PerformanceItem({ icon, label, value }) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: "action.hover",
        height: "100%",
      }}
    >
      <Stack spacing={1}>
        {icon}

        <Typography variant='body2' color='textSecondary'>
          {label}
        </Typography>

        <Typography variant='h5' fontWeight={700}>
          {value}
        </Typography>
      </Stack>
    </Box>
  );
}

function DeliveryPerformanceCard({ profile, stats }) {
  const totalDeliveries =
    stats?.totalDeliveries ?? profile?.totalDeliveries ?? 0;

  const averageRating = stats?.averageRating ?? profile?.averageRating ?? "0.0";

  const totalReviews = profile?.totalReviews ?? 0;

  const isOnline = stats?.isOnline ?? profile?.isOnline ?? false;

  return (
    <Card
      sx={{
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography variant='h6' fontWeight={700}>
          Performance
        </Typography>

        <Typography
          variant='body2'
          color='textSecondary'
          sx={{ mt: 0.5, mb: 2.5 }}
        >
          Your delivery performance overview.
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <PerformanceItem
              icon={<LocalShippingOutlinedIcon color='primary' />}
              label='Total Deliveries'
              value={totalDeliveries}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <PerformanceItem
              icon={<StarOutlinedIcon color='warning' />}
              label='Average Rating'
              value={Number(averageRating).toFixed(1)}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <PerformanceItem
              icon={<ReviewsOutlinedIcon color='info' />}
              label='Total Reviews'
              value={totalReviews}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <PerformanceItem
              icon={
                <CircleIcon
                  sx={{
                    fontSize: 14,
                    color: isOnline ? "success.main" : "text.disabled",
                  }}
                />
              }
              label='Current Status'
              value={isOnline ? "Online" : "Offline"}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default DeliveryPerformanceCard;
