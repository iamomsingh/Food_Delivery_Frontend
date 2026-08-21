import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getAddresses,
  getAddressById,
  createAddress,
  updateAddress,
  makeDefaultAddress,
  deleteAddress,
} from "../../services/api/addressApi";

const initialState = {
  addresses: [],

  loading: false,
  error: null,

  creating: false,
  updating: false,
  deleting: false,
};

export const fetchAddresses = createAsyncThunk(
  "address/fetchAddress",
  async () => {
    return await getAddresses();
  },
);

export const fetchAddressById = createAsyncThunk(
  "address/fetchAddressById",
  async (addressId) => {
    return await getAddressById(addressId);
  },
);

export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (addressData) => {
    return await createAddress(addressData);
  },
);

export const editAddress = createAsyncThunk(
  "address/editAddress",
  async ({ addressId, addressData }) => {
    return await updateAddress(addressId, addressData);
  },
);

export const setDefaultAddress = createAsyncThunk(
  "address/setDefaultAddress",
  async (addressId) => {
    return await makeDefaultAddress(addressId);
  },
);

export const removeAddress = createAsyncThunk(
  "address/removeAddress",
  async (addressId) => {
    await deleteAddress(addressId);

    return addressId;
  },
);

const addressSlice = createSlice({
  name: "address",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
      })

      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create address
      .addCase(addAddress.pending, (state) => {
        state.creating = true;
        state.error = null;
      })

      .addCase(addAddress.fulfilled, (state, action) => {
        state.creating = false;
        state.addresses.push(action.payload);
      })

      .addCase(addAddress.rejected, (state, action) => {
        state.creating = false;
        state.error = action.error.message;
      })

      // Update address
      .addCase(editAddress.pending, (state) => {
        state.updating = true;
        state.error = null;
      })

      .addCase(editAddress.fulfilled, (state, action) => {
        state.updating = false;

        const index = state.addresses.findIndex(
          (address) => address.id === action.payload.id,
        );

        if (index !== -1) {
          state.addresses[index] = action.payload;
        }
      })

      .addCase(editAddress.rejected, (state, action) => {
        state.updating = false;
        state.error = action.error.message;
      })

      // Make default address
      .addCase(setDefaultAddress.pending, (state) => {
        state.updating = true;
        state.error = null;
      })

      .addCase(setDefaultAddress.fulfilled, (state, action) => {
        state.updating = false;

        state.addresses = state.addresses.map((address) => ({
          ...address,
          isDefault: address.id === action.payload.id,
        }));
      })

      .addCase(setDefaultAddress.rejected, (state, action) => {
        state.updating = false;
        state.error = action.error.message;
      })

      .addCase(removeAddress.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })

      .addCase(removeAddress.fulfilled, (state, action) => {
        state.deleting = false;

        state.addresses = state.addresses.filter(
          (address) => address.id !== action.payload,
        );
      })

      .addCase(removeAddress.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.error.message;
      });
  },
});

export const {} = addressSlice.actions;

export default addressSlice.reducer;
