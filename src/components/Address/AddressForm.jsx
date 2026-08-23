import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Alert, Box, Button, Stack, TextField } from "@mui/material";

import { addAddress, editAddress } from "../../features/address/addressSlice";

const emptyForm = {
  label: "",
  landmark: "",
  address: "",
  city: "",
  state: "",
  pinCode: "",
  latitude: "",
  longitude: "",
};

function AddressForm({
  mode = "create",
  initialData = null,
  onSuccess,
  onCancel,
}) {
  const dispatch = useDispatch();

  const { creating, updating, error } = useSelector((state) => state.address);

  const [formData, setFormData] = useState(emptyForm);

  const isEditMode = mode === "edit";
  const isSubmitting = isEditMode ? updating : creating;

  useEffect(() => {
    if (isEditMode && initialData) {
      setFormData({
        label: initialData.label || "",
        landmark: initialData.landmark || "",
        address: initialData.address || "",
        city: initialData.city || "",
        state: initialData.state || "",
        pinCode: initialData.pinCode || "",
        latitude: initialData.latitude || "",
        longitude: initialData.longitude || "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [isEditMode, initialData]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const addressData = {
      label: formData.label,
      landmark: formData.landmark,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pinCode: formData.pinCode,

      latitude: formData.latitude ? Number(formData.latitude) : undefined,

      longitude: formData.longitude ? Number(formData.longitude) : undefined,
    };

    let result;

    if (isEditMode) {
      result = await dispatch(
        editAddress({
          addressId: initialData.id,
          addressData,
        }),
      );
    } else {
      result = await dispatch(addAddress(addressData));
    }

    if (
      isEditMode
        ? editAddress.fulfilled.match(result)
        : addAddress.fulfilled.match(result)
    ) {
      onSuccess?.();
    }
  }

  //     const result = await dispatch(addAddress(addressData));
  //
  //     if (addAddress.fulfilled.match(result)) {
  //       setFormData(initialFormData);
  //
  //       onSuccess?.();
  //     }
  //   }
  //
  return (
    <Box component='form' onSubmit={handleSubmit}>
      <Stack spacing={2}>
        {error && (
          <Alert severity='error' sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          label='Address Label'
          name='label'
          value={formData.label}
          onChange={handleChange}
          placeholder='HOME, WORK, etc.'
          required
          fullWidth
        />

        <TextField
          label='Address'
          name='address'
          value={formData.address}
          onChange={handleChange}
          placeholder='House no., street, area'
          required
          fullWidth
          multiline
          minRows={2}
        />

        <TextField
          label='Landmark'
          name='landmark'
          value={formData.landmark}
          onChange={handleChange}
          placeholder='Near...'
          fullWidth
        />

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={2}
        >
          <TextField
            label='City'
            name='city'
            value={formData.city}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            label='State'
            name='state'
            value={formData.state}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            label='PIN Code'
            name='pinCode'
            value={formData.pinCode}
            onChange={handleChange}
            required
            fullWidth
          />
        </Stack>

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={2}
        >
          <TextField
            label='Latitude'
            name='latitude'
            type='number'
            value={formData.latitude}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label='Longitude'
            name='longitude'
            type='number'
            value={formData.longitude}
            onChange={handleChange}
            fullWidth
          />
        </Stack>

        <Stack
          direction='row'
          spacing={2}
          justifyContent='flex-end'
          sx={{ pt: 1 }}
        >
          <Button
            type='button'
            variant='outlined'
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>

          <Button type='submit' variant='contained' disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : isEditMode
                ? "Update Address"
                : "Save Address"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default AddressForm;
