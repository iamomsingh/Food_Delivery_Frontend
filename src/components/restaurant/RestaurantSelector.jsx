import { useDispatch, useSelector } from "react-redux";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { setActiveRestaurant } from "../../features/restaurant/restaurantOwnerSlice";

function RestaurantSelector() {
  const dispatch = useDispatch();

  const { restaurants, activeRestaurantId } = useSelector(
    (state) => state.restaurantOwner,
  );

  const handleChange = (event) => {
    dispatch(setActiveRestaurant(event.target.value));
  };

  if (restaurants.length <= 1) {
    return null;
  }

  return (
    <FormControl
      size='small'
      sx={{
        minWidth: 180,
      }}
    >
      <InputLabel id='restaurant-selector-label'>Restaurant</InputLabel>

      <Select
        labelId='restaurant-selector-label'
        value={activeRestaurantId || ""}
        label='Restaurant'
        onChange={handleChange}
      >
        {restaurants.map((restaurant) => (
          <MenuItem key={restaurant.id} value={restaurant.id}>
            {restaurant.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default RestaurantSelector;
