import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";

import {
  cancelOrder,
  fetchOrderById,
} from "../../features/customer/orderSlice";

const ORDER_STATUSES = [
  "PLACED",
  "ACCEPTED",
  "PREPARING",
  "READY_FOR_PICKUP",
  "PICKED_UP",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

const STATUS_LABELS = {
  PLACED: "Order Placed",
  ACCEPTED: "Restaurant Accepted",
  PREPARING: "Preparing",
  READY_FOR_PICKUP: "Ready for Pickup",
  PICKED_UP: "Picked Up",
  OUT_FOR_DELIVERY: "Out for Delivery",
  DELIVERED: "Delivered",
};

function formatStatus(status) {
  return STATUS_LABELS[status] || status;
}

function formatDate(date) {
  if (!date) return "";

  return new Date(date).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function OrderDetailsPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderById(orderId));
    }
  }, [dispatch, orderId]);

  const { currentOrder, loading, error, cancelling, cancellingOrderId } =
    useSelector((state) => state.order);

  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  function handleOpenCancelDialog() {
    setIsCancelDialogOpen(true);
  }

  function handleCloseCancelDialog() {
    if (!isCancelling) {
      setIsCancelDialogOpen(false);
    }
  }

  async function handleCancelOrder() {
    const result = await dispatch(cancelOrder(order.id));

    if (cancelOrder.fulfilled.match(result)) {
      setIsCancelDialogOpen(false);
      navigate("/orders");
    }
  }

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth='md' sx={{ py: 6 }}>
        <Alert severity='error'>{error}</Alert>

        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/orders")}
          sx={{ mt: 2 }}
        >
          Back to Orders
        </Button>
      </Container>
    );
  }

  if (!currentOrder) {
    return null;
  }

  const order = currentOrder;
  const currentStatusIndex = ORDER_STATUSES.indexOf(order.status);

  const canCancel = order.status === "PLACED" || order.status === "ACCEPTED";
  const isCancelling = cancellingOrderId === order.id;

  return (
    <Box component='main' sx={{ pb: 6 }}>
      <Container maxWidth='lg' sx={{ py: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/orders")}
          sx={{ mb: 2 }}
        >
          My Orders
        </Button>

        {/* Order Header */}

        <Card
          elevation={0}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
            mb: 3,
          }}
        >
          <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ justifyContent: "space-between" }}
            >
              <Box>
                <Typography
                  variant='h4'
                  fontWeight={800}
                  sx={{ fontSize: { xs: "1.75rem", sm: "2.125rem" } }}
                >
                  Order Details
                </Typography>

                <Typography color='text.secondary' sx={{ mt: 0.5 }}>
                  Order #{order.orderId}
                </Typography>

                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ mt: 0.5 }}
                >
                  Placed on {formatDate(order.placedAt)}
                </Typography>
              </Box>

              <Box>
                <Chip
                  label={formatStatus(order.status)}
                  color={order.status === "DELIVERED" ? "success" : "primary"}
                  icon={<AccessTimeIcon />}
                  sx={{ fontWeight: 600 }}
                />
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={3}>
              {/* Status Timeline */}

              <Card
                elevation={0}
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 3,
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant='h6' fontWeight={700} sx={{ mb: 3 }}>
                    Order Status
                  </Typography>

                  <Stack spacing={0}>
                    {ORDER_STATUSES.map((status, index) => {
                      const log = order.statusLogs?.find(
                        (item) => item.status === status,
                      );

                      const completed = index <= currentStatusIndex;

                      const isCurrent = index === currentStatusIndex;

                      const isLast = index === ORDER_STATUSES.length - 1;

                      return (
                        <Stack key={status} direction='row' spacing={2}>
                          {/* Timeline indicator */}

                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              width: 28,
                              flexShrink: 0,
                            }}
                          >
                            <Box
                              sx={{
                                width: 28,
                                height: 28,
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                bgcolor: completed
                                  ? "primary.main"
                                  : "action.hover",
                                color: completed
                                  ? "primary.contrastText"
                                  : "text.disabled",
                              }}
                            >
                              {completed ? (
                                <CheckCircleIcon sx={{ fontSize: 18 }} />
                              ) : (
                                <Box
                                  sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: "50%",
                                    bgcolor: "text.disabled",
                                  }}
                                />
                              )}
                            </Box>

                            {!isLast && (
                              <Box
                                sx={{
                                  width: 2,
                                  flex: 1,
                                  minHeight: 42,
                                  bgcolor:
                                    index < currentStatusIndex
                                      ? "primary.main"
                                      : "divider",
                                }}
                              />
                            )}
                          </Box>

                          {/* Timeline content */}

                          <Box
                            sx={{
                              pb: isLast ? 0 : 2.5,
                              flex: 1,
                            }}
                          >
                            <Typography fontWeight={isCurrent ? 700 : 600}>
                              {formatStatus(status)}
                            </Typography>

                            {log && (
                              <Typography
                                variant='body2'
                                color='text.secondary'
                                sx={{ mt: 0.25 }}
                              >
                                {formatDate(log.createdAt)}
                              </Typography>
                            )}

                            {isCurrent && (
                              <Typography
                                variant='body2'
                                color='primary.main'
                                sx={{ mt: 0.5 }}
                              >
                                Current status
                              </Typography>
                            )}
                          </Box>
                        </Stack>
                      );
                    })}
                  </Stack>
                </CardContent>
              </Card>

              {/* Restaurant */}

              <Card
                elevation={0}
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 3,
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack
                    direction='row'
                    spacing={1.5}
                    sx={{ alignItems: "flex-start" }}
                  >
                    <RestaurantOutlinedIcon color='primary' />

                    <Box>
                      <Typography variant='body2' color='text.secondary'>
                        Restaurant
                      </Typography>

                      <Typography variant='h6' fontWeight={700}>
                        {order.restaurant?.name}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>

              {/* Items */}

              <Card
                elevation={0}
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 3,
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant='h6' fontWeight={700} sx={{ mb: 2.5 }}>
                    Your Items
                  </Typography>

                  <Stack spacing={2}>
                    {order.items?.map((item) => (
                      <Stack
                        key={item.id}
                        direction='row'
                        spacing={1.5}
                        sx={{ alignItems: "center" }}
                      >
                        <Box
                          component='img'
                          src={item.itemImageUrl || "https://placehold.co/80"}
                          alt={item.itemName}
                          sx={{
                            width: 64,
                            height: 64,
                            borderRadius: 2,
                            objectFit: "cover",
                            flexShrink: 0,
                          }}
                        />

                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography fontWeight={700} noWrap>
                            {item.itemName}
                          </Typography>

                          <Typography
                            variant='body2'
                            color='text.secondary'
                            sx={{ mt: 0.25 }}
                          >
                            ₹{item.unitPrice} × {item.quantity}
                          </Typography>
                        </Box>

                        <Typography fontWeight={700} sx={{ flexShrink: 0 }}>
                          ₹{item.totalPrice}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>

          {/* RIGHT */}

          <Grid size={{ xs: 12, md: 5 }}>
            <Stack
              spacing={3}
              sx={{
                position: { md: "sticky" },
                top: { md: 24 },
              }}
            >
              {/* Delivery */}

              <Card
                elevation={0}
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 3,
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  {order.delivery && (
                    <Stack
                      direction='row'
                      spacing={1.5}
                      sx={{ alignItems: "flex-start" }}
                    >
                      <LocationOnOutlinedIcon color='primary' />

                      <Box>
                        <Typography variant='h6' fontWeight={700}>
                          Delivery Address
                        </Typography>

                        <Typography sx={{ mt: 1 }} fontWeight={600}>
                          {order.delivery.name}
                        </Typography>

                        <Typography
                          variant='body2'
                          color='text.secondary'
                          sx={{ mt: 0.5 }}
                        >
                          {order.delivery.address}
                        </Typography>

                        {order.delivery.landmark && (
                          <Typography variant='body2' color='text.secondary'>
                            Near {order.delivery.landmark}
                          </Typography>
                        )}

                        <Typography variant='body2' color='text.secondary'>
                          {order.delivery.city}, {order.delivery.state} -{" "}
                          {order.delivery.pincode}
                        </Typography>

                        <Typography variant='body2' color='text.secondary'>
                          {order.delivery.country}
                        </Typography>
                      </Box>
                    </Stack>
                  )}
                </CardContent>
              </Card>

              {/* Payment */}

              <Card
                elevation={0}
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 3,
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack
                    direction='row'
                    spacing={1.5}
                    sx={{ alignItems: "flex-start" }}
                  >
                    <PaymentsOutlinedIcon color='primary' />

                    <Box>
                      <Typography variant='h6' fontWeight={700}>
                        Payment
                      </Typography>

                      <Typography
                        variant='body2'
                        color='text.secondary'
                        sx={{ mt: 0.5 }}
                      >
                        {order.pricing?.paymentMethod === "COD"
                          ? "Cash on Delivery"
                          : order.pricing?.paymentMethod}
                      </Typography>

                      <Chip
                        label={order.pricing?.paymentStatus}
                        size='small'
                        sx={{ mt: 1 }}
                      />
                    </Box>
                  </Stack>
                </CardContent>
              </Card>

              {/* Price Summary */}

              <Card
                elevation={0}
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 3,
                }}
              >
                {order.pricing && (
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant='h6' fontWeight={700} sx={{ mb: 2.5 }}>
                      Price Details
                    </Typography>

                    <Stack spacing={1.25}>
                      <Stack
                        direction='row'
                        sx={{ justifyContent: "space-between" }}
                      >
                        <Typography color='text.secondary'>Subtotal</Typography>

                        <Typography>₹{order.pricing.subtotalAmount}</Typography>
                      </Stack>

                      <Stack
                        direction='row'
                        sx={{ justifyContent: "space-between" }}
                      >
                        <Typography color='text.secondary'>
                          Delivery Fee
                        </Typography>

                        <Typography>₹{order.pricing.deliveryFee}</Typography>
                      </Stack>

                      <Stack
                        direction='row'
                        sx={{ justifyContent: "space-between" }}
                      >
                        <Typography color='text.secondary'>Tax</Typography>

                        <Typography>₹{order.pricing.taxAmount}</Typography>
                      </Stack>

                      {Number(order.pricing.discountAmount) > 0 && (
                        <Stack
                          direction='row'
                          sx={{ justifyContent: "space-between" }}
                        >
                          <Typography color='success.main'>Discount</Typography>

                          <Typography color='success.main'>
                            -₹{order.pricing.discountAmount}
                          </Typography>
                        </Stack>
                      )}
                    </Stack>

                    <Divider sx={{ my: 2 }} />

                    <Stack
                      direction='row'
                      sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant='h6' fontWeight={700}>
                        Total
                      </Typography>

                      <Typography variant='h5' fontWeight={800}>
                        ₹{order.pricing.totalAmount}
                      </Typography>
                    </Stack>
                  </CardContent>
                )}
              </Card>

              {/* Order Action*/}

              {canCancel && (
                <Card
                  elevation={0}
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 3,
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant='h6' fontWeight={700} sx={{ mb: 1 }}>
                      Order Actions
                    </Typography>

                    <Typography
                      variant='body2'
                      color='text.secondary'
                      sx={{ mb: 2 }}
                    >
                      You can cancel this order while it is still being
                      processed.
                    </Typography>

                    <Button
                      fullWidth
                      variant='outlined'
                      color='error'
                      onClick={handleOpenCancelDialog}
                      disabled={isCancelling}
                    >
                      {isCancelling ? "Cancelling..." : "Cancel Order"}
                    </Button>
                  </CardContent>
                </Card>
              )}

              <Dialog
                open={isCancelDialogOpen}
                onClose={handleCloseCancelDialog}
                fullWidth
                maxWidth='xs'
              >
                <DialogTitle fontWeight={700}>Cancel this order?</DialogTitle>

                <DialogContent>
                  <Typography color='text.secondary'>
                    Are you sure you want to cancel order{" "}
                    <strong>#{order.orderId}</strong>?
                  </Typography>

                  <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{ mt: 1 }}
                  >
                    This action cannot be undone.
                  </Typography>
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 2 }}>
                  <Button
                    onClick={handleCloseCancelDialog}
                    disabled={isCancelling}
                  >
                    Keep Order
                  </Button>

                  <Button
                    variant='contained'
                    color='error'
                    onClick={handleCancelOrder}
                    disabled={isCancelling}
                  >
                    {isCancelling ? "Cancelling..." : "Cancel Order"}
                  </Button>
                </DialogActions>
              </Dialog>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default OrderDetailsPage;
