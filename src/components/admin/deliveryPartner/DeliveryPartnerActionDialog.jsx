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

function DeliveryPartnerActionDialog({
  open,
  partner,
  actionType,
  loading,
  onClose,
  onConfirm,
}) {
  if (!partner) {
    return null;
  }

  const fullName = partner.user
    ? `${partner.user.firstName} ${partner.user.lastName}`
    : "Unknown";

  const actionConfig = {
    APPROVE: {
      title: "Approve Delivery Partner",
      description: `Are you sure you want to approve ${fullName} as a delivery partner?`,
      confirmLabel: "Approve",
      confirmColor: "success",
    },

    REJECT: {
      title: "Reject Delivery Partner",
      description: `Are you sure you want to reject ${fullName}'s delivery partner application?`,
      confirmLabel: "Reject",
      confirmColor: "error",
    },

    SUSPEND: {
      title: "Suspend Delivery Partner",
      description: `Are you sure you want to suspend ${fullName}? They will no longer be able to work as a delivery partner.`,
      confirmLabel: "Suspend",
      confirmColor: "warning",
    },

    UNSUSPEND: {
      title: "Unsuspend Delivery Partner",
      description: `Are you sure you want to unsuspend ${fullName}? They will be allowed to work as a delivery partner again.`,
      confirmLabel: "Unsuspend",
      confirmColor: "success",
    },
  };

  const config = actionConfig[actionType];

  if (!config) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      fullWidth
      maxWidth='sm'
    >
      <DialogTitle>{config.title}</DialogTitle>

      <DialogContent>
        <DialogContentText>{config.description}</DialogContentText>

        <Stack
          spacing={0.5}
          sx={{
            mt: 2,
            p: 2,
            borderRadius: 1,
            bgcolor: "action.hover",
          }}
        >
          <Typography variant='body2'>
            <strong>Vehicle:</strong> {partner.vehicleType}
          </Typography>

          <Typography variant='body2'>
            <strong>Vehicle Number:</strong> {partner.vehicleNumber}
          </Typography>

          <Typography variant='body2'>
            <strong>Current Status:</strong> {partner.status}
          </Typography>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>

        <Button
          variant='contained'
          color={config.confirmColor}
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? "Processing..." : config.confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeliveryPartnerActionDialog;
