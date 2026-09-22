import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  Alert,
  Avatar,
  Breadcrumbs,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  ArrowBack,
  CheckCircle,
  Close,
  Email,
  Phone,
  Storefront,
} from "@mui/icons-material";

import {
  approveRestaurantOwnerApplication,
  clearActionError,
  fetchRestaurantOwnerApplication,
  rejectRestaurantOwnerApplication,
} from "../../features/admin/adminRestaurantOwnerSlice";

function RestaurantOwnerApplicationDetailsPage() {
  const { applicationId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    selectedApplication,
    detailsLoading,
    detailsError,
    actionLoading,
    actionError,
  } = useSelector((state) => state.adminRestaurantOwner);

  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);

  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    dispatch(fetchRestaurantOwnerApplication(applicationId));

    return () => {
      dispatch(clearActionError());
    };
  }, [dispatch, applicationId]);

  const handleApprove = async () => {
    const result = await dispatch(
      approveRestaurantOwnerApplication(applicationId),
    );

    if (approveRestaurantOwnerApplication.fulfilled.match(result)) {
      navigate("/admin/restaurant-owners");
    }
  };

  const handleReject = async () => {
    const reason = rejectionReason.trim();

    if (reason.length < 10) return;

    const result = await dispatch(
      rejectRestaurantOwnerApplication({
        applicationId,
        rejectionReason: reason,
      }),
    );

    if (rejectRestaurantOwnerApplication.fulfilled.match(result)) {
      setRejectDialogOpen(false);
      setRejectionReason("");
    }
  };

  const handleOpenReject = () => {
    dispatch(clearActionError());
    setRejectionReason("");
    setRejectDialogOpen(true);
  };

  const handleCloseReject = () => {
    if (actionLoading) return;

    setRejectDialogOpen(false);
    setRejectionReason("");
  };

  if (detailsLoading) {
    return (
      <Stack minHeight='60vh' alignItems='center' justifyContent='center'>
        <CircularProgress />
      </Stack>
    );
  }

  if (detailsError) {
    return <Alert severity='error'>{detailsError}</Alert>;
  }

  if (!selectedApplication) {
    return (
      <Alert severity='info'>Restaurant owner application not found.</Alert>
    );
  }

  const application = selectedApplication;
  const applicant = application.user;

  const isPending = application.status === "PENDING";
  const isApproved = application.status === "APPROVED";

  return (
    <Stack spacing={3}>
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <Stack spacing={1.5}>
        <Breadcrumbs>
          <Button
            size='small'
            startIcon={<ArrowBack />}
            onClick={() => navigate("/admin/restaurant-owners")}
          >
            Applications
          </Button>

          <Typography variant='body2' color='text.primary'>
            Application Details
          </Typography>
        </Breadcrumbs>

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          sx={{
            justifyContent: "space-between",
            alignItems: {
              xs: "flex-start",
              sm: "center",
            },
          }}
          spacing={2}
        >
          <Stack spacing={0.5}>
            <Typography variant='h4' fontWeight={700}>
              Restaurant Owner Application
            </Typography>

            <Typography variant='body2' color='textSecondary'>
              Review applicant information before granting restaurant owner
              access.
            </Typography>
          </Stack>

          <StatusChip status={application.status} />
        </Stack>
      </Stack>

      {/* ================================================= */}
      {/* ACTION ERROR */}
      {/* ================================================= */}

      {actionError && <Alert severity='error'>{actionError}</Alert>}

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack spacing={3}>
            {/* Applicant */}

            <Paper
              variant='outlined'
              sx={{
                p: { xs: 2.5, md: 3 },
                borderRadius: 3,
                height: "100%",
              }}
            >
              <Stack spacing={3}>
                <Stack
                  direction='row'
                  sx={{ justifyContent: "space-between", alignItems: "center" }}
                >
                  <Stack spacing={0.5}>
                    <Typography variant='h6' fontWeight={600}>
                      Applicant Information
                    </Typography>

                    <Typography variant='body2' color='textSecondary'>
                      Personal information of the applicant
                    </Typography>
                  </Stack>

                  <Avatar
                    sx={{
                      width: 52,
                      height: 52,
                    }}
                  >
                    {getInitials(
                      `${applicant?.firstName} ${applicant?.lastName}`,
                    )}
                  </Avatar>
                </Stack>

                <Divider />

                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <ContactItem
                      icon={<PersonIcon />}
                      label='Full Name'
                      value={`${applicant?.firstName} ${applicant?.lastName}`}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <ContactItem
                      icon={<Email fontSize='small' />}
                      label='Email Address'
                      value={applicant?.email}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <ContactItem
                      icon={<Phone fontSize='small' />}
                      label='Phone Number'
                      value={applicant?.phone}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <ContactItem
                      icon={<Storefront fontSize='small' />}
                      label='Application Type'
                      value='Restaurant Owner'
                    />
                  </Grid>
                </Grid>
              </Stack>
            </Paper>

            {/* Application */}

            <Paper
              variant='outlined'
              sx={{
                p: { xs: 2.5, md: 3 },
                borderRadius: 3,
              }}
            >
              <Stack spacing={3}>
                <Stack spacing={0.5}>
                  <Stack direction='row' spacing={1} alignItems='center'>
                    <Storefront color='action' />

                    <Typography variant='h6' fontWeight={600}>
                      Application Details
                    </Typography>
                  </Stack>

                  <Typography variant='body2' color='text.secondary'>
                    Information provided by the applicant.
                  </Typography>
                </Stack>

                <Divider />

                <Grid container spacing={3}>
                  <Grid size={12}>
                    <ApplicationField
                      label='Why do you want to become a restaurant owner?'
                      value={application.reason}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <ApplicationField
                      label='Restaurant / Business Experience'
                      value={
                        application.experience ||
                        "No experience information provided."
                      }
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <ApplicationField
                      label='Additional Information'
                      value={
                        application.additionalInfo ||
                        "No additional information provided."
                      }
                    />
                  </Grid>

                  {application.rejectionReason && (
                    <Grid size={12}>
                      <ApplicationField
                        label='Rejection Reason'
                        value={application.rejectionReason}
                        error
                      />
                    </Grid>
                  )}
                </Grid>
              </Stack>
            </Paper>
          </Stack>
        </Grid>

        {/* RIGHT*/}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={3}>
            {/* Summary */}

            <Paper
              variant='outlined'
              sx={{
                p: 3,
                borderRadius: 3,
              }}
            >
              <Stack spacing={3}>
                <Stack spacing={0.5}>
                  <Typography variant='h6' fontWeight={600}>
                    Application Summary
                  </Typography>

                  <Typography variant='body2' color='textSecondary'>
                    Current application status.
                  </Typography>
                </Stack>

                <Divider />

                <Stack spacing={2.5}>
                  <SummaryItem
                    label='Status'
                    value={<StatusChip status={application.status} />}
                  />

                  <SummaryItem
                    label='Submitted'
                    value={formatDate(application.createdAt)}
                  />

                  {application.reviewedAt && (
                    <SummaryItem
                      label='Reviewed'
                      value={formatDate(application.reviewedAt)}
                    />
                  )}

                  {application.reviewedBy && (
                    <SummaryItem
                      label='Reviewed By'
                      value={
                        `${application.reviewer?.firstName} ${application.reviewer?.lastName}` ||
                        "Admin"
                      }
                    />
                  )}
                </Stack>
              </Stack>
            </Paper>

            {/* Review */}

            <Paper
              variant='outlined'
              sx={{
                p: 3,
                borderRadius: 3,
              }}
            >
              <Stack spacing={3}>
                <Stack spacing={0.5}>
                  <Typography variant='h6' fontWeight={600}>
                    Review Application
                  </Typography>

                  <Typography variant='body2' color='textSecondary'>
                    {isPending
                      ? "Choose how you want to process this application."
                      : "This application has already been reviewed."}
                  </Typography>
                </Stack>

                <Divider />

                {isPending ? (
                  <Stack spacing={1.5}>
                    <Button
                      fullWidth
                      size='large'
                      variant='contained'
                      color='success'
                      startIcon={<CheckCircle />}
                      disabled={actionLoading}
                      onClick={handleApprove}
                    >
                      {actionLoading ? "Processing..." : "Approve Application"}
                    </Button>

                    <Button
                      fullWidth
                      size='large'
                      variant='outlined'
                      color='error'
                      startIcon={<Close />}
                      disabled={actionLoading}
                      onClick={handleOpenReject}
                    >
                      Reject Application
                    </Button>
                  </Stack>
                ) : (
                  <Alert severity={isApproved ? "success" : "error"}>
                    {isApproved
                      ? "This applicant has been approved as a restaurant owner."
                      : "This application has been rejected."}
                  </Alert>
                )}
              </Stack>
            </Paper>
          </Stack>
        </Grid>
      </Grid>

      {/* ================================================= */}
      {/* REJECTION DIALOG */}
      {/* ================================================= */}

      <Dialog
        open={rejectDialogOpen}
        onClose={handleCloseReject}
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle>Reject Restaurant Owner Application</DialogTitle>

        <DialogContent>
          <Stack spacing={2} pt={1}>
            <Typography variant='body2' color='textSecondary'>
              Provide a reason for rejecting this application. The applicant
              will be able to see this reason and reapply.
            </Typography>

            <TextField
              autoFocus
              fullWidth
              multiline
              minRows={5}
              label='Rejection Reason'
              placeholder='Enter the reason for rejection...'
              value={rejectionReason}
              onChange={(event) => setRejectionReason(event.target.value)}
              helperText={`${rejectionReason.length}/1000 characters • Minimum 10 characters`}
              error={
                rejectionReason.length > 0 && rejectionReason.trim().length < 10
              }
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button disabled={actionLoading} onClick={handleCloseReject}>
            Cancel
          </Button>

          <Button
            variant='contained'
            color='error'
            disabled={actionLoading || rejectionReason.trim().length < 10}
            onClick={handleReject}
          >
            {actionLoading ? "Rejecting..." : "Reject"}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

/* ================================================= */
/* COMPONENTS */
/* ================================================= */

function StatusChip({ status }) {
  const config = {
    PENDING: {
      label: "Pending Review",
      color: "warning",
    },
    APPROVED: {
      label: "Approved",
      color: "success",
    },
    REJECTED: {
      label: "Rejected",
      color: "error",
    },
  };

  const current = config[status] || {
    label: status,
    color: "default",
  };

  return (
    <Chip
      label={current.label}
      color={current.color}
      size='small'
      sx={{ fontWeight: 600 }}
    />
  );
}

function ContactItem({ icon, label, value }) {
  return (
    <Stack direction='row' spacing={1.5} sx={{ alignItems: "center" }}>
      <Stack
        sx={{
          width: 40,
          height: 40,
          flexShrink: 0,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 2,
          bgcolor: "action.hover",
        }}
      >
        {icon}
      </Stack>

      <Stack spacing={0.25} minWidth={0}>
        <Typography variant='caption' color='textSecondary'>
          {label}
        </Typography>

        <Typography
          variant='body2'
          fontWeight={500}
          sx={{
            overflowWrap: "anywhere",
          }}
        >
          {value || "Not provided"}
        </Typography>
      </Stack>
    </Stack>
  );
}

function ApplicationField({ label, value, error = false }) {
  return (
    <Stack spacing={1}>
      <Typography
        variant='subtitle2'
        fontWeight={600}
        color={error ? "error.main" : "textPrimary"}
      >
        {label}
      </Typography>

      <Paper
        variant='outlined'
        sx={{
          p: 2,
          minHeight: 90,
          borderRadius: 2,
          bgcolor: "action.hover",
          borderColor: error ? "error.main" : "divider",
        }}
      >
        <Typography
          variant='body2'
          color='textSecondary'
          sx={{
            lineHeight: 1.7,
            whiteSpace: "pre-wrap",
          }}
        >
          {value}
        </Typography>
      </Paper>
    </Stack>
  );
}

function SummaryItem({ label, value }) {
  return (
    <Stack
      direction='row'
      sx={{ justifyContent: "space-between", alignItems: "center" }}
      spacing={2}
    >
      <Typography variant='body2' color='textSecondary'>
        {label}
      </Typography>

      {typeof value === "string" ? (
        <Typography
          variant='body2'
          fontWeight={500}
          sx={{ textAlign: "right" }}
        >
          {value}
        </Typography>
      ) : (
        value
      )}
    </Stack>
  );
}

function PersonIcon() {
  return (
    <Typography
      component='span'
      sx={{
        fontSize: 18,
        lineHeight: 1,
      }}
    >
      👤
    </Typography>
  );
}

function getInitials(name) {
  if (!name) return "U";

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function formatDate(date) {
  if (!date) return "—";

  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default RestaurantOwnerApplicationDetailsPage;
