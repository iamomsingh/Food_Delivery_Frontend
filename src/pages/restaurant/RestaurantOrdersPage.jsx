import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { fetchRestaurantOrders } from "../../features/restaurant/restaurantOwnerOrderSlice";

function RestaurantOrdersPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { restaurants, activeRestaurantId } = useSelector(
    (state) => state.restaurantOwner,
  );

  const { orders, loading, error, pagination } = useSelector(
    (state) => state.restaurantOwnerOrder,
  );

  const activeRestaurant = restaurants.find(
    (restaurant) => restaurant.id === activeRestaurantId,
  );

  useEffect(() => {
    if (!activeRestaurantId) {
      return;
    }

    dispatch(
      fetchRestaurantOrders({
        restaurantId: activeRestaurantId,
        page: 1,
        limit: 10,
      }),
    );
  }, [dispatch, activeRestaurantId]);

  const formatAmount = (amount) => {
    return `₹${Number(amount).toFixed(2)}`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant='h4' fontWeight={700}>
          Orders
        </Typography>

        <Typography color='text.secondary' sx={{ mt: 0.5 }}>
          {activeRestaurant?.name || "No restaurant selected"}
        </Typography>
      </Box>

      {error && (
        <Typography color='error' sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {loading && (
        <Typography color='text.secondary'>Loading orders...</Typography>
      )}

      {!loading && !error && (
        <Paper variant='outlined'>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Order</strong>
                  </TableCell>

                  <TableCell>
                    <strong>Customer</strong>
                  </TableCell>

                  <TableCell>
                    <strong>Amount</strong>
                  </TableCell>

                  <TableCell>
                    <strong>Status</strong>
                  </TableCell>

                  <TableCell>
                    <strong>Placed</strong>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {orders.map((order) => (
                  <TableRow
                    key={order.id}
                    hover
                    onClick={() => navigate(`/restaurant/orders/${order.id}`)}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell>
                      <Typography sx={{ fontWeight: 600 }}>
                        #{order.orderNumber}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      {order.customer?.firstName} {order.customer?.lastName}
                    </TableCell>

                    <TableCell>{formatAmount(order.totalAmount)}</TableCell>

                    <TableCell>
                      <Chip
                        label={order.status}
                        size='small'
                        variant='outlined'
                      />
                    </TableCell>

                    <TableCell>{formatDate(order.placedAt)}</TableCell>
                  </TableRow>
                ))}

                {orders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <Typography
                        color='text.secondary'
                        sx={{ py: 5, textAlign: "center" }}
                      >
                        No orders found.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            sx={{
              px: 2,
              py: 1.5,
              borderTop: 1,
              borderColor: "divider",
            }}
          >
            <Typography variant='body2' color='text.secondary'>
              Showing {orders.length} of {pagination.total} orders
            </Typography>
          </Box>
        </Paper>
      )}
    </Box>
  );
}

export default RestaurantOrdersPage;
