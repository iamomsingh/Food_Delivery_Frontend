import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";

import { fetchAdminAnalytics } from "../../features/admin/adminDashboardSlice";

import AnalyticsSummaryCards from "../../components/admin/analytics/AnalyticsSummaryCards";
import AnalyticsLineChart from "../../components/admin/analytics/AnalyticsLineChart";

function getLast7Days() {
  const days = [];

  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);

    date.setHours(0, 0, 0, 0);
    date.setDate(today.getDate() - i);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    days.push(`${year}-${month}-${day}`);
  }

  return days;
}

function fillMissingDates(data = [], valueKey) {
  const dataMap = new Map(
    data.map((item) => [item.date, Number(item[valueKey] ?? 0)]),
  );

  return getLast7Days().map((date) => ({
    date,
    [valueKey]: dataMap.get(date) ?? 0,
  }));
}

function AdminAnalyticsPage() {
  const dispatch = useDispatch();

  const { analytics, analyticsLoading, analyticsError } = useSelector(
    (state) => state.adminDashboard,
  );

  useEffect(() => {
    dispatch(fetchAdminAnalytics());
  }, [dispatch]);

  const ordersData = useMemo(
    () => fillMissingDates(analytics?.ordersLast7Days, "totalOrders"),
    [analytics?.ordersLast7Days],
  );

  const revenueData = useMemo(
    () => fillMissingDates(analytics?.revenueLast7Days, "revenue"),
    [analytics?.revenueLast7Days],
  );

  const usersData = useMemo(
    () => fillMissingDates(analytics?.newUsersLast7Days, "newUsers"),
    [analytics?.newUsersLast7Days],
  );

  const totalOrders = ordersData.reduce(
    (total, item) => total + Number(item.totalOrders ?? 0),
    0,
  );

  const totalRevenue = revenueData.reduce(
    (total, item) => total + Number(item.revenue ?? 0),
    0,
  );

  const totalNewUsers = usersData.reduce(
    (total, item) => total + Number(item.newUsers ?? 0),
    0,
  );

  const handleRefresh = () => {
    dispatch(fetchAdminAnalytics());
  };

  return (
    <Box>
      <Stack spacing={4}>
        {/* Header */}
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
              Analytics
            </Typography>

            <Typography variant='body2' color='textSecondary' sx={{ mt: 0.5 }}>
              Platform performance over the last 7 days
            </Typography>
          </Box>

          <Button
            variant='outlined'
            startIcon={<RefreshOutlinedIcon />}
            onClick={handleRefresh}
            disabled={analyticsLoading}
          >
            {analyticsLoading ? "Refreshing..." : "Refresh"}
          </Button>
        </Stack>

        {/* Error */}
        {analyticsError && <Alert severity='error'>{analyticsError}</Alert>}

        {/* Summary */}
        <AnalyticsSummaryCards
          orders={totalOrders}
          revenue={totalRevenue}
          users={totalNewUsers}
          loading={analyticsLoading}
        />

        {/* Orders */}
        <AnalyticsLineChart
          title='Orders'
          subtitle='Orders placed over the last 7 days'
          data={ordersData}
          dataKey='totalOrders'
          valueLabel='Total orders'
          loading={analyticsLoading}
        />

        {/* Revenue */}
        <AnalyticsLineChart
          title='Revenue'
          subtitle='Revenue generated from delivered orders'
          data={revenueData}
          dataKey='revenue'
          currency
          valueLabel='Revenue'
          loading={analyticsLoading}
        />

        {/* New Users */}
        <AnalyticsLineChart
          title='New Users'
          subtitle='New users registered over the last 7 days'
          data={usersData}
          dataKey='newUsers'
          valueLabel='New users'
          loading={analyticsLoading}
        />
      </Stack>
    </Box>
  );
}

export default AdminAnalyticsPage;
