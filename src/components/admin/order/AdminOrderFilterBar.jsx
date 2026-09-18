import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";

const ORDER_STATUSES = [
  "PLACED",
  "ACCEPTED",
  "PREPARING",
  "READY_FOR_PICKUP",
  "PICKED_UP",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "CANCELLED",
  "REJECTED",
];

const PAYMENT_METHODS = ["COD"];

const PAYMENT_STATUSES = ["PENDING", "PAID"];

function formatStatus(status) {
  if (!status) return "";

  return status
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function AdminOrderFilterBar({
  filters,
  restaurants,
  onFilterChange,
  onReset,
}) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        border: 1,
        borderColor: "divider",
        boxShadow: "none",
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
        <Stack spacing={2.5}>
          {/* Header */}
          <Stack
            direction='row'
            spacing={2}
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Stack direction='row' sx={{ alignItems: "center" }} spacing={1}>
              <FilterAltOutlinedIcon fontSize='small' color='action' />

              <Box>
                <Typography variant='subtitle1' fontWeight={700}>
                  Filters
                </Typography>

                <Typography variant='body2' color='textSecondary'>
                  Narrow down orders using the available filters
                </Typography>
              </Box>
            </Stack>

            <Button
              size='small'
              variant='text'
              color='inherit'
              startIcon={<RestartAltOutlinedIcon />}
              onClick={onReset}
            >
              Reset
            </Button>
          </Stack>

          {/* Filters */}
          <Grid container spacing={2}>
            {/* Status */}
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <FormControl fullWidth size='small'>
                <InputLabel>Status</InputLabel>

                <Select
                  label='Status'
                  value={filters.status}
                  onChange={(event) =>
                    onFilterChange("status", event.target.value)
                  }
                >
                  <MenuItem value=''>All Statuses</MenuItem>

                  {ORDER_STATUSES.map((status) => (
                    <MenuItem key={status} value={status}>
                      {formatStatus(status)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Payment Method */}
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <FormControl fullWidth size='small'>
                <InputLabel>Payment Method</InputLabel>

                <Select
                  label='Payment Method'
                  value={filters.paymentMethod}
                  onChange={(event) =>
                    onFilterChange("paymentMethod", event.target.value)
                  }
                >
                  <MenuItem value=''>All Methods</MenuItem>

                  {PAYMENT_METHODS.map((method) => (
                    <MenuItem key={method} value={method}>
                      {method}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Payment Status */}
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <FormControl fullWidth size='small'>
                <InputLabel>Payment Status</InputLabel>

                <Select
                  label='Payment Status'
                  value={filters.paymentStatus}
                  onChange={(event) =>
                    onFilterChange("paymentStatus", event.target.value)
                  }
                >
                  <MenuItem value=''>All Payment Statuses</MenuItem>

                  {PAYMENT_STATUSES.map((status) => (
                    <MenuItem key={status} value={status}>
                      {formatStatus(status)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Restaurant */}
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <FormControl fullWidth size='small'>
                <InputLabel>Restaurant</InputLabel>

                <Select
                  label='Restaurant'
                  value={filters.restaurantId}
                  onChange={(event) =>
                    onFilterChange("restaurantId", event.target.value)
                  }
                >
                  <MenuItem value=''>All Restaurants</MenuItem>

                  {restaurants.map((restaurant) => (
                    <MenuItem key={restaurant.id} value={restaurant.id}>
                      {restaurant.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Min Amount */}
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <TextField
                fullWidth
                size='small'
                type='number'
                label='Min Amount'
                placeholder='0'
                value={filters.minAmount}
                onChange={(event) =>
                  onFilterChange("minAmount", event.target.value)
                }
                slotProps={{
                  htmlInput: {
                    min: 0,
                  },
                }}
              />
            </Grid>

            {/* Max Amount */}
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <TextField
                fullWidth
                size='small'
                type='number'
                label='Max Amount'
                placeholder='2000'
                value={filters.maxAmount}
                onChange={(event) =>
                  onFilterChange("maxAmount", event.target.value)
                }
                slotProps={{
                  htmlInput: {
                    min: 0,
                  },
                }}
              />
            </Grid>

            {/* From Date */}
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <TextField
                fullWidth
                size='small'
                type='date'
                label='From Date'
                value={filters.fromDate}
                onChange={(event) =>
                  onFilterChange("fromDate", event.target.value)
                }
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Grid>

            {/* To Date */}
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <TextField
                fullWidth
                size='small'
                type='date'
                label='To Date'
                value={filters.toDate}
                onChange={(event) =>
                  onFilterChange("toDate", event.target.value)
                }
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Grid>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default AdminOrderFilterBar;
