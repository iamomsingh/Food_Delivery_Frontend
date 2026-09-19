import { useEffect, useState } from "react";
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

import {
  fetchAdminRestaurantDetails,
  clearSelectedRestaurant,
  approveRestaurant,
  fetchAdminRestaurants,
  rejectRestaurant,
} from "../../features/admin/adminRestaurantSlice";

import Loader from "../../components/common/Loader";
import ErrorState from "../../components/common/ErrorState";
import RestaurantRejectDialog from "../../components/admin/restaurant/RestaurantRejectDialog";

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

  const [restaurantToReject, setRestaurantToReject] = useState(null);

  const {
    selectedRestaurant,
    detailLoading,
    detailError,
    actionLoadingType,
    actionLoadingId,
  } = useSelector((state) => state.adminRestaurant);

  useEffect(() => {
    dispatch(fetchAdminRestaurantDetails(restaurantId));

    return () => {
      dispatch(clearSelectedRestaurant());
    };
  }, [dispatch, restaurantId]);

  // APPROVE
  const handleApprove = async (restaurantId) => {
    const result = await dispatch(approveRestaurant(restaurantId));

    if (approveRestaurant.fulfilled.match(result)) {
      dispatch(
        fetchAdminRestaurants({
          page: pagination.page,
          limit: pagination.limit,
          status: filters.status,
        }),
      );
    }
  };

  // OPEN REJECT DIALOG
  const handleReject = (restaurant) => {
    setRestaurantToReject(restaurant);
  };

  // CONFIRM REJECT
  const handleRejectConfirm = async () => {
    if (!restaurantToReject) {
      return;
    }

    const result = await dispatch(rejectRestaurant(restaurantToReject.id));

    if (rejectRestaurant.fulfilled.match(result)) {
      setRestaurantToReject(null);

      dispatch(
        fetchAdminRestaurants({
          page: pagination.page,
          limit: pagination.limit,
          status: filters.status,
        }),
      );
    }
  };

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

  const isApproving =
    actionLoadingType === "APPROVE_RESTAURANT" &&
    actionLoadingId === restaurant.id;

  const isRejecting =
    actionLoadingType === "REJECT_RESTAURANT" &&
    actionLoadingId === restaurant.id;

  const actionLoading = isApproving || isRejecting;

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
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            mb: 3,
          }}
        >
          <Box>
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
              <Box>
                <Typography variant='h5' fontWeight={700}>
                  {restaurant.name}
                </Typography>

                <Typography color='textSecondary' sx={{ mt: 0.5 }}>
                  @{restaurant.slug}
                </Typography>
              </Box>
            )}
          </Box>

          <Box>
            <Chip
              label={restaurant.status}
              size='small'
              sx={{ mt: 1 }}
              color={getStatusColor(restaurant.status)}
            />
          </Box>
        </Stack>

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={1}
          sx={{ mt: 3 }}
        >
          {restaurant.status === "PENDING" && (
            <>
              <Button
                variant='contained'
                color='success'
                // startIcon={<CheckIcon />}
                disabled={actionLoading}
                onClick={() => handleApprove(restaurant.is)}
              >
                Approve
              </Button>

              <Button
                variant='outlined'
                color='error'
                // startIcon={<CloseIcon />}
                disabled={actionLoading}
                onClick={() => handleReject(restaurant)}
              >
                Reject
              </Button>

              {/* <Tooltip title='Approve'>
                <span>
                  <IconButton
                    size='small'
                    color='success'
                    disabled={actionLoading}
                    onClick={() => onApprove(restaurant.id)}
                  >
                    <CheckIcon fontSize='small' />
                  </IconButton>
                </span>
              </Tooltip>

              <Tooltip title='Reject'>
                <span>
                  <IconButton
                    size='small'
                    color='error'
                    disabled={actionLoading}
                    onClick={() => onReject(restaurant)}
                  >
                    <CloseIcon fontSize='small' />
                  </IconButton>
                </span>
              </Tooltip> */}
            </>
          )}
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

      <RestaurantRejectDialog
        open={Boolean(restaurantToReject)}
        restaurant={restaurantToReject}
        loading={
          actionLoadingType === "REJECT_RESTAURANT" &&
          actionLoadingId === restaurantToReject?.id
        }
        onClose={() => setRestaurantToReject(null)}
        onConfirm={handleRejectConfirm}
      />
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
