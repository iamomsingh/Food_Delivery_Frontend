import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Alert,
  Box,
  Button,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";

import {
  fetchDeliveryProfile,
  fetchDeliveryStats,
  updateDeliveryStatus,
} from "../../features/delivery/deliverySlice";

import { fetchDeliveryOrders } from "../../features/delivery/deliveryOrderSlice";

import DeliveryStatsCards from "../../components/delivery/dashboard/DeliveryStatsCards";
import DeliveryStatusCard from "../../components/delivery/dashboard/DeliveryStatusCard";
import ActiveDeliveryCard from "../../components/delivery/dashboard/ActiveDeliveryCard";

function DeliveryDashboardPage() {
  const dispatch = useDispatch();

  const {
    profile,
    stats,
    profileLoading,
    statsLoading,
    statusUpdating,
    statusError,
    profileError,
  } = useSelector((state) => state.delivery);

  const { orders, ordersLoading, ordersError } = useSelector(
    (state) => state.deliveryOrder,
  );

  const fetchDashboardData = () => {
    dispatch(fetchDeliveryProfile());
    dispatch(fetchDeliveryStats());
    dispatch(fetchDeliveryOrders());
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleStatusToggle = (isOnline) => {
    dispatch(updateDeliveryStatus(isOnline));
  };

  const displayName = profile?.user?.firstName || "Delivery Partner";

  const activeOrders = orders ?? [];

  return (
    <Stack spacing={3}>
      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        spacing={2}
        sx={{
          justifyContent: "space-between",
          alignItems: {
            xs: "stretch",
            sm: "center",
          },
        }}
      >
        <Box>
          <Typography
            variant='h4'
            fontWeight={700}
            sx={{
              fontSize: {
                xs: "1.7rem",
                sm: "2rem",
                md: "2.125rem",
              },
            }}
          >
            Welcome, {displayName}
          </Typography>

          <Typography variant='body2' color='textSecondary' sx={{ mt: 0.5 }}>
            Manage your delivery activity from here.
          </Typography>
        </Box>

        <Button
          variant='outlined'
          startIcon={<RefreshOutlinedIcon />}
          onClick={fetchDashboardData}
          disabled={profileLoading || statsLoading || ordersLoading}
          sx={{
            alignSelf: {
              xs: "flex-start",
              sm: "center",
            },
          }}
        >
          Refresh
        </Button>
      </Stack>

      {/* Profile error */}
      {profileError && <Alert severity='error'>{profileError}</Alert>}

      {/* Stats */}
      <DeliveryStatsCards stats={stats} loading={statsLoading} />

      {/* Status */}
      <DeliveryStatusCard
        isOnline={stats?.isOnline ?? profile?.isOnline ?? false}
        isAvailable={stats?.isAvailable ?? profile?.isAvailable ?? false}
        status={profile?.status}
        loading={statusUpdating}
        error={statusError}
        onToggle={handleStatusToggle}
      />

      {/* Active Deliveries */}
      <Stack spacing={1.5}>
        <Box>
          <Typography variant='h5' fontWeight={700}>
            Active Deliveries
          </Typography>

          <Typography variant='body2' color='textSecondary'>
            Orders currently assigned to you.
          </Typography>
        </Box>

        {ordersError && <Alert severity='error'>{ordersError}</Alert>}

        {ordersLoading ? (
          <Grid container spacing={2}>
            {[1, 2].map((item) => (
              <Grid key={item} size={{ xs: 12, lg: 6 }}>
                <Skeleton variant='rounded' height={360} />
              </Grid>
            ))}
          </Grid>
        ) : activeOrders.length === 0 ? (
          <Box
            sx={{
              border: 1,
              borderColor: "divider",
              borderRadius: 3,
              p: {
                xs: 4,
                md: 6,
              },
              textAlign: "center",
              bgcolor: "background.paper",
            }}
          >
            <Typography variant='h6' fontWeight={600}>
              No active deliveries
            </Typography>

            <Typography variant='body2' color='textSecondary' sx={{ mt: 0.75 }}>
              New assigned deliveries will appear here.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {activeOrders.map((order) => (
              <Grid key={order.orderId} size={{ xs: 12, lg: 6 }}>
                <ActiveDeliveryCard order={order} />
              </Grid>
            ))}
          </Grid>
        )}
      </Stack>
    </Stack>
  );
}

export default DeliveryDashboardPage;
