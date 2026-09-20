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
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

import { fetchDeliveryOrders } from "../../features/delivery/deliveryOrderSlice";

import DeliveryOrderCard from "../../components/delivery/order/DeliveryOrderCard";

function DeliveryOrdersPage() {
  const dispatch = useDispatch();

  const { orders, ordersLoading, ordersError } = useSelector(
    (state) => state.deliveryOrder,
  );

  const loadOrders = () => {
    dispatch(fetchDeliveryOrders());
  };

  useEffect(() => {
    loadOrders();
  }, []);

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
            Active Deliveries
          </Typography>

          <Typography variant='body2' color='textSecondary' sx={{ mt: 0.5 }}>
            Manage the orders currently assigned to you.
          </Typography>
        </Box>

        <Button
          variant='outlined'
          startIcon={<RefreshOutlinedIcon />}
          onClick={loadOrders}
          disabled={ordersLoading}
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

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          p: 2.5,
          border: 1,
          borderColor: "divider",
          borderRadius: 3,
          bgcolor: "background.paper",
        }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "action.hover",
            color: "primary.main",
            flexShrink: 0,
          }}
        >
          <LocalShippingOutlinedIcon />
        </Box>

        <Box>
          <Typography variant='h5' fontWeight={700}>
            {ordersLoading ? "—" : orders.length}
          </Typography>

          <Typography variant='body2' color='textSecondary'>
            Active assigned deliveries
          </Typography>
        </Box>
      </Box>

      {/* Error */}
      {ordersError && <Alert severity='error'>{ordersError}</Alert>}

      {/* Orders */}
      {ordersLoading ? (
        <Grid container spacing={2}>
          {[1, 2, 3, 4].map((item) => (
            <Grid
              key={item}
              size={{
                xs: 12,
                md: 6,
                xl: 4,
              }}
            >
              <Skeleton variant='rounded' height={390} />
            </Grid>
          ))}
        </Grid>
      ) : orders.length === 0 ? (
        <Box
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 3,
            p: {
              xs: 4,
              md: 7,
            },
            textAlign: "center",
            bgcolor: "background.paper",
          }}
        >
          <LocalShippingOutlinedIcon
            sx={{
              fontSize: 48,
              color: "text.secondary",
            }}
          />

          <Typography variant='h6' fontWeight={600} sx={{ mt: 1.5 }}>
            No active deliveries
          </Typography>

          <Typography
            variant='body2'
            color='text.secondary'
            sx={{
              mt: 0.75,
              maxWidth: 450,
              mx: "auto",
            }}
          >
            You don't have any active orders assigned to you right now.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {orders.map((order) => (
            <Grid
              key={order.orderId}
              size={{
                xs: 12,
                md: 6,
                xl: 4,
              }}
            >
              <DeliveryOrderCard order={order} />
            </Grid>
          ))}
        </Grid>
      )}
    </Stack>
  );
}

export default DeliveryOrdersPage;
