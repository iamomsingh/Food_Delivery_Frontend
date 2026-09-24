import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
  Stack,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

import AddressForm from "../../components/customer/address/AddressForm";

import {
  fetchAddresses,
  removeAddress,
  setDefaultAddress,
} from "../../features/customer/addressSlice";

function AddressPage() {
  const dispatch = useDispatch();

  const {
    addresses,
    loading,
    error,
    creating,
    updating,
    updatingAddressId,
    deleting,
  } = useSelector((state) => state.address);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [deletingAddress, setDeletingAddress] = useState(null);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  function handleOpenAddDialog() {
    setIsAddDialogOpen(true);
  }

  function handleCloseAddDialog() {
    if (creating) {
      return;
    }

    setIsAddDialogOpen(false);
  }

  function handleEditAddress(address) {
    setEditingAddress(address);
  }

  function handleCloseEditDialog() {
    if (updating) {
      return;
    }

    setEditingAddress(null);
  }

  function handleDeleteAddress(address) {
    setDeletingAddress(address);
  }

  function handleCloseDeleteDialog() {
    if (deleting) {
      return;
    }

    setDeletingAddress(null);
  }

  async function handleConfirmDelete() {
    if (!deletingAddress) {
      return;
    }

    const result = await dispatch(removeAddress(deletingAddress.id));

    if (removeAddress.fulfilled.match(result)) {
      setDeletingAddress(null);
    }
  }

  function handleMakeDefault(address) {
    dispatch(setDefaultAddress(address.id));
  }

  return (
    <Box>
      {/* Header */}

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          mb: 4,
          justifyContent: "space-between",
          alignItems: {
            xs: "stretch",
            sm: "center",
          },
        }}
      >
        <Box>
          <Typography variant='h4' fontWeight={700}>
            My Addresses
          </Typography>

          <Typography variant='body2' color='textSecondary' sx={{ mt: 0.5 }}>
            Manage your saved delivery addresses.
          </Typography>
        </Box>

        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={handleOpenAddDialog}
          disabled={creating}
        >
          Add Address
        </Button>
      </Stack>

      {/* Error */}

      {error && (
        <Alert severity='error' sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Loading */}

      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 8,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {/* Empty State */}

      {!loading && !error && addresses.length === 0 && (
        <Card>
          <CardContent
            sx={{
              py: 8,
              textAlign: "center",
            }}
          >
            <LocationOnOutlinedIcon
              sx={{
                fontSize: 64,
                color: "text.secondary",
                mb: 2,
              }}
            />

            <Typography variant='h5' fontWeight={600}>
              No saved addresses
            </Typography>

            <Typography
              variant='body2'
              color='textSecondary'
              sx={{
                mt: 1,
                mb: 3,
                maxWidth: 500,
                mx: "auto",
              }}
            >
              Add a delivery address so you can quickly select it when placing
              an order.
            </Typography>

            <Button
              variant='contained'
              startIcon={<AddIcon />}
              onClick={handleOpenAddDialog}
            >
              Add Your First Address
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Address List */}

      {!loading && !error && addresses.length > 0 && (
        <Grid container spacing={2}>
          {addresses.map((address) => (
            <Grid
              key={address.id}
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <SavedAddressCard
                address={address}
                updating={updatingAddressId === address.id}
                deleting={deleting}
                onEdit={handleEditAddress}
                onDelete={handleDeleteAddress}
                onMakeDefault={handleMakeDefault}
              />
            </Grid>
          ))}
        </Grid>
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
            disabled={creating}
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

      {/* Edit Address Dialog */}

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
            disabled={updating}
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

      {/* Delete Dialog */}

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
                color='textSecondary'
                sx={{ mt: 0.5 }}
              >
                {deletingAddress.address}
              </Typography>

              <Typography variant='body2' color='textSecondary'>
                {deletingAddress.city}, {deletingAddress.state} -{" "}
                {deletingAddress.pinCode}
              </Typography>
            </Box>
          )}
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            pb: 2,
          }}
        >
          <Button onClick={handleCloseDeleteDialog} disabled={deleting}>
            Cancel
          </Button>

          <Button
            color='error'
            variant='contained'
            onClick={handleConfirmDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function SavedAddressCard({
  address,
  updating,
  deleting,
  onEdit,
  onDelete,
  onMakeDefault,
}) {
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        border: "1px solid",
        borderColor: address.isDefault ? "primary.main" : "divider",
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          {/* Header */}

          <Stack
            direction='row'
            sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
          >
            <Stack direction='row' spacing={1} sx={{ alignItems: "center" }}>
              <LocationOnOutlinedIcon color='action' />

              <Typography variant='h6' fontWeight={700}>
                {address.label}
              </Typography>
            </Stack>

            {address.isDefault && (
              <Chip label='Default' size='small' color='primary' />
            )}
          </Stack>

          <Divider />

          {/* Address details */}

          <Box>
            <Typography variant='body1'>{address.address}</Typography>

            {address.landmark && (
              <Typography
                variant='body2'
                color='textSecondary'
                sx={{ mt: 0.5 }}
              >
                Near {address.landmark}
              </Typography>
            )}

            <Typography variant='body2' color='textSecondary' sx={{ mt: 0.5 }}>
              {address.city}, {address.state} - {address.pinCode}
            </Typography>

            {address.country && (
              <Typography variant='body2' color='textSecondary'>
                {address.country}
              </Typography>
            )}
          </Box>

          {/* Actions */}

          <Stack direction='row' spacing={1} flexWrap='wrap' useFlexGap>
            <Button
              size='small'
              startIcon={<EditOutlinedIcon />}
              disabled={updating || deleting}
              onClick={() => onEdit(address)}
            >
              Edit
            </Button>

            <Button
              size='small'
              color='error'
              startIcon={<DeleteOutlineIcon />}
              disabled={updating || deleting}
              onClick={() => onDelete(address)}
            >
              Delete
            </Button>

            {!address.isDefault && (
              <Button
                size='small'
                disabled={updating || deleting}
                onClick={() => onMakeDefault(address)}
              >
                {updating ? "Processing..." : "Make Default"}
              </Button>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default AddressPage;
