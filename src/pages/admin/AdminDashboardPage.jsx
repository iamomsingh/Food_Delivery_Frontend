import { useEffect } from "react";

import { Alert, Box, Button, Grid, Stack, Typography } from "@mui/material";

import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchAdminDashboard,
  fetchAdminRevenue,
} from "../../features/admin/adminDashboardSlice";

import DashboardStatCard from "../../components/admin/dashboard/DashboardStatCard";
import RevenueCards from "../../components/admin/dashboard/RevenueCards";
import OrdersOverview from "../../components/admin/dashboard/OrdersOverview";

function AdminDashboardPage() {
  const dispatch = useDispatch();

  const {
    overview,
    revenue,

    overviewLoading,
    revenueLoading,

    overviewError,
    revenueError,
  } = useSelector((state) => state.adminDashboard);

  const loadDashboard = () => {
    dispatch(fetchAdminDashboard());
    dispatch(fetchAdminRevenue());
  };

  useEffect(() => {
    loadDashboard();
  }, [dispatch]);

  const isRefreshing = overviewLoading || revenueLoading;

  return (
    <Box>
      <Stack spacing={4}>
        {/* ------------------------------------------------ */}
        {/* Header */}
        {/* ------------------------------------------------ */}

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
            <Typography variant='h4' fontWeight={700}>
              Dashboard
            </Typography>

            <Typography variant='body2' color='textSecondary' sx={{ mt: 0.5 }}>
              Overview of your food delivery platform
            </Typography>
          </Box>

          <Button
            variant='outlined'
            startIcon={<RefreshOutlinedIcon />}
            onClick={loadDashboard}
            disabled={isRefreshing}
          >
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </Button>
        </Stack>

        {overviewError && <Alert severity='error'>{overviewError}</Alert>}

        {/* ------------------------------------------------ */}
        {/* Platform Overview */}
        {/* ------------------------------------------------ */}

        <Box>
          <Typography variant='h6' fontWeight={600} sx={{ mb: 2 }}>
            Platform Overview
          </Typography>

          <Grid container spacing={2}>
            <Grid
              size={{
                xs: 12,
                sm: 6,
                lg: 3,
              }}
            >
              <DashboardStatCard
                title='Users'
                value={overview?.users?.totalUsers ?? 0}
                subtitle={`${overview?.users?.activeUsers ?? 0} active users`}
                icon={<PeopleOutlinedIcon />}
                loading={overviewLoading}
              />
            </Grid>

            <Grid
              size={{
                xs: 12,
                sm: 6,
                lg: 3,
              }}
            >
              <DashboardStatCard
                title='Restaurants'
                value={overview?.restaurants?.totalRestaurants ?? 0}
                subtitle={`${overview?.restaurants?.pendingRestaurants ?? 0} pending approval`}
                icon={<StorefrontOutlinedIcon />}
                loading={overviewLoading}
              />
            </Grid>

            <Grid
              size={{
                xs: 12,
                sm: 6,
                lg: 3,
              }}
            >
              <DashboardStatCard
                title='Delivery Partners'
                value={overview?.deliveryPartners?.totalDeliveryPartners ?? 0}
                subtitle={`${overview?.deliveryPartners?.onlineDeliveryPartners ?? 0} online`}
                icon={<DeliveryDiningOutlinedIcon />}
                loading={overviewLoading}
              />
            </Grid>

            <Grid
              size={{
                xs: 12,
                sm: 6,
                lg: 3,
              }}
            >
              <DashboardStatCard
                title='Orders'
                value={overview?.orders?.totalOrders ?? 0}
                subtitle={`${overview?.orders?.activeOrders ?? 0} active orders`}
                icon={<ShoppingBagOutlinedIcon />}
                loading={overviewLoading}
              />
            </Grid>
          </Grid>
        </Box>

        {/* ------------------------------------------------ */}
        {/* Revenue */}
        {/* ------------------------------------------------ */}

        <Box>
          <Typography variant='h6' fontWeight={600} sx={{ mb: 2 }}>
            Revenue
          </Typography>

          {revenueError && (
            <Alert severity='error' sx={{ mb: 2 }}>
              {revenueError}
            </Alert>
          )}

          <RevenueCards revenue={revenue} loading={revenueLoading} />
        </Box>

        {/* ------------------------------------------------ */}
        {/* Order Status */}
        {/* ------------------------------------------------ */}

        <OrdersOverview orders={overview?.orders} loading={overviewLoading} />
      </Stack>
    </Box>
  );
}

export default AdminDashboardPage;
