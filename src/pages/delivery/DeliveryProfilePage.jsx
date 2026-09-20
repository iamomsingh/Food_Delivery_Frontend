import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Stack, Typography } from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";

import DeliveryProfileHeader from "../../components/delivery/profile/DeliveryProfileHeader";
import DeliveryPersonalInfoCard from "../../components/delivery/profile/DeliveryPersonalInfoCard";
import DeliveryVehicleCard from "../../components/delivery/profile/DeliveryVehicleCard";
import DeliveryApprovalCard from "../../components/delivery/profile/DeliveryApprovalCard";
import DeliveryPerformanceCard from "../../components/delivery/profile/DeliveryPerformanceCard";

import {
  fetchDeliveryProfile,
  fetchDeliveryStats,
} from "../../features/delivery/deliverySlice";

function DeliveryProfilePage() {
  const dispatch = useDispatch();

  const {
    profile,
    stats,
    profileLoading,
    statsLoading,
    profileError,
    statsError,
  } = useSelector((state) => state.delivery);

  const fetchProfileData = useCallback(() => {
    dispatch(fetchDeliveryProfile());
    dispatch(fetchDeliveryStats());
  }, [dispatch]);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  const handleRefresh = () => {
    fetchProfileData();
  };

  const isLoading = profileLoading || statsLoading;

  const error = profileError || statsError;

  if (isLoading && !profile) {
    return (
      <Stack
        spacing={2}
        alignItems='center'
        justifyContent='center'
        sx={{ py: 8 }}
      >
        <Typography variant='body1' color='text.secondary'>
          Loading profile...
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack spacing={{ xs: 2.5, md: 3 }}>
      {/* Page Header */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
        }}
        gap={2}
      >
        <Box>
          <Typography
            variant='h4'
            fontWeight={700}
            sx={{
              fontSize: {
                xs: "1.7rem",
                sm: "2rem",
                md: "2.125rem",
              },
            }}
          >
            My Profile
          </Typography>

          <Typography variant='body1' color='text.secondary' sx={{ mt: 0.5 }}>
            View your delivery partner account and performance.
          </Typography>
        </Box>

        <Button
          variant='outlined'
          startIcon={<RefreshIcon />}
          onClick={handleRefresh}
          disabled={isLoading}
        >
          Refresh
        </Button>
      </Stack>

      {/* Error */}
      {error && (
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "error.light",
            bgcolor: "error.lighter",
          }}
        >
          <Typography color='error'>{error}</Typography>
        </Box>
      )}

      {/* Profile Header */}
      {profile && <DeliveryProfileHeader profile={profile} />}

      {/* Personal + Vehicle */}
      {profile && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
            },
            gap: 2,
          }}
        >
          <DeliveryPersonalInfoCard profile={profile} />

          <DeliveryVehicleCard profile={profile} />
        </Box>
      )}

      {/* Approval */}
      {profile && <DeliveryApprovalCard profile={profile} />}

      {/* Performance */}
      {profile && <DeliveryPerformanceCard profile={profile} stats={stats} />}
    </Stack>
  );
}

export default DeliveryProfilePage;
