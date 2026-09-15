import { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";

const initialForm = {
  name: "",
  description: "",
  phone: "",
  email: "",
  logoUrl: "",
  coverImageUrl: "",
  isPureVeg: false,
};

function RestaurantFormDialog({
  open,
  mode = "edit",
  restaurant = null,
  loading = false,
  onClose,
  onSubmit,
}) {
  const [form, setForm] = useState(initialForm);

  const isEditMode = mode === "edit";

  useEffect(() => {
    if (!open) {
      return;
    }

    if (isEditMode && restaurant) {
      setForm({
        name: restaurant.name || "",
        description: restaurant.description || "",
        phone: restaurant.phone || "",
        email: restaurant.email || "",
        logoUrl: restaurant.logoUrl || "",
        coverImageUrl: restaurant.coverImageUrl || "",
        isPureVeg: restaurant.isPureVeg ?? false,
      });

      return;
    }

    setForm(initialForm);
  }, [open, isEditMode, restaurant]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      name: form.name.trim(),
      description: form.description.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      logoUrl: form.logoUrl.trim(),
      coverImageUrl: form.coverImageUrl.trim(),
      isPureVeg: form.isPureVeg,
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
          {isEditMode ? "Edit Restaurant" : "Create Restaurant"}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2.5} sx={{ pt: 1 }}>
            <TextField
              name='name'
              label='Restaurant Name'
              value={form.name}
              onChange={handleChange}
              required
              fullWidth
              autoFocus
            />

            <TextField
              name='description'
              label='Description'
              value={form.description}
              onChange={handleChange}
              multiline
              minRows={3}
              fullWidth
            />

            <TextField
              name='phone'
              label='Phone'
              value={form.phone}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              name='email'
              label='Email'
              type='email'
              value={form.email}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              name='logoUrl'
              label='Logo URL'
              value={form.logoUrl}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              name='coverImageUrl'
              label='Cover Image URL'
              value={form.coverImageUrl}
              onChange={handleChange}
              fullWidth
            />

            <FormControlLabel
              control={
                <Checkbox
                  name='isPureVeg'
                  checked={form.isPureVeg}
                  onChange={handleChange}
                />
              }
              label='Pure Vegetarian Restaurant'
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>

          <Button type='submit' variant='contained' loading={loading}>
            {isEditMode ? "Save Changes" : "Create Restaurant"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default RestaurantFormDialog;
