import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";

import {
  acceptOrder,
  markOrderPreparing,
  markOrderReadyForPickup,
  rejectOrder,
} from "../../features/restaurant/restaurantOwnerOrderSlice";

function RestaurantOrderActions({ order, variant = "details" }) {
  const dispatch = useDispatch();

  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);

  const { activeRestaurantId } = useSelector((state) => state.restaurantOwner);

  const { actionLoadingOrderId, actionError, actionErrorOrderId } = useSelector(
    (state) => state.restaurantOwnerOrder,
  );

  if (!order || !activeRestaurantId) {
    return null;
  }

  const handleAccept = () => {
    dispatch(
      acceptOrder({
        restaurantId: activeRestaurantId,
        orderId: order.id,
      }),
    );
  };

  const handlePreparing = () => {
    dispatch(
      markOrderPreparing({
        restaurantId: activeRestaurantId,
        orderId: order.id,
      }),
    );
  };

  const handleReadyForPickup = () => {
    dispatch(
      markOrderReadyForPickup({
        restaurantId: activeRestaurantId,
        orderId: order.id,
      }),
    );
  };

  const handleReject = () => {
    setRejectDialogOpen(true);
  };

  const handleRejectCancel = () => {
    setRejectDialogOpen(false);
  };

  const handleRejectConfirm = () => {
    setRejectDialogOpen(false);

    dispatch(
      rejectOrder({
        restaurantId: activeRestaurantId,
        orderId: order.id,
      }),
    );
  };

  const buttonProps = {
    size: variant === "table" ? "small" : "medium",
    disabled: actionLoadingOrderId === order.id,
  };

  const renderActions = () => {
    switch (order.status) {
      case "PLACED":
        return (
          <>
            <Button {...buttonProps} variant='contained' onClick={handleAccept}>
              {actionLoadingOrderId === order.id ? "Accepting..." : "Accept"}
            </Button>

            <Button
              {...buttonProps}
              variant='outlined'
              color='error'
              onClick={handleReject}
            >
              Reject Order
            </Button>
          </>
        );

      case "ACCEPTED":
        return (
          <Button
            {...buttonProps}
            variant='contained'
            onClick={handlePreparing}
          >
            {actionLoadingOrderId === order.id ? "Updating..." : "Preparing"}
          </Button>
        );

      case "PREPARING":
        return (
          <Button
            {...buttonProps}
            variant='contained'
            onClick={handleReadyForPickup}
          >
            {actionLoadingOrderId === order.id ? "Updating..." : "Ready"}
          </Button>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Stack direction='row' spacing={1} alignItems='center' flexWrap='wrap'>
        {renderActions()}

        {actionErrorOrderId === order.id && actionError && (
          <Typography variant='caption' color='error' sx={{ width: "100%" }}>
            {actionError}
          </Typography>
        )}
      </Stack>

      <Dialog
        open={rejectDialogOpen}
        onClose={handleRejectCancel}
        maxWidth='xs'
        fullWidth
      >
        <DialogTitle>Reject Order?</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to reject order #{order.orderNumber}? This
            action cannot be undone.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleRejectCancel}
            disabled={actionLoadingOrderId === order.id}
          >
            Cancel
          </Button>

          <Button
            onClick={handleRejectConfirm}
            color='error'
            variant='contained'
            disabled={actionLoadingOrderId === order.id}
          >
            Reject Order
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default RestaurantOrderActions;
