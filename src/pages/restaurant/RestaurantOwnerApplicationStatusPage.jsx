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

import StorefrontIcon from "@mui/icons-material/Storefront";
import RefreshIcon from "@mui/icons-material/Refresh";

import { fetchRestaurantOwnerApplication } from "../../features/restaurant/restaurantOwnerApplicationSlice";

function RestaurantOwnerApplicationStatusPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { application, applicationLoading, applicationError } = useSelector(
    (state) => state.restaurantOwnerApplication,
  );

  const isRestaurantOwner = useSelector((state) =>
    state.auth.user?.roles?.includes("RESTAURANT_OWNER"),
  );

  useEffect(() => {
    dispatch(fetchRestaurantOwnerApplication());
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
      <Box sx={{ maxWidth: 650, mx: "auto" }}>
        <Alert
          severity='error'
          action={
            <Button
              color='inherit'
              size='small'
              startIcon={<RefreshIcon />}
              onClick={() => dispatch(fetchRestaurantOwnerApplication())}
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

  // Approved role is the authorization source of truth.
  if (isRestaurantOwner) {
    return (
      <Box sx={{ maxWidth: 650, mx: "auto" }}>
        <Card>
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <Stack spacing={2.5} alignItems='center' textAlign='center'>
              <StorefrontIcon color='success' sx={{ fontSize: 56 }} />

              <Box>
                <Typography variant='h5' fontWeight={700}>
                  You are a Restaurant Owner
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
                onClick={() => navigate("/restaurant/dashboard")}
              >
                Go to Restaurant Dashboard
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    );
  }

  // No application.
  if (!application) {
    return (
      <Box sx={{ maxWidth: 650, mx: "auto" }}>
        <Card>
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <Stack spacing={2.5} alignItems='center' textAlign='center'>
              <StorefrontIcon sx={{ fontSize: 56 }} />

              <Box>
                <Typography variant='h5' fontWeight={700}>
                  Become a Restaurant Owner
                </Typography>

                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ mt: 1 }}
                >
                  You have not submitted a restaurant owner application yet.
                </Typography>
              </Box>

              <Button
                variant='contained'
                onClick={() => navigate("/restaurant-owner/apply")}
              >
                Apply Now
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    );
  }

  const { status } = application;

  let title = "Restaurant Owner Application";
  let message = "";
  let severity = "info";

  if (status === "PENDING") {
    title = "Application Pending";
    message =
      "Your application has been submitted and is waiting for admin approval.";
    severity = "warning";
  } else if (status === "REJECTED") {
    title = "Application Rejected";
    message =
      "Your application was rejected. You can submit a new application.";
    severity = "error";
  } else {
    title = `Application Status: ${status}`;
    message = "Your current restaurant owner application status.";
  }

  return (
    <Box sx={{ maxWidth: 650, mx: "auto" }}>
      <Card>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Stack spacing={3}>
            <Box>
              <Typography variant='h5' fontWeight={700}>
                {title}
              </Typography>

              <Typography
                variant='body2'
                color='text.secondary'
                sx={{ mt: 0.75 }}
              >
                Restaurant Owner Application
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
                  <strong>Reason:</strong> {application.reason}
                </Typography>

                {application.experience && (
                  <Typography variant='body2'>
                    <strong>Experience:</strong> {application.experience}
                  </Typography>
                )}

                {application.additionalInfo && (
                  <Typography variant='body2'>
                    <strong>Additional Information:</strong>{" "}
                    {application.additionalInfo}
                  </Typography>
                )}

                <Typography variant='body2'>
                  <strong>Status:</strong> {application.status}
                </Typography>

                {application.rejectionReason && (
                  <Typography variant='body2' color='error'>
                    <strong>Rejection Reason:</strong>{" "}
                    {application.rejectionReason}
                  </Typography>
                )}
              </Stack>
            </Box>

            {status === "REJECTED" && (
              <Button
                variant='contained'
                onClick={() => navigate("/restaurant-owner/apply")}
              >
                Reapply
              </Button>
            )}

            {status === "PENDING" && (
              <Button
                variant='outlined'
                startIcon={<RefreshIcon />}
                onClick={() => dispatch(fetchRestaurantOwnerApplication())}
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

export default RestaurantOwnerApplicationStatusPage;
