import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from "@mui/material";

import WifiIcon from "@mui/icons-material/Wifi";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

function DeliveryStatusCard({
  profile,
  stats,
  loading = false,
  statusUpdating = false,
  statusError = null,
  onStatusChange,
}) {
  const isOnline = profile?.isOnline ?? stats?.isOnline ?? false;
  const isAvailable = profile?.isAvailable ?? stats?.isAvailable ?? false;

  const isApproved = profile?.status === "APPROVED";

  const handleToggle = (event) => {
    const nextStatus = event.target.checked;

    if (!isApproved || statusUpdating) {
      return;
    }

    onStatusChange?.(nextStatus);
  };

  let availabilityLabel = "Unavailable";
  let availabilityColor = "default";

  if (isAvailable) {
    availabilityLabel = "Available";
    availabilityColor = "success";
  } else {
    availabilityLabel = "Busy";
    availabilityColor = "warning";
  }

  let onlineLabel = "Offline";
  let onlineColor = "default";

  if (isOnline) {
    onlineLabel = "Online";
    onlineColor = "success";
  }

  return (
    <Card
      sx={{
        width: "100%",
        border: "1px solid",
        borderColor: isOnline ? "success.main" : "divider",
        transition: "border-color 0.2s ease",
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Stack spacing={2.5}>
          {/* Header */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            sx={{
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
            }}
            gap={1.5}
          >
            <Box>
              <Typography variant='h6' fontWeight={700}>
                Delivery Status
              </Typography>

              <Typography
                variant='body2'
                color='textSecondary'
                sx={{ mt: 0.5 }}
              >
                Chane your online status
              </Typography>
            </Box>

            <Chip
              icon={isOnline ? <WifiIcon /> : <WifiOffIcon />}
              label={onlineLabel}
              color={onlineColor}
              size='small'
            />
          </Stack>

          {/* Status Information */}
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: "action.hover",
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              sx={{
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
              }}
              gap={2}
            >
              <Stack
                direction='row'
                spacing={1.5}
                sx={{ alignItems: "center" }}
              >
                <LocalShippingIcon color='action' />

                <Box>
                  <Typography variant='body2' color='textSecondary'>
                    Availability
                  </Typography>

                  <Typography variant='body1' fontWeight={600}>
                    {availabilityLabel}
                  </Typography>
                </Box>
              </Stack>

              <Chip
                label={availabilityLabel}
                color={availabilityColor}
                size='small'
              />
            </Stack>
          </Box>

          {/* Online Toggle */}
          <Stack
            direction='row'
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
            gap={2}
          >
            <Box>
              <Typography variant='body1' fontWeight={600}>
                Go {isOnline ? "Offline" : "Online"}
              </Typography>

              <Typography variant='body2' color='textSecondary'>
                {isOnline
                  ? "Turn off your availability when you don't want to receive deliveries."
                  : "Go online when you are ready to receive deliveries."}
              </Typography>
            </Box>

            {statusUpdating ? (
              <CircularProgress size={28} />
            ) : (
              <FormControlLabel
                control={
                  <Switch
                    checked={isOnline}
                    onChange={handleToggle}
                    disabled={
                      loading ||
                      statusUpdating ||
                      !isApproved ||
                      (!isAvailable && !isOnline)
                    }
                  />
                }
                label=''
                sx={{ m: 0 }}
              />
            )}
          </Stack>

          {/* Approval Warning */}
          {!loading && !isApproved && (
            <Box
              sx={{
                p: 1.5,
                borderRadius: 1.5,
                bgcolor: "warning.lighter",
                color: "warning.dark",
              }}
            >
              <Typography variant='body2'>
                Your delivery partner application must be approved before you
                can go online.
              </Typography>
            </Box>
          )}

          {/* Busy Warning */}
          {!loading && isApproved && !isAvailable && (
            <Box
              sx={{
                p: 1.5,
                borderRadius: 1.5,
                bgcolor: "info.lighter",
                color: "info.dark",
              }}
            >
              <Typography variant='body2'>
                You currently have an active delivery. You will become available
                again after the order is delivered.
              </Typography>
            </Box>
          )}

          {/* Backend Error */}
          {statusError && (
            <Box
              sx={{
                p: 1.5,
                borderRadius: 1.5,
                bgcolor: "error.lighter",
                color: "error.dark",
              }}
            >
              <Typography variant='body2'>{statusError}</Typography>
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default DeliveryStatusCard;
