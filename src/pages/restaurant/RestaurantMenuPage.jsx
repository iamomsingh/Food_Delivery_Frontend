import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import {
  addMenuItem,
  addRestaurantMenu,
  clearMenuActionError,
  clearRestaurantMenu,
  editMenuItem,
  editRestaurantMenu,
  fetchRestaurantMenuItems,
  fetchRestaurantMenus,
  removeMenuItem,
  removeRestaurantMenu,
} from "../../features/restaurant/restaurantOwnerMenuSlice";

import RestaurantMenuCard from "../../components/restaurant/menu/RestaurantMenuCard";
import MenuFormDialog from "../../components/restaurant/menu/MenuFormDialog";
import MenuItemFormDialog from "../../components/restaurant/menu/MenuItemFormDialog";

function RestaurantMenuPage() {
  const dispatch = useDispatch();

  const { activeRestaurantId } = useSelector((state) => state.restaurantOwner);

  const {
    menus,
    menuItems,
    loading,
    actionLoadingType,
    actionLoadingId,
    error,
    actionError,
  } = useSelector((state) => state.restaurantOwnerMenu);

  // --------------------------------
  // Menu dialog state
  // --------------------------------

  const [menuDialogOpen, setMenuDialogOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);

  // --------------------------------
  // Menu item dialog state
  // --------------------------------

  const [menuItemDialogOpen, setMenuItemDialogOpen] = useState(false);
  const [editingMenuItem, setEditingMenuItem] = useState(null);
  const [selectedMenuId, setSelectedMenuId] = useState(null);

  // --------------------------------
  // Delete menu dialog state
  // --------------------------------

  const [deleteMenuDialogOpen, setDeleteMenuDialogOpen] = useState(false);
  const [menuToDelete, setMenuToDelete] = useState(null);

  // --------------------------------
  // Delete menu item dialog state
  // --------------------------------

  const [deleteMenuItemDialogOpen, setDeleteMenuItemDialogOpen] =
    useState(false);

  const [menuItemToDelete, setMenuItemToDelete] = useState(null);

  // --------------------------------
  // Fetch menus and menu items
  // --------------------------------

  useEffect(() => {
    if (!activeRestaurantId) {
      return;
    }

    dispatch(fetchRestaurantMenus(activeRestaurantId));
    dispatch(fetchRestaurantMenuItems(activeRestaurantId));

    return () => {
      dispatch(clearRestaurantMenu());
    };
  }, [activeRestaurantId, dispatch]);

  // --------------------------------
  // Menu handlers
  // --------------------------------

  const handleAddMenu = () => {
    dispatch(clearMenuActionError());

    setEditingMenu(null);
    setMenuDialogOpen(true);
  };

  const handleEditMenu = (menu) => {
    dispatch(clearMenuActionError());

    setEditingMenu(menu);
    setMenuDialogOpen(true);
  };

  const handleMenuDialogClose = () => {
    setMenuDialogOpen(false);
    setEditingMenu(null);
  };

  const handleMenuSubmit = async (data) => {
    let result;

    if (editingMenu) {
      result = await dispatch(
        editRestaurantMenu({
          menuId: editingMenu.id,
          data,
        }),
      );
    } else {
      result = await dispatch(
        addRestaurantMenu({
          restaurantId: activeRestaurantId,
          data,
        }),
      );
    }

    if (
      addRestaurantMenu.fulfilled.match(result) ||
      editRestaurantMenu.fulfilled.match(result)
    ) {
      setMenuDialogOpen(false);
      setEditingMenu(null);
    }
  };

  // --------------------------------
  // Delete menu
  // --------------------------------

  const handleDeleteMenu = (menu) => {
    dispatch(clearMenuActionError());

    setMenuToDelete(menu);
    setDeleteMenuDialogOpen(true);
  };

  const handleDeleteMenuCancel = () => {
    setDeleteMenuDialogOpen(false);
    setMenuToDelete(null);
  };

  const handleDeleteMenuConfirm = async () => {
    if (!menuToDelete) {
      return;
    }

    const result = await dispatch(removeRestaurantMenu(menuToDelete.id));

    if (removeRestaurantMenu.fulfilled.match(result)) {
      setDeleteMenuDialogOpen(false);
      setMenuToDelete(null);
    }
  };

  // --------------------------------
  // Menu item handlers
  // --------------------------------

  const handleAddMenuItem = (menuId) => {
    dispatch(clearMenuActionError());

    setSelectedMenuId(menuId);
    setEditingMenuItem(null);
    setMenuItemDialogOpen(true);
  };

  const handleEditMenuItem = (item) => {
    dispatch(clearMenuActionError());

    setSelectedMenuId(item.menuId);
    setEditingMenuItem(item);
    setMenuItemDialogOpen(true);
  };

  const handleMenuItemDialogClose = () => {
    setMenuItemDialogOpen(false);
    setEditingMenuItem(null);
    setSelectedMenuId(null);
  };

  const handleMenuItemSubmit = async (data) => {
    let result;

    if (editingMenuItem) {
      result = await dispatch(
        editMenuItem({
          itemId: editingMenuItem.id,
          data,
        }),
      );
    } else {
      result = await dispatch(
        addMenuItem({
          menuId: selectedMenuId,
          data,
        }),
      );
    }

    if (
      addMenuItem.fulfilled.match(result) ||
      editMenuItem.fulfilled.match(result)
    ) {
      setMenuItemDialogOpen(false);
      setEditingMenuItem(null);
      setSelectedMenuId(null);
    }
  };

  // --------------------------------
  // Delete menu item
  // --------------------------------

  const handleDeleteMenuItem = (item) => {
    dispatch(clearMenuActionError());

    setMenuItemToDelete(item);
    setDeleteMenuItemDialogOpen(true);
  };

  const handleDeleteMenuItemCancel = () => {
    setDeleteMenuItemDialogOpen(false);
    setMenuItemToDelete(null);
  };

  const handleDeleteMenuItemConfirm = async () => {
    if (!menuItemToDelete) {
      return;
    }

    const result = await dispatch(removeMenuItem(menuItemToDelete.id));

    if (removeMenuItem.fulfilled.match(result)) {
      setDeleteMenuItemDialogOpen(false);
      setMenuItemToDelete(null);
    }
  };

  // --------------------------------
  // Helpers
  // --------------------------------

  const getMenuItems = (menuId) => {
    const group = menuItems.find((group) => group.menuId === menuId);

    return group?.items || [];
  };

  if (!activeRestaurantId) {
    return (
      <Box>
        <Typography>No restaurant selected.</Typography>
      </Box>
    );
  }

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
          <Typography variant='h5' sx={{ fontWeight: 700 }}>
            Menu
          </Typography>
        </Box>

        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={handleAddMenu}
          disabled={actionLoadingType === "CREATE_MENU"}
        >
          {actionLoadingType === "CREATE_MENU" ? "Creating..." : "Add Menu"}
        </Button>
      </Stack>

      {error && (
        <Alert severity='error' sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Stack alignItems='center' justifyContent='center' sx={{ py: 8 }}>
          <CircularProgress />
        </Stack>
      ) : menus.length === 0 ? (
        <Box
          sx={{
            py: 8,
            textAlign: "center",
            border: 1,
            borderColor: "divider",
            borderRadius: 2,
          }}
        >
          <Typography variant='h6'>No menus yet</Typography>

          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ mt: 1, mb: 2 }}
          >
            Create your first menu to start adding items.
          </Typography>

          <Button
            variant='contained'
            startIcon={<AddIcon />}
            onClick={handleAddMenu}
          >
            Add Menu
          </Button>
        </Box>
      ) : (
        <Stack spacing={2}>
          {menus.map((menu) => (
            <RestaurantMenuCard
              key={menu.id}
              menu={menu}
              items={getMenuItems(menu.id)}
              actionLoadingType={actionLoadingType}
              actionLoadingId={actionLoadingId}
              onEdit={handleEditMenu}
              onDelete={handleDeleteMenu}
              onAddMenuItem={handleAddMenuItem}
              onEditMenuItem={handleEditMenuItem}
              onDeleteMenuItem={handleDeleteMenuItem}
            />
          ))}
        </Stack>
      )}

      <MenuFormDialog
        open={menuDialogOpen}
        menu={editingMenu}
        loading={
          actionLoadingType === "CREATE_MENU" ||
          actionLoadingType === "UPDATE_MENU"
        }
        error={actionError}
        onClose={handleMenuDialogClose}
        onSubmit={handleMenuSubmit}
      />

      <MenuItemFormDialog
        open={menuItemDialogOpen}
        menuItem={editingMenuItem}
        loading={
          actionLoadingType === "CREATE_MENU_ITEM" ||
          actionLoadingType === "UPDATE_MENU_ITEM"
        }
        error={actionError}
        onClose={handleMenuItemDialogClose}
        onSubmit={handleMenuItemSubmit}
      />

      <Dialog open={deleteMenuDialogOpen} onClose={handleDeleteMenuCancel}>
        <DialogTitle>Delete Menu</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete{" "}
            <strong>{menuToDelete?.name}</strong>? This action cannot be undone.
          </DialogContentText>

          {actionError && (
            <Alert severity='error' sx={{ mt: 2 }}>
              {actionError}
            </Alert>
          )}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleDeleteMenuCancel}
            disabled={actionLoadingType === "DELETE_MENU"}
          >
            Cancel
          </Button>

          <Button
            onClick={handleDeleteMenuConfirm}
            color='error'
            variant='contained'
            disabled={actionLoadingType === "DELETE_MENU"}
          >
            {actionLoadingType === "DELETE_MENU" ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteMenuItemDialogOpen}
        onClose={handleDeleteMenuItemCancel}
      >
        <DialogTitle>Delete Menu Item</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete{" "}
            <strong>{menuItemToDelete?.name}</strong>? This action cannot be
            undone.
          </DialogContentText>

          {actionError && (
            <Alert severity='error' sx={{ mt: 2 }}>
              {actionError}
            </Alert>
          )}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleDeleteMenuItemCancel}
            disabled={actionLoadingType === "DELETE_MENU_ITEM"}
          >
            Cancel
          </Button>

          <Button
            onClick={handleDeleteMenuItemConfirm}
            color='error'
            variant='contained'
            disabled={actionLoadingType === "DELETE_MENU_ITEM"}
          >
            {actionLoadingType === "DELETE_MENU_ITEM"
              ? "Deleting..."
              : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default RestaurantMenuPage;
