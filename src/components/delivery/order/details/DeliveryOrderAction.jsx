import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

function getAction(status) {
  switch (status) {
    case "READY_FOR_PICKUP":
      return {
        label: "Pick Up Order",
        message:
          "Confirm that you have picked up the order from the restaurant.",
      };

    case "PICKED_UP":
      return {
        label: "Start Delivery",
        message: "Confirm that you are leaving the restaurant with the order.",
      };

    case "OUT_FOR_DELIVERY":
      return {
        label: "Mark as Delivered",
        message: "Confirm that the order has been delivered to the customer.",
      };

    default:
      return null;
  }
}

function DeliveryOrderAction({ status, loading, error, onAction }) {
  const action = getAction(status);

  if (!action) {
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
          <Alert severity='success'>This delivery has been completed.</Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      elevation={0}
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 3,
        bgcolor: "background.paper",
      }}
    >
      <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
        <Stack spacing={2}>
          <Stack direction='row' spacing={1.5} sx={{ alignItems: "center" }}>
            <LocalShippingOutlinedIcon color='primary' />

            <Box>
              <Typography variant='h6' fontWeight={700}>
                Next Action
              </Typography>

              <Typography variant='body2' color='textSecondary'>
                {action.message}
              </Typography>
            </Box>
          </Stack>

          {error && <Alert severity='error'>{error}</Alert>}

          <Button
            variant='contained'
            size='large'
            onClick={onAction}
            disabled={loading}
            startIcon={
              loading ? (
                <CircularProgress size={18} color='inherit' />
              ) : (
                <LocalShippingOutlinedIcon />
              )
            }
            sx={{
              alignSelf: {
                xs: "stretch",
                sm: "flex-start",
              },
            }}
          >
            {loading ? "Updating..." : action.label}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default DeliveryOrderAction;
