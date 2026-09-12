import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";

import {
  acceptOrder,
  assignDeliveryPartner,
  fetchRestaurantOrder,
  markOrderPreparing,
  markOrderReadyForPickup,
  rejectOrder,
} from "../../features/restaurant/restaurantOwnerOrderSlice";
import { fetchAvailableDeliveryPartners } from "../../features/restaurant/restaurantOwnerDeliveryPartnerSlice";

function RestaurantOrderActions({ order, variant = "details" }) {
  const dispatch = useDispatch();

  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedPartnerId, setSelectedPartnerId] = useState("");

  const { activeRestaurantId } = useSelector((state) => state.restaurantOwner);

  const { actionLoadingOrderId, actionError, actionErrorOrderId } = useSelector(
    (state) => state.restaurantOwnerOrder,
  );

  const {
    partners,
    loading: partnersLoading,
    error: partnersError,
  } = useSelector((state) => state.restaurantOwnerDeliveryPartner);

  useEffect(() => {
    if (assignDialogOpen && partners.length === 0) {
      dispatch(fetchAvailableDeliveryPartners());
    }
  }, [assignDialogOpen, partners.length, dispatch]);

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

  const handleAssignDialogOpen = () => {
    setSelectedPartnerId("");
    setAssignDialogOpen(true);
  };

  const handleAssignDialogClose = () => {
    setAssignDialogOpen(false);
    setSelectedPartnerId("");
  };

  const handleAssignPartner = async () => {
    if (!selectedPartnerId) {
      return;
    }

    const result = await dispatch(
      assignDeliveryPartner({
        restaurantId: activeRestaurantId,
        orderId: order.id,
        deliveryPartnerId: selectedPartnerId,
      }),
    );

    if (assignDeliveryPartner.fulfilled.match(result)) {
      setAssignDialogOpen(false);
      setSelectedPartnerId("");

      dispatch(
        fetchRestaurantOrder({
          restaurantId: activeRestaurantId,
          orderId: order.id,
        }),
      );

      dispatch(fetchAvailableDeliveryPartners());
    }
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
              {actionLoadingOrderId === order.id ? "Rejecting..." : "Reject"}
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

      case "READY_FOR_PICKUP":
        if (order.assignedDeliveryPartnerId) {
          return (
            <Chip
              label='Waiting for Pickup'
              size={variant === "table" ? "small" : "medium"}
              variant='outlined'
            />
          );
        }

        return (
          <Button
            {...buttonProps}
            variant='contained'
            onClick={handleAssignDialogOpen}
          >
            {actionLoadingOrderId === order.id ? "Assigning..." : "Assign"}
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

      <Dialog
        open={assignDialogOpen}
        onClose={handleAssignDialogClose}
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle>Assign Delivery Partner</DialogTitle>

        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <Typography variant='body2' color='text.secondary'>
              Select an available delivery partner for this order.
            </Typography>

            <Select
              fullWidth
              value={selectedPartnerId}
              onChange={(event) => setSelectedPartnerId(event.target.value)}
              displayEmpty
              disabled={partnersLoading}
            >
              <MenuItem value=''>
                {partnersLoading
                  ? "Loading delivery partners..."
                  : "Select delivery partner"}
              </MenuItem>

              {partners.map((partner) => (
                <MenuItem key={partner.id} value={partner.id}>
                  {partner.name}
                  {partner.vehicleType} - {partner.vehicleNumber}
                </MenuItem>
              ))}
            </Select>

            {partnersError && (
              <Typography color='error' variant='body2'>
                {partnersError}
              </Typography>
            )}

            {!partnersLoading && !partnersError && partners.length === 0 && (
              <Typography variant='body2' color='text.secondary'>
                No delivery partners are currently available.
              </Typography>
            )}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleAssignDialogClose}>Cancel</Button>

          <Button
            variant='contained'
            onClick={handleAssignPartner}
            disabled={!selectedPartnerId || actionLoadingOrderId === order.id}
          >
            Assign
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default RestaurantOrderActions;
