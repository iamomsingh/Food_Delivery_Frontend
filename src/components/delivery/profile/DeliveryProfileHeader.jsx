import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";

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

function formatStatus(status) {
  if (!status) {
    return "Unknown";
  }

  return status
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function DeliveryProfileHeader({ profile }) {
  const firstName = profile?.user?.firstName || "";
  const lastName = profile?.user?.lastName || "";

  const fullName = `${firstName} ${lastName}`.trim() || "Delivery Partner";

  const initials =
    `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || "DP";

  return (
    <Card
      sx={{
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2.5}
          sx={{ alignItems: { xs: "flex-start", sm: "center" } }}
        >
          <Avatar
            sx={{
              width: { xs: 72, sm: 88 },
              height: { xs: 72, sm: 88 },
              fontSize: { xs: "1.5rem", sm: "1.75rem" },
              bgcolor: "primary.main",
            }}
          >
            {initials}
          </Avatar>

          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant='h5'
              fontWeight={700}
              sx={{
                fontSize: {
                  xs: "1.35rem",
                  sm: "1.5rem",
                  md: "1.75rem",
                },
              }}
            >
              {fullName}
            </Typography>

            <Typography variant='body2' color='textSecondary' sx={{ mt: 0.5 }}>
              Delivery Partner
            </Typography>

            {profile?.user?.email && (
              <Typography
                variant='body2'
                color='textSecondary'
                sx={{ mt: 0.5 }}
              >
                {profile.user.email}
              </Typography>
            )}
          </Box>

          <Stack direction='row' spacing={1} flexWrap='wrap' useFlexGap>
            <Chip
              icon={<LocalShippingIcon />}
              label={formatStatus(profile?.status)}
              color={getStatusColor(profile?.status)}
            />

            <Chip
              label={profile?.isOnline ? "Online" : "Offline"}
              color={profile?.isOnline ? "success" : "default"}
              variant='outlined'
            />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default DeliveryProfileHeader;
