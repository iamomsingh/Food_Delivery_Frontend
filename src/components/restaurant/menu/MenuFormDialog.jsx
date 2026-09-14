import { useEffect, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";

const EMPTY_FORM = {
  name: "",
  description: "",
  displayOrder: 0,
};

function MenuFormDialog({ open, menu, loading, onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    if (!open) {
      return;
    }

    if (menu) {
      setForm({
        name: menu.name ?? "",
        description: menu.description ?? "",
        displayOrder: menu.displayOrder ?? 0,
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [open, menu]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      name: form.name.trim(),
      description: form.description.trim(),
      displayOrder: Number(form.displayOrder),
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
        <DialogTitle>{menu ? "Edit Menu" : "Add Menu"}</DialogTitle>

        <DialogContent>
          <Stack spacing={2.5} sx={{ pt: 1 }}>
            <TextField
              label='Menu Name'
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
              label='Display Order'
              name='displayOrder'
              type='number'
              value={form.displayOrder}
              onChange={handleChange}
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>

          <Button
            type='submit'
            variant='contained'
            disabled={loading || !form.name.trim()}
          >
            {loading ? "Saving..." : menu ? "Save Changes" : "Add Menu"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default MenuFormDialog;
