import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
import {
  fetchAddresses,
  removeAddress,
  setDefaultAddress,
} from "../../features/address/addressSlice";

function AddressSection({
  selectedAddressId,
  onSelectAddress,
  onAddressDeleted,
}) {
  const dispatch = useDispatch();
  const {
    addresses,
    loading,
    error,
    updating,
    deleting,
    creating,
    updatingAddressId,
  } = useSelector((state) => state.address);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [deletingAddress, setDeletingAddress] = useState(null);

  function handleOpenAddDialog() {
    setIsAddDialogOpen(true);
  }

  function handleCloseAddDialog() {
    setIsAddDialogOpen(false);
  }

  function handleEditAddress(address) {
    setEditingAddress(address);
  }

  function handleCloseEditDialog() {
    setEditingAddress(null);
  }

  function handleDeleteAddress(address) {
    setDeletingAddress(address);
  }

  function handleCloseDeleteDialog() {
    setDeletingAddress(null);
  }

  async function handleConfirmDelete() {
    if (!deletingAddress) return;

    const result = await dispatch(removeAddress(deletingAddress.id));

    if (removeAddress.fulfilled.match(result)) {
      onAddressDeleted(deletingAddress.id);
      setDeletingAddress(null);
    }

    if (deletingAddress.isDefault) {
      dispatch(fetchAddresses());
    }
  }

  function handleMakeDefault(address) {
    dispatch(setDefaultAddress(address.id));
  }

  return (
    <Box component='section'>
      {/* Section Header */}

      <Stack
        direction='row'
        sx={{ mb: 2, justifyContent: "space-between", alignItems: "center" }}
      >
        <Box>
          <Typography variant='h5' fontWeight={700}>
            Delivery Address
          </Typography>

          <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
            Select where you want your order delivered.
          </Typography>
        </Box>

        <Button
          variant='outlined'
          startIcon={<AddIcon />}
          onClick={handleOpenAddDialog}
        >
          Add Address
        </Button>
      </Stack>

      {/* Loading */}

      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 5,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {/* Error */}

      {!loading && error && <Alert severity='error'>{error}</Alert>}

      {/* Empty state */}

      {!loading && !error && addresses.length === 0 && (
        <Box
          sx={{
            border: "1px dashed",
            borderColor: "divider",
            borderRadius: 3,
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography fontWeight={600}>No delivery address found</Typography>

          <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
            Add an address to continue with checkout.
          </Typography>

          <Button
            variant='contained'
            startIcon={<AddIcon />}
            onClick={handleOpenAddDialog}
            sx={{ mt: 2 }}
          >
            Add New Address
          </Button>
        </Box>
      )}

      {/* Address List */}

      {!loading && !error && addresses.length > 0 && (
        <Stack spacing={2}>
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              selected={selectedAddressId === address.id}
              onSelect={onSelectAddress}
              onEdit={handleEditAddress}
              onDelete={handleDeleteAddress}
              onMakeDefault={handleMakeDefault}
              updatingAddressId={updatingAddressId}
            />
          ))}
        </Stack>
      )}

      {/* Add Address Dialog */}

      <Dialog
        open={isAddDialogOpen}
        onClose={handleCloseAddDialog}
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle
          sx={{
            pr: 6,
            fontWeight: 700,
          }}
        >
          Add New Address
          <IconButton
            onClick={handleCloseAddDialog}
            sx={{
              position: "absolute",
              right: 12,
              top: 12,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <AddressForm
            onSuccess={handleCloseAddDialog}
            onCancel={handleCloseAddDialog}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(editingAddress)}
        onClose={handleCloseEditDialog}
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle
          sx={{
            pr: 6,
            fontWeight: 700,
          }}
        >
          Edit Address
          <IconButton
            onClick={handleCloseEditDialog}
            sx={{
              position: "absolute",
              right: 12,
              top: 12,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          {editingAddress && (
            <AddressForm
              mode='edit'
              initialData={editingAddress}
              onSuccess={handleCloseEditDialog}
              onCancel={handleCloseEditDialog}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(deletingAddress)}
        onClose={handleCloseDeleteDialog}
        fullWidth
        maxWidth='xs'
      >
        <DialogTitle fontWeight={700}>Delete Address?</DialogTitle>

        <DialogContent>
          <Typography>Are you sure you want to delete this address?</Typography>

          {deletingAddress && (
            <Box
              sx={{
                mt: 2,
                p: 2,
                borderRadius: 2,
                bgcolor: "action.hover",
              }}
            >
              <Typography fontWeight={700}>{deletingAddress.label}</Typography>

              <Typography
                variant='body2'
                color='text.secondary'
                sx={{ mt: 0.5 }}
              >
                {deletingAddress.address}
              </Typography>

              <Typography variant='body2' color='text.secondary'>
                {deletingAddress.city}, {deletingAddress.state} -{" "}
                {deletingAddress.pinCode}
              </Typography>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>

          <Button
            color='error'
            variant='contained'
            disabled={deleting}
            onClick={handleConfirmDelete}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AddressSection;
