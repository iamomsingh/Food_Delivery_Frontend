import { useEffect } from "react";

import {
  Alert,
  Box,
  Button,
  Stack,
  TablePagination,
  Typography,
} from "@mui/material";

import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  fetchAdminOrders,
  resetOrderFilters,
  setOrderFilter,
  setOrderPage,
  setOrderPageSize,
} from "../../features/admin/adminOrderSlice";

import { fetchAdminRestaurants } from "../../features/admin/adminRestaurantSlice";

import AdminOrderFilterBar from "../../components/admin/order/AdminOrderFilterBar";
import AdminOrderTable from "../../components/admin/order/AdminOrderTable";

function AdminOrdersPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders, pagination, filters, loading, error } = useSelector(
    (state) => state.adminOrder,
  );

  const restaurants = useSelector(
    (state) => state.adminRestaurant.restaurants ?? [],
  );

  /*
   * Fetch restaurants once for the filter dropdown.
   */
  useEffect(() => {
    if (!restaurants.length) {
      dispatch(
        fetchAdminRestaurants({
          page: 1,
          limit: 100,
        }),
      );
    }
  }, [dispatch, restaurants.length]);

  /*
   * Fetch orders whenever page,
   * page size, or filters change.
   */
  useEffect(() => {
    dispatch(
      fetchAdminOrders({
        page: pagination.currentPage,
        limit: pagination.pageSize,
        filters,
      }),
    );
  }, [dispatch, pagination.currentPage, pagination.pageSize, filters]);

  const handleFilterChange = (name, value) => {
    dispatch(
      setOrderFilter({
        name,
        value,
      }),
    );
  };

  const handleResetFilters = () => {
    dispatch(resetOrderFilters());
  };

  const handleRefresh = () => {
    dispatch(
      fetchAdminOrders({
        page: pagination.currentPage,
        limit: pagination.pageSize,
        filters,
      }),
    );
  };

  const handlePageChange = (_, newPage) => {
    dispatch(setOrderPage(newPage + 1));
  };

  const handleRowsPerPageChange = (event) => {
    dispatch(setOrderPageSize(Number(event.target.value)));
  };

  const handleViewOrder = (orderId) => {
    navigate(`/admin/orders/${orderId}`);
  };

  return (
    <Box>
      <Stack spacing={3}>
        {/* Page Header */}
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
              Orders
            </Typography>

            <Typography variant='body2' color='textSecondary' sx={{ mt: 0.5 }}>
              View and monitor orders across the platform
            </Typography>
          </Box>

          <Button
            variant='outlined'
            startIcon={<RefreshOutlinedIcon />}
            onClick={handleRefresh}
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </Button>
        </Stack>

        {/* Filters */}
        <AdminOrderFilterBar
          filters={filters}
          restaurants={restaurants}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
        />

        {/* Error */}
        {error && <Alert severity='error'>{error}</Alert>}

        {/* Orders */}
        <AdminOrderTable
          orders={orders}
          loading={loading}
          onView={handleViewOrder}
        />

        {/* Pagination */}
        {!loading && (
          <TablePagination
            component='div'
            count={pagination.totalItems}
            page={pagination.currentPage - 1}
            onPageChange={handlePageChange}
            rowsPerPage={pagination.pageSize}
            onRowsPerPageChange={handleRowsPerPageChange}
            rowsPerPageOptions={[10, 20, 50, 100]}
          />
        )}
      </Stack>
    </Box>
  );
}

export default AdminOrdersPage;
