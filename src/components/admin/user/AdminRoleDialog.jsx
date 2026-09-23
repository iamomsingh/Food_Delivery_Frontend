import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

function AdminRoleDialog({ open, user, action, loading, onClose, onConfirm }) {
  if (!user) {
    return null;
  }

  const isRemove = action === "REMOVE";

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      maxWidth='xs'
      fullWidth
    >
      <DialogTitle>
        {isRemove ? "Remove ADMIN Role?" : "Assign ADMIN Role?"}
      </DialogTitle>

      <DialogContent>
        <Typography variant='body1'>
          Are you sure you want to{" "}
          {isRemove ? "remove the ADMIN role from" : "assign the ADMIN role to"}{" "}
          <strong>
            {user.firstName} {user.lastName}
          </strong>
          ?
        </Typography>

        {isRemove && (
          <Alert severity='warning' sx={{ mt: 2 }}>
            This user will no longer have access to admin-only features.
          </Alert>
        )}

        {!isRemove && (
          <Alert severity='info' sx={{ mt: 2 }}>
            This user will gain access to admin-only features and user
            management.
          </Alert>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>

        <Button
          variant='contained'
          color={isRemove ? "error" : "primary"}
          onClick={onConfirm}
          disabled={loading}
          startIcon={
            loading ? <CircularProgress size={16} color='inherit' /> : null
          }
        >
          {isRemove ? "Remove ADMIN" : "Make ADMIN"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AdminRoleDialog;
