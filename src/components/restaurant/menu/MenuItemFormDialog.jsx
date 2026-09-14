import { useEffect, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Stack,
  Switch,
  TextField,
} from "@mui/material";

const EMPTY_FORM = {
  name: "",
  description: "",
  price: "",
  discountedPrice: "",
  foodType: "VEG",
  isAvailable: true,
  isFeatured: false,
  imageUrl: "",
  preparationTimeMinutes: "",
};

function MenuItemFormDialog({ open, menuItem, loading, onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    if (!open) {
      return;
    }

    if (menuItem) {
      setForm({
        name: menuItem.name ?? "",
        description: menuItem.description ?? "",
        price: menuItem.price ?? "",
        discountedPrice: menuItem.discountedPrice ?? "",
        foodType: menuItem.foodType ?? "VEG",
        isAvailable: menuItem.isAvailable ?? true,
        isFeatured: menuItem.isFeatured ?? false,
        imageUrl: menuItem.imageUrl ?? "",
        preparationTimeMinutes: menuItem.preparationTimeMinutes ?? "",
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [open, menuItem]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSwitchChange = (event) => {
    const { name, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: checked,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      name: form.name.trim(),
      description: form.description.trim(),

      price: Number(form.price),

      discountedPrice:
        form.discountedPrice === "" ? null : Number(form.discountedPrice),

      foodType: form.foodType,

      isAvailable: form.isAvailable,
      isFeatured: form.isFeatured,

      imageUrl: form.imageUrl.trim() || null,

      preparationTimeMinutes:
        form.preparationTimeMinutes === ""
          ? null
          : Number(form.preparationTimeMinutes),
    });
  };

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      fullWidth
      maxWidth='sm'
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {menuItem ? "Edit Menu Item" : "Add Menu Item"}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2.5} sx={{ pt: 1 }}>
            <TextField
              label='Name'
              name='name'
              value={form.name}
              onChange={handleChange}
              required
              fullWidth
              autoFocus
            />

            <TextField
              label='Description'
              name='description'
              value={form.description}
              onChange={handleChange}
              fullWidth
              multiline
              minRows={3}
            />

            <TextField
              label='Image URL'
              name='imageUrl'
              value={form.imageUrl}
              onChange={handleChange}
              fullWidth
              placeholder='https://example.com/image.jpg'
            />

            <TextField
              select
              label='Food Type'
              name='foodType'
              value={form.foodType}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value='VEG'>VEG</MenuItem>
              <MenuItem value='NON_VEG'>NON-VEG</MenuItem>
              <MenuItem value='EGG'>EGG</MenuItem>
            </TextField>

            <TextField
              label='Price'
              name='price'
              type='number'
              value={form.price}
              onChange={handleChange}
              required
              fullWidth
              inputProps={{
                min: 0,
                step: "0.01",
              }}
            />

            <TextField
              label='Discounted Price'
              name='discountedPrice'
              type='number'
              value={form.discountedPrice}
              onChange={handleChange}
              fullWidth
              inputProps={{
                min: 0,
                step: "0.01",
              }}
            />

            <TextField
              label='Preparation Time'
              name='preparationTimeMinutes'
              type='number'
              value={form.preparationTimeMinutes}
              onChange={handleChange}
              fullWidth
              inputProps={{
                min: 0,
              }}
              helperText='Time in minutes'
            />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
              <FormControlLabel
                control={
                  <Switch
                    name='isAvailable'
                    checked={form.isAvailable}
                    onChange={handleSwitchChange}
                  />
                }
                label='Available'
              />

              <FormControlLabel
                control={
                  <Switch
                    name='isFeatured'
                    checked={form.isFeatured}
                    onChange={handleSwitchChange}
                  />
                }
                label='Featured'
              />
            </Stack>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>

          <Button
            type='submit'
            variant='contained'
            disabled={loading || !form.name.trim() || !form.price}
          >
            {loading ? "Saving..." : menuItem ? "Save Changes" : "Add Item"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default MenuItemFormDialog;
