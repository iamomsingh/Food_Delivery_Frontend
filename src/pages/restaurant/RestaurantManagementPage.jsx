import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";

import RestaurantInfoCard from "../../components/restaurant/management/RestaurantInfoCard";
import RestaurantFormDialog from "../../components/restaurant/management/RestaurantFormDialog";

import {
  createRestaurant,
  deleteRestaurant,
  updateRestaurant,
} from "../../features/restaurant/restaurantOwnerSlice";

function RestaurantManagementPage() {
  const dispatch = useDispatch();

  const {
    restaurants,
    activeRestaurantId,
    actionLoadingType,
    actionLoadingId,
    actionError,
  } = useSelector((state) => state.restaurantOwner);

  const [searchParams, setSearchParams] = useSearchParams();

  const [createOpen, setCreateOpen] = useState(
    searchParams.get("create") === "true",
  );

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const activeRestaurant = restaurants.find(
    (restaurant) => restaurant.id === activeRestaurantId,
  );

  const isCreating = actionLoadingType === "CREATE_RESTAURANT";

  const isUpdating =
    actionLoadingType === "UPDATE_RESTAURANT" &&
    actionLoadingId === activeRestaurant?.id;

  const isDeleting =
    actionLoadingType === "DELETE_RESTAURANT" &&
    actionLoadingId === activeRestaurant?.id;

  const handleOpenCreate = () => {
    setCreateOpen(true);
  };

  const handleCloseCreate = () => {
    setCreateOpen(false);

    const params = new URLSearchParams(searchParams);
    params.delete("create");

    setSearchParams(params, { replace: true });
  };

  const handleCreate = async (data) => {
    const result = await dispatch(createRestaurant(data));

    if (createRestaurant.fulfilled.match(result)) {
      handleCloseCreate();
    }
  };

  const handleUpdate = async (data) => {
    if (!activeRestaurant) {
      return;
    }

    const result = await dispatch(
      updateRestaurant({
        restaurantId: activeRestaurant.id,
        data,
      }),
    );

    if (updateRestaurant.fulfilled.match(result)) {
      setEditOpen(false);
    }
  };

  const handleDelete = async () => {
    if (!activeRestaurant) {
      return;
    }

    const result = await dispatch(deleteRestaurant(activeRestaurant.id));

    if (deleteRestaurant.fulfilled.match(result)) {
      setDeleteOpen(false);
    }
  };

  return (
    <Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          mb: 3,
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
        }}
      >
        <Box>
          <Typography variant='h5' sx={{ fontWeight: 600 }}>
            Restaurant Management
          </Typography>

          <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
            Manage your restaurant information and settings.
          </Typography>
        </Box>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
          <Button
            variant='contained'
            onClick={handleOpenCreate}
            disabled={isCreating || isUpdating || isDeleting}
          >
            + Add Restaurant
          </Button>

          {activeRestaurant && (
            <>
              <Button
                variant='outlined'
                onClick={() => setEditOpen(true)}
                disabled={isCreating || isDeleting}
              >
                Edit Restaurant
              </Button>

              <Button
                variant='outlined'
                color='error'
                onClick={() => setDeleteOpen(true)}
                disabled={isCreating || isUpdating || isDeleting}
              >
                Delete Restaurant
              </Button>
            </>
          )}
        </Stack>
      </Stack>

      {actionError && (
        <Alert severity='error' sx={{ mb: 3 }}>
          {actionError}
        </Alert>
      )}

      {/* ================================
          RESTAURANT CONTENT
      ================================= */}

      {activeRestaurant ? (
        <RestaurantInfoCard restaurant={activeRestaurant} />
      ) : (
        <Alert severity='info'>
          You don't have a restaurant yet. Click <strong>Add Restaurant</strong>{" "}
          to create your first restaurant.
        </Alert>
      )}

      {/* ================================
          CREATE RESTAURANT DIALOG
      ================================= */}

      <RestaurantFormDialog
        open={createOpen}
        mode='create'
        loading={isCreating}
        onClose={handleCloseCreate}
        onSubmit={handleCreate}
      />

      {/* ================================
          EDIT RESTAURANT DIALOG
      ================================= */}

      {activeRestaurant && (
        <RestaurantFormDialog
          open={editOpen}
          restaurant={activeRestaurant}
          loading={isUpdating}
          onClose={() => setEditOpen(false)}
          onSubmit={handleUpdate}
        />
      )}

      {/* ================================
          DELETE CONFIRMATION
      ================================= */}

      {activeRestaurant && (
        <Dialog
          open={deleteOpen}
          onClose={isDeleting ? undefined : () => setDeleteOpen(false)}
          maxWidth='xs'
          fullWidth
        >
          <DialogTitle>Delete Restaurant?</DialogTitle>

          <DialogContent>
            <Typography>
              Are you sure you want to delete{" "}
              <strong>{activeRestaurant.name}</strong>?
            </Typography>

            <Alert severity='warning' sx={{ mt: 2 }}>
              This action cannot be undone.
            </Alert>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setDeleteOpen(false)} disabled={isDeleting}>
              Cancel
            </Button>

            <Button
              color='error'
              variant='contained'
              onClick={handleDelete}
              loading={isDeleting}
            >
              Delete Restaurant
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}

export default RestaurantManagementPage;
