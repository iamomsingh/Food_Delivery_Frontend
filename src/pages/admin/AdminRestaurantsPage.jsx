import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";

import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";

import AdminRestaurantTable from "../../components/admin/restaurant/AdminRestaurantTable";
import RestaurantRejectDialog from "../../components/admin/restaurant/RestaurantRejectDialog";

import {
  approveRestaurant,
  fetchAdminRestaurants,
  rejectRestaurant,
  setRestaurantStatusFilter,
  setRestaurantPage,
  setRestaurantLimit,
} from "../../features/admin/adminRestaurantSlice";

function AdminRestaurantsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [restaurantToReject, setRestaurantToReject] = useState(null);

  const {
    restaurants,
    pagination,
    filters,
    loading,
    error,
    actionLoadingType,
    actionLoadingId,
    actionError,
  } = useSelector((state) => state.adminRestaurant);

  // FETCH RESTAURANTS
  useEffect(() => {
    dispatch(
      fetchAdminRestaurants({
        page: pagination.page,
        limit: pagination.limit,
        status: filters.status,
      }),
    );
  }, [dispatch, pagination.page, pagination.limit, filters.status]);

  // FILTER
  const handleStatusChange = (event) => {
    dispatch(setRestaurantStatusFilter(event.target.value));
  };

  // VIEW
  const handleView = (restaurantId) => {
    navigate(`/admin/restaurants/${restaurantId}`);
  };

  // APPROVE
  const handleApprove = async (restaurantId) => {
    const result = await dispatch(approveRestaurant(restaurantId));

    if (approveRestaurant.fulfilled.match(result)) {
      dispatch(
        fetchAdminRestaurants({
          page: pagination.page,
          limit: pagination.limit,
          status: filters.status,
        }),
      );
    }
  };

  // OPEN REJECT DIALOG
  const handleReject = (restaurant) => {
    setRestaurantToReject(restaurant);
  };

  // CONFIRM REJECT
  const handleRejectConfirm = async () => {
    if (!restaurantToReject) {
      return;
    }

    const result = await dispatch(rejectRestaurant(restaurantToReject.id));

    if (rejectRestaurant.fulfilled.match(result)) {
      setRestaurantToReject(null);

      dispatch(
        fetchAdminRestaurants({
          page: pagination.page,
          limit: pagination.limit,
          status: filters.status,
        }),
      );
    }
  };

  // PAGINATION
  const handlePageChange = (_, newPage) => {
    dispatch(setRestaurantPage(newPage + 1));
  };

  const handleRowsPerPageChange = (event) => {
    dispatch(setRestaurantLimit(Number(event.target.value)));
  };

  return (
    <Box>
      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        spacing={2}
        sx={{
          mb: 3,
          justifyContent: "space-between",
          alignItems: {
            xs: "stretch",
            sm: "center",
          },
        }}
      >
        <Box>
          <Typography variant='h5' fontWeight={600}>
            Restaurants
          </Typography>

          <Typography variant='body2' color='textSecondary' sx={{ mt: 0.5 }}>
            Review and manage restaurants on the platform.
          </Typography>
        </Box>

        <FormControl
          size='small'
          sx={{
            minWidth: {
              xs: "100%",
              sm: 180,
            },
          }}
        >
          <InputLabel id='restaurant-status-label'>Status</InputLabel>

          <Select
            labelId='restaurant-status-label'
            value={filters.status}
            label='Status'
            onChange={handleStatusChange}
          >
            <MenuItem value=''>All Restaurants</MenuItem>

            <MenuItem value='PENDING'>Pending</MenuItem>

            <MenuItem value='APPROVED'>Approved</MenuItem>

            <MenuItem value='REJECTED'>Rejected</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {error && (
        <Alert severity='error' sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {actionError && (
        <Alert severity='error' sx={{ mb: 2 }}>
          {actionError}
        </Alert>
      )}

      {loading && <Loader />}

      {!loading && restaurants.length === 0 && (
        <EmptyState
          title='No restaurants found'
          description={
            filters.status
              ? `No ${filters.status.toLowerCase()} restaurants found.`
              : "There are no restaurants to display."
          }
        />
      )}

      {!loading && restaurants.length > 0 && (
        <Paper
          elevation={0}
          variant='outlined'
          sx={{
            overflow: "hidden",
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Restaurant</TableCell>
                  <TableCell>Owner</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Reviews</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <AdminRestaurantTable
                  restaurants={restaurants}
                  actionLoadingType={actionLoadingType}
                  actionLoadingId={actionLoadingId}
                  onView={handleView}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component='div'
            count={pagination.totalItems}
            page={pagination.page - 1}
            rowsPerPage={pagination.limit}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            rowsPerPageOptions={[5, 10, 20, 50]}
          />
        </Paper>
      )}

      <RestaurantRejectDialog
        open={Boolean(restaurantToReject)}
        restaurant={restaurantToReject}
        loading={
          actionLoadingType === "REJECT_RESTAURANT" &&
          actionLoadingId === restaurantToReject?.id
        }
        onClose={() => setRestaurantToReject(null)}
        onConfirm={handleRejectConfirm}
      />
    </Box>
  );
}

export default AdminRestaurantsPage;
