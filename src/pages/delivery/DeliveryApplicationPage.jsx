import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import RefreshIcon from "@mui/icons-material/Refresh";

import { fetchDeliveryApplication } from "../../features/delivery/deliverySlice";

function DeliveryApplicationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { application, applicationLoading, applicationError } = useSelector(
    (state) => state.delivery,
  );

  const isDeliveryPartner = useSelector((state) =>
    state.auth.user?.roles?.includes("DELIVERY_PARTNER"),
  );

  useEffect(() => {
    dispatch(fetchDeliveryApplication());
  }, [dispatch]);

  if (applicationLoading && !application) {
    return (
      <Box
        sx={{
          minHeight: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (applicationError) {
    return (
      <Box sx={{ maxWidth: 600, mx: "auto" }}>
        <Alert
          severity='error'
          action={
            <Button
              color='inherit'
              size='small'
              startIcon={<RefreshIcon />}
              onClick={() => dispatch(fetchDeliveryApplication())}
            >
              Retry
            </Button>
          }
        >
          {applicationError}
        </Alert>
      </Box>
    );
  }

  if (isDeliveryPartner) {
    return (
      <Box sx={{ maxWidth: 600, mx: "auto" }}>
        <Card>
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <Stack
              spacing={2.5}
              sx={{ alignItems: "center", textAlign: "center" }}
            >
              <LocalShippingIcon color='success' sx={{ fontSize: 56 }} />

              <Box>
                <Typography variant='h5' fontWeight={700}>
                  You are a Delivery Partner
                </Typography>

                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ mt: 1 }}
                >
                  Your application has been approved.
                </Typography>
              </Box>

              <Button
                variant='contained'
                onClick={() => navigate("/delivery/dashboard")}
              >
                Go to Delivery Dashboard
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    );
  }

  /*
   * No application.
   */
  if (!application) {
    return (
      <Box sx={{ maxWidth: 600, mx: "auto" }}>
        <Card>
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <Stack spacing={2.5} alignItems='center' textAlign='center'>
              <LocalShippingIcon sx={{ fontSize: 56 }} />

              <Box>
                <Typography variant='h5' fontWeight={700}>
                  Become a Delivery Partner
                </Typography>

                <Typography
                  variant='body2'
                  color='textSecondary'
                  sx={{ mt: 1 }}
                >
                  You have not submitted a delivery partner application yet.
                </Typography>
              </Box>

              <Button
                variant='contained'
                onClick={() => navigate("/delivery/apply")}
              >
                Apply Now
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    );
  }

  const status = application.status;

  let title = "Delivery Partner Application";
  let message = "";
  let severity = "info";

  if (status === "PENDING") {
    title = "Application Pending";
    message =
      "Your delivery partner application has been submitted and is waiting for admin approval.";
    severity = "warning";
  } else if (status === "REJECTED") {
    title = "Application Rejected";
    message =
      "Your delivery partner application was rejected. You can submit a new application.";
    severity = "error";
  } else if (status === "SUSPENDED") {
    title = "Account Suspended";
    message =
      "Your delivery partner account is currently suspended. Please contact the administrator for more information.";
    severity = "error";
  } else {
    title = `Application Status: ${status}`;
    message = "Your current delivery partner application status.";
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto" }}>
      <Card>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Stack spacing={3}>
            <Box>
              <Typography variant='h5' fontWeight={700}>
                {title}
              </Typography>

              <Typography
                variant='body2'
                color='textSecondary'
                sx={{ mt: 0.75 }}
              >
                Delivery Partner Application
              </Typography>
            </Box>

            <Alert severity={severity}>{message}</Alert>

            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: "action.hover",
              }}
            >
              <Stack spacing={1.5}>
                <Typography variant='body2'>
                  <strong>Vehicle Type:</strong> {application.vehicleType}
                </Typography>

                <Typography variant='body2'>
                  <strong>Vehicle Number:</strong> {application.vehicleNumber}
                </Typography>

                <Typography variant='body2'>
                  <strong>Status:</strong> {application.status}
                </Typography>
              </Stack>
            </Box>

            {status === "REJECTED" && (
              <Button
                variant='contained'
                onClick={() => navigate("/delivery/apply")}
              >
                Reapply
              </Button>
            )}

            {status === "PENDING" && (
              <Button
                variant='outlined'
                startIcon={<RefreshIcon />}
                onClick={() => dispatch(fetchDeliveryApplication())}
              >
                Refresh Status
              </Button>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

export default DeliveryApplicationPage;
