import {
  Box,
  Card,
  CardContent,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

function DashboardStatCard({ title, value, subtitle, icon, loading = false }) {
  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 3,

        transition: "box-shadow 0.2s, transform 0.2s",

        "&:hover": {
          boxShadow: 4,
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Stack spacing={2}>
          {/* Header */}
          <Stack
            direction='row'
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant='body2' color='text.secondary' fontWeight={600}>
              {title}
            </Typography>

            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                bgcolor: "action.hover",

                "& svg": {
                  fontSize: 22,
                  color: "text.secondary",
                },
              }}
            >
              {icon}
            </Box>
          </Stack>

          {/* Main value */}
          {loading ? (
            <Skeleton variant='text' width={70} height={45} />
          ) : (
            <Typography variant='h4' fontWeight={700} lineHeight={1}>
              {value}
            </Typography>
          )}

          {/* Subtitle */}
          {loading ? (
            <Skeleton variant='text' width={120} />
          ) : (
            subtitle && (
              <Typography variant='body2' color='textSecondary'>
                {subtitle}
              </Typography>
            )
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default DashboardStatCard;
