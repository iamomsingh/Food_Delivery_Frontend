import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

const actionConfig = {
  ACTIVE: {
    title: "Activate User",
    message: "Are you sure you want to activate this user?",
    button: "Activate",
    color: "success",
  },

  SUSPENDED: {
    title: "Suspend User",
    message: "Are you sure you want to suspend this user?",
    button: "Suspend",
    color: "warning",
  },

  BLOCKED: {
    title: "Block User",
    message: "Are you sure you want to block this user?",
    button: "Block",
    color: "error",
  },
};

function UserStatusDialog({
  open,
  user,
  targetStatus,
  loading,
  onClose,
  onConfirm,
}) {
  if (!user) {
    return null;
  }

  const config = actionConfig[targetStatus];

  if (!config) {
    return null;
  }

  const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      maxWidth='xs'
      fullWidth
    >
      <DialogTitle>{config.title}</DialogTitle>

      <DialogContent>
        <Typography>{config.message}</Typography>

        <Typography sx={{ mt: 2 }} fontWeight={600}>
          {fullName}
        </Typography>

        <Typography variant='body2' color='text.secondary'>
          {user.email}
        </Typography>

        <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
          Current status: {user.status}
        </Typography>

        <Typography variant='body2' color='text.secondary'>
          New status: {targetStatus}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>

        <Button
          variant='contained'
          color={config.color}
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? "Processing..." : config.button}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserStatusDialog;
