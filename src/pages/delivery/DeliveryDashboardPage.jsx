import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

import DeliveryStatsCards from "../../components/delivery/dashboard/DeliveryStatsCards";
import DeliveryStatusCard from "../../components/delivery/dashboard/DeliveryStatusCard";
import ActiveDeliveryCard from "../../components/delivery/dashboard/ActiveDeliveryCard";

import {
  fetchDeliveryProfile,
  fetchDeliveryStats,
  updateDeliveryStatus,
} from "../../features/delivery/deliverySlice";

import {
  fetchDeliveryOrders,
  pickupOrder,
  outForDelivery,
  deliverOrder,
} from "../../features/delivery/deliveryOrderSlice";

function DeliveryDashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    profile,
    stats,
    profileLoading,
    profileError,
    statsLoading,
    statsError,
    statusUpdating,
    statusError,
  } = useSelector((state) => state.delivery);

  const { orders, ordersLoading, ordersError, actionLoading, actionError } =
    useSelector((state) => state.deliveryOrder);

  const activeOrder = orders?.[0] || null;

  const fetchDashboardData = useCallback(() => {
    dispatch(fetchDeliveryProfile());
    dispatch(fetchDeliveryStats());
    dispatch(fetchDeliveryOrders());
  }, [dispatch]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleStatusChange = async (isOnline) => {
    if (statusUpdating) {
      return;
    }

    const result = await dispatch(updateDeliveryStatus(isOnline));

    if (result.meta.requestStatus === "fulfilled") {
      await Promise.all([
        dispatch(fetchDeliveryProfile()),
        dispatch(fetchDeliveryStats()),
        dispatch(fetchDeliveryOrders()),
      ]);
    }
  };

  const handleDeliveryAction = async () => {
    if (!activeOrder || actionLoading) {
      return;
    }

    let action;

    switch (activeOrder.status) {
      case "READY_FOR_PICKUP":
        action = pickupOrder(activeOrder.orderId);
        break;

      case "PICKED_UP":
        action = outForDelivery(activeOrder.orderId);
        break;

      case "OUT_FOR_DELIVERY":
        action = deliverOrder(activeOrder.orderId);
        break;

      default:
        return;
    }

    const result = await dispatch(action);

    if (result.meta.requestStatus === "fulfilled") {
      await Promise.all([
        dispatch(fetchDeliveryOrders()),
        dispatch(fetchDeliveryProfile()),
        dispatch(fetchDeliveryStats()),
      ]);
    }
  };

  const handleViewDetails = () => {
    if (!activeOrder) {
      return;
    }

    navigate(`/delivery/orders/${activeOrder.orderId}`);
  };

  const handleRefresh = () => {
    fetchDashboardData();
  };

  const isLoading = profileLoading || statsLoading || ordersLoading;

  const dashboardError = profileError || statsError || ordersError;

  return (
    <Stack spacing={{ xs: 2.5, md: 3 }}>
      {/* Page Header */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
        }}
        gap={2}
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
            Welcome
            {profile?.user?.firstName ? `, ${profile.user.firstName}` : ""}
          </Typography>

          <Typography variant='body1' color='textSecondary' sx={{ mt: 0.5 }}>
            Manage your availability and current delivery.
          </Typography>
        </Box>

        <Button
          variant='outlined'
          startIcon={<RefreshIcon />}
          onClick={handleRefresh}
          disabled={isLoading || actionLoading || statusUpdating}
        >
          Refresh
        </Button>
      </Stack>

      {/* Dashboard Error */}
      {dashboardError && (
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "error.light",
            bgcolor: "error.lighter",
          }}
        >
          <Typography color='error'>{dashboardError}</Typography>
        </Box>
      )}

      {/* Statistics */}
      <DeliveryStatsCards stats={stats} loading={statsLoading} />

      {/* Availability */}
      <DeliveryStatusCard
        profile={profile}
        stats={stats}
        loading={profileLoading || statsLoading}
        statusUpdating={statusUpdating}
        statusError={statusError}
        onStatusChange={handleStatusChange}
      />

      {/* Current Delivery */}
      <Box>
        <Typography variant='h6' fontWeight={700} sx={{ mb: 1.5 }}>
          Current Delivery
        </Typography>

        <ActiveDeliveryCard
          activeOrder={activeOrder}
          actionLoading={actionLoading}
          actionError={actionError}
          onAction={handleDeliveryAction}
          onViewDetails={handleViewDetails}
        />
      </Box>
    </Stack>
  );
}

export default DeliveryDashboardPage;
