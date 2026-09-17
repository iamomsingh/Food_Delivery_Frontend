import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RestaurantIcon from "@mui/icons-material/Restaurant";

import {
  fetchAdminRestaurantDetails,
  clearSelectedRestaurant,
} from "../../../features/admin/adminRestaurantSlice";

import Loader from "../../../components/common/Loader";
import ErrorState from "../../../components/common/ErrorState";

function getStatusColor(status) {
  switch (status) {
    case "APPROVED":
      return "success";

    case "PENDING":
      return "warning";

    case "REJECTED":
      return "error";

    default:
      return "default";
  }
}

function AdminRestaurantDetailsPage() {
  const { restaurantId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedRestaurant, detailLoading, detailError } = useSelector(
    (state) => state.adminRestaurant,
  );

  useEffect(() => {
    dispatch(fetchAdminRestaurantDetails(restaurantId));

    return () => {
      dispatch(clearSelectedRestaurant());
    };
  }, [dispatch, restaurantId]);

  if (detailLoading) {
    return <Loader />;
  }

  if (detailError) {
    return <ErrorState message={detailError} />;
  }

  if (!selectedRestaurant) {
    return null;
  }

  const restaurant = selectedRestaurant;

  return (
    <Box>
      <Stack direction='row' alignItems='center' spacing={2} sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/admin/restaurants")}
        >
          Restaurants
        </Button>
      </Stack>

      <Typography variant='h4' fontWeight={700} sx={{ mb: 3 }}>
        Restaurant Details
      </Typography>

      <Paper
        elevation={0}
        variant='outlined'
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 3,
          mb: 3,
        }}
      >
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={3}
          sx={{
            alignItems: {
              xs: "flex-start",
              sm: "center",
            },
          }}
        >
          <Box
            sx={{
              width: 100,
              height: 100,
              borderRadius: 3,
              border: 1,
              borderColor: "divider",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            {restaurant.logoUrl ? (
              <Box
                component='img'
                src={restaurant.logoUrl}
                alt={restaurant.name}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <RestaurantIcon fontSize='large' />
            )}
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            <Typography variant='h5' fontWeight={700}>
              {restaurant.name}
            </Typography>

            <Typography color='textSecondary' sx={{ mt: 0.5 }}>
              @{restaurant.slug}
            </Typography>

            <Chip
              label={restaurant.status}
              size='small'
              sx={{ mt: 1 }}
              color={getStatusColor(restaurant.status)}
            />
          </Box>
        </Stack>
      </Paper>

      <Paper
        elevation={0}
        variant='outlined'
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 3,
          mb: 3,
        }}
      >
        <Typography variant='h6' fontWeight={700} gutterBottom>
          Restaurant Information
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <InfoRow label='Name' value={restaurant.name} />

        <InfoRow label='Description' value={restaurant.description || "—"} />

        <InfoRow label='Phone' value={restaurant.phone || "—"} />

        <InfoRow label='Email' value={restaurant.email || "—"} />

        <InfoRow label='Pure Veg' value={restaurant.isPureVeg ? "Yes" : "No"} />
      </Paper>

      <Paper
        elevation={0}
        variant='outlined'
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 3,
          mb: 3,
        }}
      >
        <Typography variant='h6' fontWeight={700} gutterBottom>
          Owner Information
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <InfoRow
          label='Name'
          value={
            restaurant.owner
              ? `${restaurant.owner.firstName || ""} ${
                  restaurant.owner.lastName || ""
                }`.trim()
              : "—"
          }
        />

        <InfoRow label='Owner ID' value={restaurant.ownerId || "—"} />
      </Paper>

      <Paper
        elevation={0}
        variant='outlined'
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 3,
          mb: 3,
        }}
      >
        <Typography variant='h6' fontWeight={700} gutterBottom>
          Statistics
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={4}
        >
          <StatItem
            label='Average Rating'
            value={restaurant.averageRating ?? 0}
          />

          <StatItem
            label='Total Reviews'
            value={restaurant.totalReviews ?? 0}
          />

          <StatItem label='Status' value={restaurant.status} />
        </Stack>
      </Paper>

      <Paper
        elevation={0}
        variant='outlined'
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 3,
        }}
      >
        <Typography variant='h6' fontWeight={700} gutterBottom>
          System Information
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <InfoRow label='Restaurant ID' value={restaurant.id} />

        <InfoRow label='Created At' value={formatDate(restaurant.createdAt)} />
      </Paper>
    </Box>
  );
}

function InfoRow({ label, value }) {
  return (
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      spacing={{
        xs: 0.5,
        sm: 2,
      }}
      sx={{
        py: 1.25,
      }}
    >
      <Typography
        sx={{
          width: {
            sm: 180,
          },
          flexShrink: 0,
          fontWeight: 600,
        }}
      >
        {label}
      </Typography>

      <Typography color='text.secondary'>{value}</Typography>
    </Stack>
  );
}

function StatItem({ label, value }) {
  return (
    <Box>
      <Typography variant='body2' color='text.secondary'>
        {label}
      </Typography>

      <Typography variant='h6' fontWeight={700}>
        {value}
      </Typography>
    </Box>
  );
}

function formatDate(date) {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default AdminRestaurantDetailsPage;
