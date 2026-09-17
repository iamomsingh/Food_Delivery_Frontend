import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

function RestaurantRejectDialog({
  open,
  restaurant,
  loading,
  onClose,
  onConfirm,
}) {
  if (!restaurant) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      fullWidth
      maxWidth='xs'
    >
      <DialogTitle>Reject Restaurant?</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to reject <strong>{restaurant.name}</strong>?
        </DialogContentText>

        <DialogContentText sx={{ mt: 1 }}>
          The restaurant status will be changed to REJECTED.
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>

        <Button
          variant='contained'
          color='error'
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? "Rejecting..." : "Reject"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RestaurantRejectDialog;
