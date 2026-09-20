import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from "@mui/material";

import WifiOutlinedIcon from "@mui/icons-material/WifiOutlined";
import WifiOffOutlinedIcon from "@mui/icons-material/WifiOffOutlined";

function DeliveryStatusCard({
  isOnline,
  isAvailable,
  status,
  loading,
  error,
  onToggle,
}) {
  const isApproved = status === "APPROVED";

  return (
    <Card
      elevation={0}
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 3,
      }}
    >
      <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: {
              xs: "stretch",
              sm: "center",
            },
          }}
        >
          <Stack direction='row' spacing={2} sx={{ alignItems: "center" }}>
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: 2.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: isOnline ? "success.light" : "action.hover",
                color: isOnline ? "success.dark" : "text.secondary",
              }}
            >
              {isOnline ? <WifiOutlinedIcon /> : <WifiOffOutlinedIcon />}
            </Box>

            <Box>
              <Typography variant='h6' fontWeight={700}>
                {isOnline ? "You're online" : "You're offline"}
              </Typography>

              <Typography variant='body2' color='textSecondary'>
                {isOnline
                  ? isAvailable
                    ? "You are available for new deliveries."
                    : "You currently have an active delivery."
                  : "Go online when you're ready to deliver."}
              </Typography>
            </Box>
          </Stack>

          <FormControlLabel
            sx={{
              m: 0,
              alignSelf: {
                xs: "flex-start",
                sm: "center",
              },
            }}
            control={
              <Switch
                checked={Boolean(isOnline)}
                onChange={(event) => onToggle(event.target.checked)}
                disabled={loading || !isApproved || (!isAvailable && !isOnline)}
              />
            }
            label={
              loading ? (
                <CircularProgress size={18} />
              ) : isOnline ? (
                "Online"
              ) : (
                "Offline"
              )
            }
          />
        </Stack>

        {!isApproved && (
          <Alert severity='warning' sx={{ mt: 2 }}>
            Your delivery partner application is not approved yet.
          </Alert>
        )}

        {error && (
          <Alert severity='error' sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

export default DeliveryStatusCard;
