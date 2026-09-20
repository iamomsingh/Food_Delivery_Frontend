import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";

import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

function getApprovalConfig(status) {
  switch (status) {
    case "APPROVED":
      return {
        label: "Approved",
        color: "success",
        icon: <CheckCircleOutlinedIcon />,
        message:
          "Your delivery partner account has been approved. You can receive delivery assignments.",
      };

    case "PENDING":
      return {
        label: "Pending",
        color: "warning",
        icon: <PendingOutlinedIcon />,
        message:
          "Your delivery partner application is waiting for admin approval.",
      };

    case "REJECTED":
      return {
        label: "Rejected",
        color: "error",
        icon: <CancelOutlinedIcon />,
        message: "Your delivery partner application was rejected.",
      };

    default:
      return {
        label: "Unknown",
        color: "default",
        icon: null,
        message:
          "Your delivery partner approval status is currently unavailable.",
      };
  }
}

function DeliveryApprovalCard({ profile }) {
  const config = getApprovalConfig(profile?.status);

  return (
    <Card
      sx={{
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Stack spacing={2}>
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
                Application Status
              </Typography>

              <Typography
                variant='body2'
                color='text.secondary'
                sx={{ mt: 0.5 }}
              >
                Delivery partner application status.
              </Typography>
            </Box>

            <Chip
              icon={config.icon}
              label={config.label}
              color={config.color}
            />
          </Stack>

          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: "action.hover",
            }}
          >
            <Typography variant='body2'>{config.message}</Typography>
          </Box>

          {profile?.createdAt && (
            <Typography variant='caption' color='textSecondary'>
              Application submitted:{" "}
              {new Date(profile.createdAt).toLocaleDateString()}
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default DeliveryApprovalCard;
