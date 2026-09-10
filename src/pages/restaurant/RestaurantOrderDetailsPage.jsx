import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Box, Button, Chip, Paper, Typography } from "@mui/material";

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import {
  clearSelectedOrder,
  fetchRestaurantOrder,
} from "../../features/restaurant/restaurantOwnerOrderSlice";
import RestaurantOrderActions from "../../components/restaurant/RestaurantOrderActions";

function RestaurantOrderDetailsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderId } = useParams();

  const { activeRestaurantId } = useSelector((state) => state.restaurantOwner);

  const { selectedOrder, detailLoading, detailError } = useSelector(
    (state) => state.restaurantOwnerOrder,
  );

  useEffect(() => {
    if (!activeRestaurantId || !orderId) {
      return;
    }

    dispatch(
      fetchRestaurantOrder({
        restaurantId: activeRestaurantId,
        orderId,
      }),
    );

    return () => {
      dispatch(clearSelectedOrder());
    };
  }, [dispatch, activeRestaurantId, orderId]);

  if (detailLoading) {
    return <Typography>Loading order...</Typography>;
  }

  if (detailError) {
    return (
      <Box>
        <Typography color='error'>{detailError}</Typography>

        <Button
          sx={{ mt: 2 }}
          startIcon={<ArrowBackOutlinedIcon />}
          onClick={() => navigate("/restaurant/orders")}
        >
          Back to Orders
        </Button>
      </Box>
    );
  }

  if (!selectedOrder) {
    return null;
  }

  const { order, customer, payment, items, statusLogs } = selectedOrder;

  return (
    <Box>
      <Button
        startIcon={<ArrowBackOutlinedIcon />}
        onClick={() => navigate("/restaurant/orders")}
        sx={{ mb: 2 }}
      >
        Back to Orders
      </Button>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant='h4' fontWeight={700}>
            #{order.orderNumber}
          </Typography>

          <Typography color='text.secondary' sx={{ mt: 0.5 }}>
            Order details
          </Typography>
        </Box>

        <Chip label={order.status} variant='outlined' />
      </Box>

      <RestaurantOrderActions order={order} />

      <Paper variant='outlined' sx={{ p: 3, mb: 3 }}>
        <Typography variant='h6' fontWeight={600}>
          Customer
        </Typography>

        <Typography sx={{ mt: 1 }}>{customer.name}</Typography>

        <Typography color='text.secondary'>{customer.phone}</Typography>

        <Typography sx={{ mt: 1 }}>{customer?.address}</Typography>

        <Typography color='text.secondary'>{customer?.landmark}</Typography>

        <Typography color='text.secondary'>
          {customer?.city}, {customer?.state}
        </Typography>
      </Paper>

      <Paper variant='outlined' sx={{ p: 3, mb: 3 }}>
        <Typography variant='h6' fontWeight={600}>
          Order Items
        </Typography>

        <Box sx={{ mt: 2 }}>
          {items?.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 1.5,
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <Box>
                <Typography fontWeight={500}>
                  {item.quantity} × {item.itemName}
                </Typography>

                <Typography variant='body2' color='text.secondary'>
                  ₹{Number(item.unitPrice).toFixed(2)} each
                </Typography>
              </Box>

              <Typography fontWeight={600}>
                ₹{Number(item.totalPrice).toFixed(2)}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Payment Summary */}
        <Box
          sx={{
            mt: 3,
            ml: "auto",
            width: { xs: "100%", sm: 320 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              py: 0.75,
            }}
          >
            <Typography color='text.secondary'>Subtotal</Typography>

            <Typography>
              ₹{Number(payment.subtotalAmount).toFixed(2)}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              py: 0.75,
            }}
          >
            <Typography color='text.secondary'>Delivery Fee</Typography>

            <Typography>₹{Number(payment.deliveryFee).toFixed(2)}</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              py: 0.75,
            }}
          >
            <Typography color='text.secondary'>Tax</Typography>

            <Typography>₹{Number(payment.taxAmount).toFixed(2)}</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              py: 0.75,
            }}
          >
            <Typography color='text.secondary'>Discount</Typography>

            <Typography>
              - ₹{Number(payment.discountAmount).toFixed(2)}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 1,
              pt: 1.5,
              borderTop: 2,
              borderColor: "divider",
            }}
          >
            <Typography variant='h6' fontWeight={700}>
              Total
            </Typography>

            <Typography variant='h6' fontWeight={700}>
              ₹{Number(payment.totalAmount).toFixed(2)}
            </Typography>
          </Box>
        </Box>

        {/* Payment Information */}
        <Box
          sx={{
            mt: 3,
            pt: 2,
            borderTop: 1,
            borderColor: "divider",
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          <Chip
            label={`Payment: ${order.paymentMethod}`}
            size='small'
            variant='outlined'
          />

          <Chip
            label={`Status: ${order.paymentStatus}`}
            size='small'
            variant='outlined'
          />
        </Box>
      </Paper>

      <Paper variant='outlined' sx={{ p: 3 }}>
        <Typography variant='h6' fontWeight={600}>
          Status History
        </Typography>

        <Box sx={{ mt: 2 }}>
          {statusLogs?.map((log) => (
            <Box key={log.id} sx={{ py: 1 }}>
              <Typography fontWeight={500}>{log.status}</Typography>

              <Typography variant='body2' color='text.secondary'>
                {new Date(log.createdAt).toLocaleString("en-IN")}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
}

export default RestaurantOrderDetailsPage;
