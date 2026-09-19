import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";

const STATUS_LABELS = {
  PLACED: "Placed",
  ACCEPTED: "Accepted",
  PREPARING: "Preparing",
  READY_FOR_PICKUP: "Ready for Pickup",
  PICKED_UP: "Picked Up",
  OUT_FOR_DELIVERY: "Out for Delivery",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
  REJECTED: "Rejected",
};

const STATUS_ORDER = [
  "PLACED",
  "ACCEPTED",
  "PREPARING",
  "READY_FOR_PICKUP",
  "PICKED_UP",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

function formatDate(value) {
  if (!value) return "—";

  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function OrderTimeline({ status, statusLogs = [] }) {
  const isCancelled = status === "CANCELLED" || status === "REJECTED";

  const completedStatuses = new Set(statusLogs.map((log) => log.status));

  const logMap = new Map(statusLogs.map((log) => [log.status, log]));

  const statusesToDisplay = isCancelled
    ? statusLogs
    : STATUS_ORDER.map((statusName) => ({
        status: statusName,
        ...(logMap.get(statusName) ?? {}),
      }));

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
        <Stack spacing={2}>
          <Stack direction='row' spacing={1} alignItems='center'>
            <TimelineOutlinedIcon fontSize='small' color='action' />

            <Typography variant='h6' fontWeight={600}>
              Order Timeline
            </Typography>
          </Stack>

          <Divider />

          <Stack>
            {statusesToDisplay.map((log, index) => {
              const isCompleted = completedStatuses.has(log.status);

              const isCurrent = log.status === status;

              const isLast = index === statusesToDisplay.length - 1;

              return (
                <Stack key={log.id ?? log.status} direction='row' spacing={2}>
                  {/* Indicator */}
                  <Stack
                    alignItems='center'
                    sx={{
                      width: 24,
                      flexShrink: 0,
                    }}
                  >
                    {isCompleted ? (
                      <CheckCircleOutlinedIcon
                        color={isCurrent ? "primary" : "success"}
                        fontSize='small'
                      />
                    ) : (
                      <RadioButtonUncheckedIcon
                        color='disabled'
                        fontSize='small'
                      />
                    )}

                    {!isLast && (
                      <Box
                        sx={{
                          width: 2,
                          flex: 1,
                          minHeight: 42,
                          bgcolor: isCompleted ? "success.light" : "divider",
                          my: 0.5,
                        }}
                      />
                    )}
                  </Stack>

                  {/* Content */}
                  <Box
                    sx={{
                      pb: isLast ? 0 : 2.5,
                      flex: 1,
                    }}
                  >
                    <Stack
                      direction={{
                        xs: "column",
                        sm: "row",
                      }}
                      justifyContent='space-between'
                      spacing={0.5}
                    >
                      <Stack direction='row' spacing={1} alignItems='center'>
                        <Typography
                          variant='body2'
                          fontWeight={isCurrent ? 700 : 600}
                        >
                          {STATUS_LABELS[log.status] ?? log.status}
                        </Typography>

                        {isCurrent && (
                          <Chip
                            size='small'
                            label='Current'
                            color='primary'
                            variant='outlined'
                          />
                        )}
                      </Stack>

                      {log.createdAt && (
                        <Typography variant='caption' color='text.secondary'>
                          {formatDate(log.createdAt)}
                        </Typography>
                      )}
                    </Stack>
                  </Box>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default OrderTimeline;
