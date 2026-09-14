import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getRestaurantMenus,
  createRestaurantMenu,
  updateRestaurantMenu,
  deleteRestaurantMenu,
  getRestaurantMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../../services/api/restaurantOwnerMenuApi";

const initialState = {
  menus: [],
  menuItems: [],

  loading: false,
  actionLoadingType: null,
  actionLoadingId: null,

  error: null,
  actionError: null,
};

export const fetchRestaurantMenus = createAsyncThunk(
  "restaurantOwnerMenu/fetchRestaurantMenus",
  async (restaurantId, { rejectWithValue }) => {
    try {
      return await getRestaurantMenus(restaurantId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch restaurant menus",
      );
    }
  },
);

export const fetchRestaurantMenuItems = createAsyncThunk(
  "restaurantOwnerMenu/fetchRestaurantMenuItems",
  async (restaurantId, { rejectWithValue }) => {
    try {
      return await getRestaurantMenuItems(restaurantId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch menu items",
      );
    }
  },
);

export const addRestaurantMenu = createAsyncThunk(
  "restaurantOwnerMenu/addRestaurantMenu",
  async ({ restaurantId, data }, { rejectWithValue }) => {
    try {
      return await createRestaurantMenu(restaurantId, data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create menu",
      );
    }
  },
);

export const editRestaurantMenu = createAsyncThunk(
  "restaurantOwnerMenu/editRestaurantMenu",
  async ({ menuId, data }, { rejectWithValue }) => {
    try {
      return await updateRestaurantMenu(menuId, data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update menu",
      );
    }
  },
);

export const removeRestaurantMenu = createAsyncThunk(
  "restaurantOwnerMenu/removeRestaurantMenu",
  async (menuId, { rejectWithValue }) => {
    try {
      await deleteRestaurantMenu(menuId);

      return menuId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete menu",
      );
    }
  },
);

export const addMenuItem = createAsyncThunk(
  "restaurantOwnerMenu/addMenuItem",
  async ({ menuId, data }, { rejectWithValue }) => {
    try {
      return await createMenuItem(menuId, data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create menu item",
      );
    }
  },
);

export const editMenuItem = createAsyncThunk(
  "restaurantOwnerMenu/editMenuItem",
  async ({ itemId, data }, { rejectWithValue }) => {
    try {
      return await updateMenuItem(itemId, data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update menu item",
      );
    }
  },
);

export const removeMenuItem = createAsyncThunk(
  "restaurantOwnerMenu/removeMenuItem",
  async (itemId, { rejectWithValue }) => {
    try {
      await deleteMenuItem(itemId);

      return itemId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete menu item",
      );
    }
  },
);

const restaurantOwnerMenuSlice = createSlice({
  name: "restaurantOwnerMenu",

  initialState,

  reducers: {
    clearRestaurantMenu: (state) => {
      state.menus = [];
      state.menuItems = [];
      state.error = null;
      state.actionError = null;
    },

    clearMenuActionError: (state) => {
      state.actionError = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =========================
      // FETCH MENUS
      // =========================

      .addCase(fetchRestaurantMenus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchRestaurantMenus.fulfilled, (state, action) => {
        state.loading = false;
        state.menus = action.payload;
      })

      .addCase(fetchRestaurantMenus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =========================
      // FETCH MENU ITEMS
      // =========================

      .addCase(fetchRestaurantMenuItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchRestaurantMenuItems.fulfilled, (state, action) => {
        state.loading = false;
        state.menuItems = action.payload;
      })

      .addCase(fetchRestaurantMenuItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =========================
      // CREATE MENU
      // =========================

      .addCase(addRestaurantMenu.pending, (state) => {
        state.actionLoadingType = "CREATE_MENU";
        state.actionLoadingId = null;
        state.actionError = null;
      })

      .addCase(addRestaurantMenu.fulfilled, (state, action) => {
        state.actionLoadingType = null;
        state.actionLoadingId = null;
        state.menus.push(action.payload);
      })

      .addCase(addRestaurantMenu.rejected, (state, action) => {
        state.actionLoadingType = null;
        state.actionLoadingId = null;
        state.actionError = action.payload;
      })

      // =========================
      // UPDATE MENU
      // =========================

      .addCase(editRestaurantMenu.pending, (state, action) => {
        state.actionLoadingType = "UPDATE_MENU";
        state.actionLoadingId = action.meta.arg.menuId;
        state.actionError = null;
      })

      .addCase(editRestaurantMenu.fulfilled, (state, action) => {
        state.actionLoadingType = null;
        state.actionLoadingId = null;

        const index = state.menus.findIndex(
          (menu) => menu.id === action.payload.id,
        );

        if (index !== -1) {
          state.menus[index] = action.payload;
        }
      })

      .addCase(editRestaurantMenu.rejected, (state, action) => {
        state.actionLoadingType = null;
        state.actionLoadingId = null;
        state.actionError = action.payload;
      })

      // =========================
      // DELETE MENU
      // =========================

      .addCase(removeRestaurantMenu.pending, (state, action) => {
        state.actionLoadingType = "DELETE_MENU";
        state.actionLoadingId = action.meta.arg;
        state.actionError = null;
      })

      .addCase(removeRestaurantMenu.fulfilled, (state, action) => {
        state.actionLoadingType = null;
        state.actionLoadingId = null;

        state.menus = state.menus.filter((menu) => menu.id !== action.payload);

        state.menuItems = state.menuItems.filter(
          (group) => group.menuId !== action.payload,
        );
      })

      .addCase(removeRestaurantMenu.rejected, (state, action) => {
        state.actionLoadingType = null;
        state.actionLoadingId = null;
        state.actionError = action.payload;
      })

      // =========================
      // CREATE MENU ITEM
      // =========================

      .addCase(addMenuItem.pending, (state) => {
        state.actionLoadingType = "CREATE_MENU_ITEM";
        state.actionLoadingId = null;
        state.actionError = null;
      })

      .addCase(addMenuItem.fulfilled, (state, action) => {
        state.actionLoadingType = null;
        state.actionLoadingId = null;

        const menuGroup = state.menuItems.find(
          (group) => group.menuId === action.payload.menuId,
        );

        if (menuGroup) {
          menuGroup.items.push(action.payload);
        }
      })

      .addCase(addMenuItem.rejected, (state, action) => {
        state.actionLoadingType = null;
        state.actionLoadingId = null;
        state.actionError = action.payload;
      })

      // =========================
      // UPDATE MENU ITEM
      // =========================

      .addCase(editMenuItem.pending, (state, action) => {
        state.actionLoadingType = "UPDATE_MENU_ITEM";
        state.actionLoadingId = action.meta.arg.itemId;
        state.actionError = null;
      })

      .addCase(editMenuItem.fulfilled, (state, action) => {
        state.actionLoadingType = null;
        state.actionLoadingId = null;

        for (const group of state.menuItems) {
          const index = group.items.findIndex(
            (item) => item.id === action.payload.id,
          );

          if (index !== -1) {
            group.items[index] = action.payload;
            break;
          }
        }
      })

      .addCase(editMenuItem.rejected, (state, action) => {
        state.actionLoadingType = null;
        state.actionLoadingId = null;
        state.actionError = action.payload;
      })

      // =========================
      // DELETE MENU ITEM
      // =========================

      .addCase(removeMenuItem.pending, (state, action) => {
        state.actionLoadingType = "DELETE_MENU_ITEM";
        state.actionLoadingId = action.meta.arg;
        state.actionError = null;
      })

      .addCase(removeMenuItem.fulfilled, (state, action) => {
        state.actionLoadingType = null;
        state.actionLoadingId = null;

        for (const group of state.menuItems) {
          group.items = group.items.filter(
            (item) => item.id !== action.payload,
          );
        }
      })

      .addCase(removeMenuItem.rejected, (state, action) => {
        state.actionLoadingType = null;
        state.actionLoadingId = null;
        state.actionError = action.payload;
      });
  },
});

export const { clearRestaurantMenu, clearMenuActionError } =
  restaurantOwnerMenuSlice.actions;

export default restaurantOwnerMenuSlice.reducer;
