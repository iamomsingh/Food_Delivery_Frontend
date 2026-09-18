import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  fetchAdminUserDetails,
  updateAdminUserStatus,
  clearSelectedUser,
  clearUserActionError,
} from "../../features/admin/adminUserSlice";

import UserStatusDialog from "../../components/admin/user/UserStatusDialog";

import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function getStatusColor(status) {
  switch (status) {
    case "ACTIVE":
      return "success";

    case "BLOCKED":
      return "error";

    case "SUSPENDED":
      return "warning";

    default:
      return "default";
  }
}

function formatDate(date) {
  if (!date) {
    return "—";
  }

  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function InfoRow({ label, children }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "180px 1fr",
        },
        gap: 1,
        py: 1.5,
      }}
    >
      <Typography variant='body2' color='text.secondary'>
        {label}
      </Typography>

      <Box>{children}</Box>
    </Box>
  );
}

function AdminUserDetailsPage() {
  const { userId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    selectedUser,
    detailLoading,
    detailError,
    actionLoadingType,
    actionLoadingId,
    actionError,
  } = useSelector((state) => state.adminUser);

  const currentUser = useSelector((state) => state.auth.user);

  const [actionStatus, setActionStatus] = useState("");

  useEffect(() => {
    dispatch(fetchAdminUserDetails(userId));

    return () => {
      dispatch(clearSelectedUser());
    };
  }, [dispatch, userId]);

  const handleStatusAction = (status) => {
    dispatch(clearUserActionError());
    setActionStatus(status);
  };

  const handleCloseDialog = () => {
    if (isActionLoading) {
      return;
    }

    setActionStatus("");
    dispatch(clearUserActionError());
  };

  const handleConfirmStatusChange = async () => {
    if (!selectedUser || !actionStatus) {
      return;
    }

    const resultAction = await dispatch(
      updateAdminUserStatus({
        userId: selectedUser.id,
        status: actionStatus,
      }),
    );

    if (updateAdminUserStatus.fulfilled.match(resultAction)) {
      setActionStatus("");

      dispatch(fetchAdminUserDetails(userId));
    }
  };

  const isActionLoading =
    actionLoadingType === "UPDATE_USER_STATUS" &&
    actionLoadingId === selectedUser?.id;

  const isCurrentAdmin = selectedUser?.id === currentUser.id;

  if (detailLoading) {
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

  if (detailError) {
    return (
      <Box>
        <Alert severity='error' sx={{ mb: 2 }}>
          {detailError}
        </Alert>

        <Button onClick={() => navigate("/admin/users")}>Back to Users</Button>
      </Box>
    );
  }

  if (!selectedUser) {
    return null;
  }

  const fullName = `${selectedUser.firstName || ""} ${
    selectedUser.lastName || ""
  }`.trim();

  return (
    <Box>
      {/* Header */}
      <Stack direction='row' alignItems='center' spacing={2} sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/admin/users")}
        >
          Users
        </Button>
      </Stack>

      <Typography variant='h4' fontWeight={700} sx={{ mb: 3 }}>
        User Details
      </Typography>

      <Paper
        variant='outlined'
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 3,
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          sx={{
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            mb: 3,
          }}
          spacing={3}
        >
          <Box>
            <Typography variant='h5' fontWeight={600}>
              {fullName}
            </Typography>

            <Typography variant='body2' color='text.secondary'>
              {selectedUser.email}
            </Typography>
          </Box>

          <Chip
            label={selectedUser.status}
            color={getStatusColor(selectedUser.status)}
          />
        </Stack>

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={1}
          sx={{ mt: 3 }}
        >
          {!isCurrentAdmin ? (
            <>
              {selectedUser.status !== "ACTIVE" && (
                <Button
                  variant='outlined'
                  color='success'
                  disabled={isActionLoading}
                  onClick={() => handleStatusAction("ACTIVE")}
                >
                  Activate
                </Button>
              )}

              {selectedUser.status === "ACTIVE" && (
                <>
                  <Button
                    variant='outlined'
                    color='warning'
                    disabled={isActionLoading}
                    onClick={() => handleStatusAction("SUSPENDED")}
                  >
                    Suspend
                  </Button>

                  <Button
                    variant='outlined'
                    color='error'
                    disabled={isActionLoading}
                    onClick={() => handleStatusAction("BLOCKED")}
                  >
                    Block
                  </Button>
                </>
              )}
            </>
          ) : (
            <Chip label='ADMIN' />
          )}
        </Stack>
      </Paper>

      {actionError && (
        <Alert
          severity='error'
          sx={{ mb: 2 }}
          onClose={() => dispatch(clearUserActionError())}
        >
          {actionError}
        </Alert>
      )}

      {/* Basic Information */}
      <Paper sx={{ p: { xs: 2, sm: 3 }, mb: 2 }}>
        <Typography variant='h6' fontWeight={600} mb={1}>
          User Information
        </Typography>

        <Divider />

        <InfoRow label='First Name'>{selectedUser.firstName || "—"}</InfoRow>

        <InfoRow label='Last Name'>{selectedUser.lastName || "—"}</InfoRow>

        <InfoRow label='Email'>{selectedUser.email || "—"}</InfoRow>

        <InfoRow label='Phone'>{selectedUser.phone || "—"}</InfoRow>

        <InfoRow label='Roles'>
          <Stack direction='row' spacing={1} flexWrap='wrap' useFlexGap>
            {selectedUser.roles?.map((role) => (
              <Chip key={role} label={role} size='small' />
            ))}
          </Stack>
        </InfoRow>
      </Paper>

      {/* Verification */}
      <Paper sx={{ p: { xs: 2, sm: 3 }, mb: 2 }}>
        <Typography variant='h6' fontWeight={600} mb={1}>
          Verification
        </Typography>

        <Divider />

        <InfoRow label='Email Verification'>
          <Chip
            label={selectedUser.isEmailVerified ? "Verified" : "Not verified"}
            color={selectedUser.isEmailVerified ? "success" : "default"}
            size='small'
          />
        </InfoRow>

        <InfoRow label='Phone Verification'>
          <Chip
            label={selectedUser.isPhoneVerified ? "Verified" : "Not verified"}
            color={selectedUser.isPhoneVerified ? "success" : "default"}
            size='small'
          />
        </InfoRow>
      </Paper>

      {/* System Information */}
      <Paper sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography variant='h6' fontWeight={600} mb={1}>
          System Information
        </Typography>

        <Divider />

        <InfoRow label='User ID'>
          <Typography
            variant='body2'
            sx={{
              wordBreak: "break-all",
            }}
          >
            {selectedUser.id}
          </Typography>
        </InfoRow>

        <InfoRow label='Joined'>{formatDate(selectedUser.createdAt)}</InfoRow>
      </Paper>

      <UserStatusDialog
        open={Boolean(actionStatus)}
        user={selectedUser}
        targetStatus={actionStatus}
        loading={isActionLoading}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmStatusChange}
      />
    </Box>
  );
}

export default AdminUserDetailsPage;
