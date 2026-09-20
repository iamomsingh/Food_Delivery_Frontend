import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";

import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import WifiOutlinedIcon from "@mui/icons-material/WifiOutlined";
import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";

function StatCard({ icon, label, value, subtitle }) {
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        border: 1,
        borderColor: "divider",
        borderRadius: 3,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 3,
        },
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Stack
          direction='row'
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Stack spacing={1}>
            <Typography variant='body2' color='textSecondary' fontWeight={500}>
              {label}
            </Typography>

            <Typography variant='h4' fontWeight={700} lineHeight={1.1}>
              {value}
            </Typography>

            {subtitle && (
              <Typography variant='caption' color='textSecondary'>
                {subtitle}
              </Typography>
            )}
          </Stack>

          <Stack
            sx={{
              width: 46,
              height: 46,
              borderRadius: 2,
              bgcolor: "action.hover",
              color: "primary.main",
              flexShrink: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

function DeliveryStatsCards({ stats, loading }) {
  const totalDeliveries = stats?.totalDeliveries ?? 0;

  const averageRating = Number(stats?.averageRating ?? 0).toFixed(1);

  const online = stats?.isOnline ?? false;
  const available = stats?.isAvailable ?? false;

  if (loading) {
    return (
      <Grid container spacing={2}>
        {[1, 2, 3, 4].map((item) => (
          <Grid key={item} size={{ xs: 12, sm: 6, lg: 3 }}>
            <Card
              sx={{
                height: 150,
                borderRadius: 3,
              }}
            />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <StatCard
          icon={<LocalShippingOutlinedIcon />}
          label='Total Deliveries'
          value={totalDeliveries}
          subtitle='Successfully completed'
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <StatCard
          icon={<StarOutlinedIcon />}
          label='Average Rating'
          value={averageRating}
          subtitle='Partner rating'
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <StatCard
          icon={<WifiOutlinedIcon />}
          label='Online Status'
          value={online ? "Online" : "Offline"}
          subtitle={online ? "Accepting delivery work" : "Currently offline"}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <StatCard
          icon={<DeliveryDiningOutlinedIcon />}
          label='Availability'
          value={available ? "Available" : "Busy"}
          subtitle={available ? "Ready for assignment" : "Active delivery"}
        />
      </Grid>
    </Grid>
  );
}

export default DeliveryStatsCards;
