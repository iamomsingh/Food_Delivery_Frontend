import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
  Pagination,
} from "@mui/material";

import { fetchOrders } from "../features/order/orderSlice";
import { useNavigate } from "react-router-dom";
import OrderCard from "../components/order/OrderCard";

function MyOrdersPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders, pagination, ordersLoading, error } = useSelector(
    (state) => state.order,
  );

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(
      fetchOrders({
        page,
        limit: 10,
      }),
    );
  }, [dispatch, page]);

  return (
    <Box component='main'>
      <Container maxWidth='md' sx={{ py: 4 }}>
        {/* Header */}

        <Typography
          variant='h4'
          fontWeight={800}
          sx={{
            fontSize: {
              xs: "1.75rem",
              sm: "2.125rem",
            },
          }}
        >
          My Orders
        </Typography>

        <Typography color='text.secondary' sx={{ mt: 0.5, mb: 3 }}>
          Track and manage your food orders.
        </Typography>

        {/* Loading */}

        {ordersLoading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              py: 8,
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {/* Error */}

        {!ordersLoading && error && <Alert severity='error'>{error}</Alert>}

        {/* Empty */}

        {!ordersLoading && !error && orders.length === 0 && (
          <Box
            sx={{
              border: "1px dashed",
              borderColor: "divider",
              borderRadius: 3,
              py: 8,
              px: 3,
              textAlign: "center",
            }}
          >
            <Typography variant='h6' fontWeight={700}>
              No orders yet
            </Typography>

            <Typography color='text.secondary' sx={{ mt: 0.5 }}>
              Your placed orders will appear here.
            </Typography>
          </Box>
        )}

        {/* Orders */}

        {!ordersLoading && !error && orders.length > 0 && (
          <Box>
            <Stack spacing={2}>
              {orders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onViewOrder={(orderId) => navigate(`/orders/${orderId}`)}
                />
              ))}
            </Stack>
          </Box>
        )}

        {!ordersLoading &&
          !error &&
          pagination &&
          pagination.totalPages > 1 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 4,
              }}
            >
              <Pagination
                count={pagination.totalPages}
                page={pagination.page}
                onChange={(_, value) => {
                  setPage(value);
                }}
                color='primary'
              />
            </Box>
          )}
      </Container>
    </Box>
  );
}

export default MyOrdersPage;
