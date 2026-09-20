import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

function formatDate(value) {
  if (!value) {
    return "Not completed";
  }

  return new Date(value).toLocaleString();
}

function DeliveryAssignmentTimeline({ assignment }) {
  const steps = [
    {
      label: "Assigned",
      value: assignment?.assignedAt,
    },
    {
      label: "Picked Up",
      value: assignment?.pickedUpAt,
    },
    {
      label: "Delivered",
      value: assignment?.deliveredAt,
    },
  ];

  return (
    <Card
      elevation={0}
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 3,
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Stack spacing={2}>
          <Typography variant='h6' fontWeight={700}>
            Delivery Timeline
          </Typography>

          <Divider />

          <Stack spacing={2}>
            {steps.map((step, index) => {
              const completed = Boolean(step.value);

              return (
                <Stack
                  key={step.label}
                  direction='row'
                  spacing={2}
                  sx={{
                    alignItems: "flex-start",
                  }}
                >
                  <Stack alignItems='center' sx={{ minWidth: 12 }}>
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        bgcolor: completed ? "success.main" : "action.disabled",
                        mt: 0.75,
                      }}
                    />

                    {index < steps.length - 1 && (
                      <Box
                        sx={{
                          width: 2,
                          height: 38,
                          bgcolor: "divider",
                        }}
                      />
                    )}
                  </Stack>

                  <Box>
                    <Typography variant='body2' fontWeight={600}>
                      {step.label}
                    </Typography>

                    <Typography variant='caption' color='textSecondary'>
                      {formatDate(step.value)}
                    </Typography>
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

export default DeliveryAssignmentTimeline;
