import { useState } from "react";

import {
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";

import MenuItemCard from "./MenuItemCard";

function RestaurantMenuCard({
  menu,
  items,
  actionLoadingType,
  actionLoadingId,
  onEdit,
  onDelete,
  onAddMenuItem,
  onEditMenuItem,
  onDeleteMenuItem,
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const menuActionsOpen = Boolean(anchorEl);

  const handleMenuActionsOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuActionsClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleMenuActionsClose();
    onEdit(menu);
  };

  const handleDelete = () => {
    handleMenuActionsClose();
    onDelete(menu);
  };

  const handleAddMenuItem = () => {
    onAddMenuItem(menu.id);
  };

  const isUpdatingMenu =
    actionLoadingType === "UPDATE_MENU" && actionLoadingId === menu.id;

  const isDeletingMenu =
    actionLoadingType === "DELETE_MENU" && actionLoadingId === menu.id;

  return (
    <Box
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Stack
        direction='row'
        spacing={2}
        sx={{ p: 2, alignItems: "flex-start", justifyContent: "space-between" }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography variant='h6' fontWeight={700}>
            {menu.name}
          </Typography>

          {menu.description && (
            <Typography variant='body2' color='textSecondary' sx={{ mt: 0.5 }}>
              {menu.description}
            </Typography>
          )}
        </Box>

        <IconButton
          onClick={handleMenuActionsOpen}
          disabled={isUpdatingMenu || isDeletingMenu}
          aria-label='Menu actions'
        >
          <MoreVertIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={menuActionsOpen}
          onClose={handleMenuActionsClose}
        >
          <MenuItem onClick={handleEdit}>Edit</MenuItem>

          <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
            Delete
          </MenuItem>
        </Menu>
      </Stack>

      <Divider />

      {/* Menu items */}

      <Box sx={{ p: 2 }}>
        {items.length === 0 ? (
          <Box sx={{ py: 3, textAlign: "center" }}>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
              No items in this menu yet.
            </Typography>

            <Button
              variant='outlined'
              startIcon={<AddIcon />}
              onClick={handleAddMenuItem}
              disabled={isDeletingMenu}
            >
              Add Menu Item
            </Button>
          </Box>
        ) : (
          <Stack spacing={2}>
            {items.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                actionLoadingType={actionLoadingType}
                actionLoadingId={actionLoadingId}
                onEdit={onEditMenuItem}
                onDelete={onDeleteMenuItem}
              />
            ))}

            <Box>
              <Button
                variant='outlined'
                startIcon={<AddIcon />}
                onClick={handleAddMenuItem}
                disabled={isDeletingMenu}
              >
                Add Menu Item
              </Button>
            </Box>
          </Stack>
        )}
      </Box>
    </Box>
  );
}

export default RestaurantMenuCard;
