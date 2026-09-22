import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import StarIcon from "@mui/icons-material/Star";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  cancelOrder,
  fetchOrderById,
} from "../../features/customer/orderSlice";

import {
  fetchOrderReview,
  removeReview,
} from "../../features/review/reviewSlice";

import ReviewDialog from "../../components/review/ReviewDialog";

const STATUS_STEPS = [
  "PLACED",
  "ACCEPTED",
  "PREPARING",
  "READY_FOR_PICKUP",
  "PICKED_UP",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

const getStatusLabel = (status) => {
  if (!status) return "";

  return status
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // --------------------------------------------------
  // Order state
  // --------------------------------------------------

  const {
    currentOrder: order,
    loading,
    error,
    cancelling,
    cancellingOrderId,
  } = useSelector((state) => state.order);

  // --------------------------------------------------
  // Review state
  // --------------------------------------------------

  const {
    orderReview,
    orderReviewLoading,
    orderReviewError,
    deleting,
    deleteError,
  } = useSelector((state) => state.review);

  // --------------------------------------------------
  // Local state
  // --------------------------------------------------

  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

  const [isDeleteReviewDialogOpen, setIsDeleteReviewDialogOpen] =
    useState(false);

  // --------------------------------------------------
  // Fetch order
  // --------------------------------------------------

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderById(orderId));
    }
  }, [dispatch, orderId]);

  // --------------------------------------------------
  // Fetch review for this order
  // --------------------------------------------------

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderReview(orderId));
    }
  }, [dispatch, orderId]);

  // --------------------------------------------------
  // Loading
  // --------------------------------------------------

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

  // --------------------------------------------------
  // Error
  // --------------------------------------------------

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity='error'>{error}</Alert>

        <Button
          sx={{ mt: 2 }}
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/orders")}
        >
          Back to Orders
        </Button>
      </Box>
    );
  }

  if (!order) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity='info'>Order not found.</Alert>
      </Box>
    );
  }

  // --------------------------------------------------
  // Derived values
  // --------------------------------------------------

  const canCancel = order.status === "PLACED" || order.status === "ACCEPTED";

  const canReview = order.status === "DELIVERED";

  const currentStep = STATUS_STEPS.indexOf(order.status);

  // --------------------------------------------------
  // Cancel order
  // --------------------------------------------------

  const handleOpenCancelDialog = () => {
    setIsCancelDialogOpen(true);
  };

  const handleCloseCancelDialog = () => {
    if (!cancelling) {
      setIsCancelDialogOpen(false);
    }
  };

  const handleCancelOrder = async () => {
    try {
      await dispatch(cancelOrder(order.id)).unwrap();

      setIsCancelDialogOpen(false);

      // Refresh order details
      dispatch(fetchOrderById(orderId));
    } catch (error) {
      // Error is already handled by Redux state.
    }
  };

  // --------------------------------------------------
  // Review
  // --------------------------------------------------

  const handleOpenReviewDialog = () => {
    setIsReviewDialogOpen(true);
  };

  const handleCloseReviewDialog = (review) => {
    setIsReviewDialogOpen(false);

    if (review) {
      dispatch(fetchOrderReview(orderId));
    }
  };

  // --------------------------------------------------
  // Delete review
  // --------------------------------------------------

  const handleOpenDeleteReviewDialog = () => {
    setIsDeleteReviewDialogOpen(true);
  };

  const handleCloseDeleteReviewDialog = () => {
    if (!deleting) {
      setIsDeleteReviewDialogOpen(false);
    }
  };

  const handleDeleteReview = async () => {
    if (!orderReview?.id) {
      return;
    }

    try {
      await dispatch(removeReview(orderReview.id)).unwrap();

      setIsDeleteReviewDialogOpen(false);

      dispatch(fetchOrderReview(orderId));
    } catch (error) {
      // Error is already handled by Redux.
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        px: { xs: 2, md: 3 },
        py: 3,
      }}
    >
      {/* ================================================
          HEADER
      ================================================= */}

      <Stack direction='row' spacing={1} sx={{ mb: 3, alignItems: "center" }}>
        <IconButton onClick={() => navigate("/orders")}>
          <ArrowBackIcon />
        </IconButton>

        <Box>
          <Typography variant='h5' fontWeight={700}>
            Order Details
          </Typography>

          <Typography variant='body2' color='textSecondary'>
            Order #{order.orderId || order.id}
          </Typography>
        </Box>
      </Stack>

      {/* ================================================
          ORDER STATUS
      ================================================= */}

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{
              mb: 3,
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
            }}
          >
            <Box>
              <Typography variant='h6' fontWeight={600}>
                Order Status
              </Typography>

              <Typography variant='body2' color='textSecondary'>
                Track your order progress
              </Typography>
            </Box>

            <Chip
              label={getStatusLabel(order.status)}
              color={
                order.status === "DELIVERED"
                  ? "success"
                  : order.status === "CANCELLED" || order.status === "REJECTED"
                    ? "error"
                    : "primary"
              }
            />
          </Stack>

          {order.status !== "CANCELLED" && order.status !== "REJECTED" && (
            <Stepper
              activeStep={currentStep >= 0 ? currentStep : 0}
              alternativeLabel
            >
              {STATUS_STEPS.map((status) => (
                <Step key={status}>
                  <StepLabel>{getStatusLabel(status)}</StepLabel>
                </Step>
              ))}
            </Stepper>
          )}
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {/* ================================================
            LEFT COLUMN
        ================================================= */}

        <Grid size={{ xs: 12, md: 8 }}>
          {/* Restaurant */}

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant='h6' fontWeight={600} sx={{ mb: 2 }}>
                Restaurant
              </Typography>

              <Typography variant='body1' fontWeight={600}>
                {order.restaurant?.name || "Restaurant"}
              </Typography>

              {order.restaurant?.address && (
                <Typography variant='body2' color='textSecondary'>
                  {order.restaurant.address}
                </Typography>
              )}
            </CardContent>
          </Card>

          {/* Items */}

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant='h6' fontWeight={600} sx={{ mb: 2 }}>
                Items
              </Typography>

              <Stack spacing={2}>
                {order.items?.map((item) => (
                  <Box key={item.id}>
                    <Stack
                      direction='row'
                      sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                      spacing={2}
                    >
                      <Box>
                        <Typography fontWeight={500}>
                          {item.quantity} ×{" "}
                          {item.itemName || item.menuItem?.name || "Item"}
                        </Typography>

                        {item.unitPrice && (
                          <Typography variant='body2' color='textSecondary'>
                            ₹{item.unitPrice} each
                          </Typography>
                        )}
                      </Box>

                      <Typography fontWeight={600}>
                        ₹{item.totalPrice ?? item.total ?? 0}
                      </Typography>
                    </Stack>

                    <Divider sx={{ mt: 2 }} />
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>

          {/* Delivery Address */}

          {order.delivery && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant='h6' fontWeight={600} sx={{ mb: 2 }}>
                  Delivery Address
                </Typography>

                <Typography fontWeight={500}>
                  {order.delivery.address}
                </Typography>

                {order.delivery.landmark && (
                  <Typography variant='body2' color='textSecondary'>
                    Landmark: {order.delivery.landmark}
                  </Typography>
                )}

                <Typography variant='body2' color='textSecondary'>
                  {order.delivery.city}, {order.delivery.state} -{" "}
                  {order.delivery.pincode}
                </Typography>
              </CardContent>
            </Card>
          )}

          {/* Payment */}

          {order.pricing && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant='h6' fontWeight={600} sx={{ mb: 2 }}>
                  Payment
                </Typography>

                <Stack direction='row' sx={{ justifyContent: "space-between" }}>
                  <Typography>Payment Method</Typography>

                  <Typography fontWeight={600}>
                    {order.pricing.method ||
                      order.pricing.paymentMethod ||
                      "COD"}
                  </Typography>
                </Stack>

                <Stack
                  direction='row'
                  sx={{ mt: 1, justifyContent: "space-between" }}
                >
                  <Typography>Payment Status</Typography>

                  <Chip
                    size='small'
                    label={order.pricing.paymentStatus || "PENDING"}
                  />
                </Stack>
              </CardContent>
            </Card>
          )}
        </Grid>

        {/* ================================================
            RIGHT COLUMN
        ================================================= */}

        <Grid size={{ xs: 12, md: 4 }}>
          {/* ============================================
              PRICE SUMMARY
          ============================================= */}

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant='h6' fontWeight={600} sx={{ mb: 2 }}>
                Price Summary
              </Typography>

              {order.pricing && (
                <Stack spacing={1.5}>
                  <Stack
                    direction='row'
                    sx={{ justifyContent: "space-between" }}
                  >
                    <Typography>Subtotal</Typography>

                    <Typography>₹{order.pricing.subtotal ?? 0}</Typography>
                  </Stack>

                  <Stack
                    direction='row'
                    sx={{ justifyContent: "space-between" }}
                  >
                    <Typography>Delivery Fee</Typography>

                    <Typography>₹{order.pricing.deliveryFee ?? 0}</Typography>
                  </Stack>

                  <Stack
                    direction='row'
                    sx={{ justifyContent: "space-between" }}
                  >
                    <Typography>Tax</Typography>

                    <Typography>₹{order.pricing.taxAmount ?? 0}</Typography>
                  </Stack>

                  <Divider />

                  <Stack
                    direction='row'
                    sx={{ justifyContent: "space-between" }}
                  >
                    <Typography fontWeight={700}>Total</Typography>

                    <Typography fontWeight={700} variant='h6'>
                      ₹{order.pricing.totalAmount ?? 0}
                    </Typography>
                  </Stack>
                </Stack>
              )}
            </CardContent>
          </Card>

          {/* ============================================
              REVIEW
          ============================================= */}

          {canReview && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Stack
                  direction='row'
                  spacing={1}
                  sx={{ mb: 1, alignItems: "center" }}
                >
                  <RateReviewOutlinedIcon />

                  <Typography variant='h6' fontWeight={600}>
                    Your Experience
                  </Typography>
                </Stack>

                {orderReviewError && (
                  <Alert severity='error' sx={{ mb: 2 }}>
                    {orderReviewError}
                  </Alert>
                )}

                {deleteError && (
                  <Alert severity='error' sx={{ mb: 2 }}>
                    {deleteError}
                  </Alert>
                )}

                {orderReviewLoading ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      py: 2,
                    }}
                  >
                    <CircularProgress size={28} />
                  </Box>
                ) : orderReview ? (
                  <>
                    {/* Restaurant Review */}

                    <Box sx={{ mb: 2 }}>
                      <Typography variant='subtitle2' color='textSecondary'>
                        Restaurant
                      </Typography>

                      <Stack
                        direction='row'
                        spacing={0.5}
                        sx={{ mt: 0.5, alignItems: "center" }}
                      >
                        <StarIcon fontSize='small' color='warning' />

                        <Typography fontWeight={600}>
                          {orderReview.restaurantRating}/5
                        </Typography>
                      </Stack>

                      {orderReview.restaurantComment && (
                        <Typography variant='body2' sx={{ mt: 0.5 }}>
                          {orderReview.restaurantComment}
                        </Typography>
                      )}
                    </Box>

                    {/* Delivery Review */}

                    {orderReview.deliveryRating != null && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant='subtitle2' color='textSecondary'>
                          Delivery
                        </Typography>

                        <Stack
                          direction='row'
                          spacing={0.5}
                          sx={{ mt: 0.5, alignItems: "center" }}
                        >
                          <StarIcon fontSize='small' color='warning' />

                          <Typography fontWeight={600}>
                            {orderReview.deliveryRating}/5
                          </Typography>
                        </Stack>

                        {orderReview.deliveryComment && (
                          <Typography variant='body2' sx={{ mt: 0.5 }}>
                            {orderReview.deliveryComment}
                          </Typography>
                        )}
                      </Box>
                    )}

                    <Divider sx={{ mb: 2 }} />

                    <Stack direction='row' spacing={1}>
                      <Button
                        variant='outlined'
                        size='small'
                        startIcon={<EditOutlinedIcon />}
                        onClick={handleOpenReviewDialog}
                      >
                        Edit Review
                      </Button>

                      <Button
                        variant='outlined'
                        color='error'
                        size='small'
                        startIcon={<DeleteOutlinedIcon />}
                        onClick={handleOpenDeleteReviewDialog}
                        disabled={deleting}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </>
                ) : (
                  <>
                    <Typography
                      variant='body2'
                      color='textSecondary'
                      sx={{ mb: 2 }}
                    >
                      How was your food, restaurant, and delivery experience?
                    </Typography>

                    <Button
                      variant='contained'
                      startIcon={<RateReviewOutlinedIcon />}
                      onClick={handleOpenReviewDialog}
                    >
                      Rate Your Order
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          )}

          {/* ============================================
              CANCEL ORDER
          ============================================= */}

          {canCancel && (
            <Card>
              <CardContent>
                <Typography variant='h6' fontWeight={600} sx={{ mb: 1 }}>
                  Cancel Order
                </Typography>

                <Typography
                  variant='body2'
                  color='textSecondary'
                  sx={{ mb: 2 }}
                >
                  You can cancel this order while it is still being accepted or
                  prepared.
                </Typography>

                <Button
                  fullWidth
                  variant='outlined'
                  color='error'
                  onClick={handleOpenCancelDialog}
                  disabled={cancelling && cancellingOrderId === order.id}
                >
                  {cancelling && cancellingOrderId === order.id
                    ? "Cancelling..."
                    : "Cancel Order"}
                </Button>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>

      {/* ================================================
          REVIEW CREATE / EDIT DIALOG
      ================================================= */}

      <ReviewDialog
        open={isReviewDialogOpen}
        onClose={handleCloseReviewDialog}
        orderId={order.id}
        review={orderReview}
      />

      {/* ================================================
          DELETE REVIEW CONFIRMATION
      ================================================= */}

      <Dialog
        open={isDeleteReviewDialogOpen}
        onClose={handleCloseDeleteReviewDialog}
        maxWidth='xs'
        fullWidth
      >
        <DialogTitle>Delete Review?</DialogTitle>

        <DialogContent>
          <Typography color='text.secondary'>
            Are you sure you want to delete your review? This action cannot be
            undone.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDeleteReviewDialog} disabled={deleting}>
            Keep Review
          </Button>

          <Button
            color='error'
            variant='contained'
            onClick={handleDeleteReview}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete Review"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ================================================
          CANCEL ORDER CONFIRMATION
      ================================================= */}

      <Dialog
        open={isCancelDialogOpen}
        onClose={handleCloseCancelDialog}
        maxWidth='xs'
        fullWidth
      >
        <DialogTitle>Cancel Order?</DialogTitle>

        <DialogContent>
          <Typography color='text.secondary'>
            Are you sure you want to cancel this order? This action cannot be
            undone.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseCancelDialog} disabled={cancelling}>
            Keep Order
          </Button>

          <Button
            color='error'
            variant='contained'
            onClick={handleCancelOrder}
            disabled={cancelling}
          >
            {cancelling ? "Cancelling..." : "Cancel Order"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrderDetailsPage;
