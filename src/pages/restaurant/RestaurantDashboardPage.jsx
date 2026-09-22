import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import RestaurantIcon from "@mui/icons-material/Restaurant";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import {
  fetchOwnerRestaurants,
  setActiveRestaurant,
} from "../../features/restaurant/restaurantOwnerSlice";

function RestaurantDashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { restaurants, activeRestaurantId, loading, error } = useSelector(
    (state) => state.restaurantOwner,
  );

  useEffect(() => {
    if (!restaurants.length) {
      dispatch(fetchOwnerRestaurants());
    }
  }, [dispatch, restaurants.length]);

  const approvedRestaurants = restaurants.filter(
    (restaurant) => restaurant.status === "APPROVED",
  );

  const pendingRestaurants = restaurants.filter(
    (restaurant) => restaurant.status === "PENDING",
  );

  const handleSelectRestaurant = (restaurantId) => {
    dispatch(setActiveRestaurant(restaurantId));
  };

  const handleManageRestaurant = (restaurantId) => {
    dispatch(setActiveRestaurant(restaurantId));
    navigate("/restaurant/management");
  };

  const handleViewOrders = (restaurantId) => {
    dispatch(setActiveRestaurant(restaurantId));
    navigate("/restaurant/orders");
  };

  const handleViewMenu = (restaurantId) => {
    dispatch(setActiveRestaurant(restaurantId));
    navigate("/restaurant/menu");
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: 400,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Alert severity='error'>{error}</Alert>
      </Box>
    );
  }

  /*
   * First-time Restaurant Owner
   */
  if (restaurants.length === 0) {
    return (
      <Box>
        <Card
          sx={{
            maxWidth: 850,
            mx: "auto",
            mt: { xs: 2, md: 6 },
          }}
        >
          <CardContent
            sx={{
              p: { xs: 3, md: 6 },
              textAlign: "center",
            }}
          >
            <AddBusinessIcon
              sx={{
                fontSize: 64,
                mb: 2,
              }}
            />

            <Typography variant='h4' fontWeight={700} gutterBottom>
              Start Your Restaurant Journey
            </Typography>

            <Typography
              variant='body1'
              color='textSecondary'
              sx={{
                maxWidth: 600,
                mx: "auto",
                mb: 4,
              }}
            >
              You are approved as a restaurant owner. Create your first
              restaurant to start managing your menu, orders, and restaurant
              information.
            </Typography>

            <Button
              variant='contained'
              size='large'
              startIcon={<AddBusinessIcon />}
              onClick={() => navigate("/restaurant/management?create=true")}
            >
              Create Your Restaurant
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          mb: 4,
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
        }}
      >
        <Box>
          <Typography variant='h4' fontWeight={700}>
            Restaurant Dashboard
          </Typography>

          <Typography variant='body2' color='textSecondary' sx={{ mt: 0.5 }}>
            Manage your restaurants and monitor your business.
          </Typography>
        </Box>

        <Button
          variant='contained'
          startIcon={<AddBusinessIcon />}
          onClick={() => navigate("/restaurant/management?create=true")}
        >
          Add Restaurant
        </Button>
      </Stack>

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <SummaryCard
            icon={<RestaurantIcon />}
            title='Total Restaurants'
            value={restaurants.length}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <SummaryCard
            icon={<CheckCircleIcon />}
            title='Approved Restaurants'
            value={approvedRestaurants.length}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <SummaryCard
            icon={<PendingIcon />}
            title='Pending Approval'
            value={pendingRestaurants.length}
          />
        </Grid>
      </Grid>

      {/* Restaurants */}
      <Box>
        <Typography variant='h5' fontWeight={600} sx={{ mb: 2 }}>
          Your Restaurants
        </Typography>

        <Grid container spacing={2}>
          {restaurants.map((restaurant) => {
            const isActive = restaurant.id === activeRestaurantId;

            return (
              <Grid key={restaurant.id} size={{ xs: 12, md: 6, lg: 4 }}>
                <Card
                  sx={{
                    height: "100%",
                    border: isActive ? 2 : 1,
                    borderColor: isActive ? "primary.main" : "divider",
                  }}
                >
                  <CardContent>
                    <Stack spacing={2}>
                      <Stack
                        direction='row'
                        sx={{
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                        }}
                      >
                        <Box>
                          <Typography variant='h6' fontWeight={600}>
                            {restaurant.name}
                          </Typography>

                          {restaurant.description && (
                            <Typography
                              variant='body2'
                              color='textSecondary'
                              sx={{ mt: 0.5 }}
                            >
                              {restaurant.description}
                            </Typography>
                          )}
                        </Box>

                        <Chip
                          label={restaurant.status}
                          size='small'
                          color={
                            restaurant.status === "APPROVED"
                              ? "success"
                              : restaurant.status === "PENDING"
                                ? "warning"
                                : "default"
                          }
                        />
                      </Stack>

                      <Stack direction='row' spacing={2}>
                        <Typography variant='body2'>
                          ⭐ {restaurant.averageRating ?? 0}
                        </Typography>

                        <Typography variant='body2' color='textSecondary'>
                          {restaurant.totalReviews ?? 0} reviews
                        </Typography>
                      </Stack>

                      <Stack
                        direction='row'
                        spacing={1}
                        flexWrap='wrap'
                        useFlexGap
                      >
                        <Button
                          size='small'
                          variant={isActive ? "contained" : "outlined"}
                          onClick={() => handleSelectRestaurant(restaurant.id)}
                        >
                          {isActive ? "Selected" : "Select"}
                        </Button>

                        <Button
                          size='small'
                          variant='outlined'
                          onClick={() => handleManageRestaurant(restaurant.id)}
                        >
                          Manage
                        </Button>

                        <Button
                          size='small'
                          variant='outlined'
                          onClick={() => handleViewOrders(restaurant.id)}
                        >
                          Orders
                        </Button>

                        <Button
                          size='small'
                          variant='outlined'
                          onClick={() => handleViewMenu(restaurant.id)}
                        >
                          Menu
                        </Button>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}

function SummaryCard({ icon, title, value }) {
  return (
    <Card>
      <CardContent>
        <Stack direction='row' spacing={4} sx={{ alignItems: "center" }}>
          <Box>{icon}</Box>

          <Box>
            <Typography variant='body2' color='textSecondary'>
              {title}
            </Typography>

            <Typography variant='h4' fontWeight={700}>
              {value}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default RestaurantDashboardPage;
