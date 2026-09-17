import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import PauseCircleOutlinedIcon from "@mui/icons-material/PauseCircleOutlined";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";

import Loader from "../../components/common/Loader";
import DeliveryPartnerActionDialog from "../../components/admin/deliveryPartner/DeliveryPartnerActionDialog";

import {
  approveDeliveryPartner,
  clearSelectedDeliveryPartner,
  fetchAdminDeliveryPartnerDetails,
  rejectDeliveryPartner,
  suspendDeliveryPartner,
  unsuspendDeliveryPartner,
} from "../../features/admin/adminDeliveryPartnerSlice";

function AdminDeliveryPartnerDetailsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { partnerId } = useParams();

  const {
    selectedPartner,
    detailLoading,
    detailError,
    actionLoadingType,
    actionLoadingId,
    actionError,
  } = useSelector((state) => state.adminDeliveryPartner);

  const [actionType, setActionType] = useState(null);

  useEffect(() => {
    if (partnerId) {
      dispatch(fetchAdminDeliveryPartnerDetails(partnerId));
    }

    return () => {
      dispatch(clearSelectedDeliveryPartner());
    };
  }, [dispatch, partnerId]);

  const getStatusColor = (status) => {
    switch (status) {
      case "APPROVED":
        return "success";

      case "PENDING":
        return "warning";

      case "REJECTED":
        return "error";

      case "SUSPENDED":
        return "error";

      default:
        return "default";
    }
  };

  const getOnlineColor = (isOnline) => {
    return isOnline ? "success" : "default";
  };

  const getAvailabilityColor = (isAvailable) => {
    return isAvailable ? "success" : "warning";
  };

  const handleOpenAction = (type) => {
    setActionType(type);
  };

  const handleCloseAction = () => {
    setActionType(null);
  };

  const handleConfirmAction = async () => {
    if (!partnerId || !actionType) {
      return;
    }

    let result;

    switch (actionType) {
      case "APPROVE":
        result = await dispatch(approveDeliveryPartner(partnerId));
        break;

      case "REJECT":
        result = await dispatch(rejectDeliveryPartner(partnerId));
        break;

      case "SUSPEND":
        result = await dispatch(suspendDeliveryPartner(partnerId));
        break;

      case "UNSUSPEND":
        result = await dispatch(unsuspendDeliveryPartner(partnerId));
        break;

      default:
        return;
    }

    const actionMap = {
      APPROVE: approveDeliveryPartner,
      REJECT: rejectDeliveryPartner,
      SUSPEND: suspendDeliveryPartner,
      UNSUSPEND: unsuspendDeliveryPartner,
    };

    if (actionMap[actionType].fulfilled.match(result)) {
      setActionType(null);

      dispatch(fetchAdminDeliveryPartnerDetails(partnerId));
    }
  };

  if (detailLoading) {
    return <Loader />;
  }

  if (detailError) {
    return <Alert severity='error'>{detailError}</Alert>;
  }

  if (!selectedPartner) {
    return <Alert severity='info'>Delivery partner not found.</Alert>;
  }

  const partner = selectedPartner;

  const fullName = partner.user
    ? `${partner.user.firstName} ${partner.user.lastName}`
    : "Unknown";

  const actionLoading = actionLoadingId === partner.id;

  return (
    <Box>
      <Stack direction='row' alignItems='center' spacing={2} sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/admin/delivery-partners")}
        >
          Partners
        </Button>
      </Stack>

      <Typography variant='h4' fontWeight={700} sx={{ mb: 3 }}>
        Delivery Partner Details
      </Typography>

      <Paper
        variant='outlined'
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 3,
        }}
      >
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={2}
          sx={{
            alignItems: {
              xs: "flex-start",
              sm: "center",
            },
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant='h5' fontWeight={600}>
              {fullName}
            </Typography>

            <Typography variant='body2' color='textSecondary' sx={{ mt: 0.5 }}>
              Delivery Partner
            </Typography>
          </Box>

          <Stack direction='row' spacing={1} flexWrap='wrap'>
            <Chip
              label={partner.status}
              color={getStatusColor(partner.status)}
            />
          </Stack>
        </Stack>

        {/*-----------------------*/}
        {/* Action Buttons        */}
        {/*-----------------------*/}

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={1}
          sx={{ mt: 3 }}
        >
          {partner.status === "PENDING" && (
            <>
              <Button
                variant='contained'
                color='success'
                startIcon={<CheckIcon />}
                disabled={actionLoading}
                onClick={() => handleOpenAction("APPROVE")}
              >
                Approve
              </Button>

              <Button
                variant='outlined'
                color='error'
                startIcon={<CloseIcon />}
                disabled={actionLoading}
                onClick={() => handleOpenAction("REJECT")}
              >
                Reject
              </Button>
            </>
          )}

          {partner.status === "APPROVED" && (
            <Button
              variant='outlined'
              color='warning'
              startIcon={<PauseCircleOutlinedIcon />}
              disabled={actionLoading}
              onClick={() => handleOpenAction("SUSPEND")}
            >
              Suspend
            </Button>
          )}

          {partner.status === "SUSPENDED" && (
            <Button
              variant='contained'
              color='success'
              startIcon={<PlayCircleOutlinedIcon />}
              disabled={actionLoading}
              onClick={() => handleOpenAction("UNSUSPEND")}
            >
              Unsuspend
            </Button>
          )}
        </Stack>

        {actionError && (
          <Alert severity='error' sx={{ mt: 2 }}>
            {actionError}
          </Alert>
        )}
      </Paper>

      {/* ------------------------------------------ */}
      {/* Partner Information                        */}
      {/* ------------------------------------------ */}

      <Paper
        variant='outlined'
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 3,
        }}
      >
        <Typography variant='h6' fontWeight={600} sx={{ mb: 2 }}>
          Partner Information
        </Typography>

        <Stack spacing={1.5}>
          <InfoRow label='First Name' value={partner.user?.firstName} />

          <InfoRow label='Last Name' value={partner.user?.lastName} />

          <InfoRow label='Email' value={partner.user?.email} />

          <InfoRow label='Phone' value={partner.user?.phone} />
        </Stack>
      </Paper>

      {/* ------------------------------------------ */}
      {/* Vehicle Information                        */}
      {/* ------------------------------------------ */}

      <Paper
        variant='outlined'
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 3,
        }}
      >
        <Typography variant='h6' fontWeight={600} sx={{ mb: 2 }}>
          Vehicle Information
        </Typography>

        <Stack spacing={1.5}>
          <InfoRow label='Vehicle Type' value={partner.vehicleType} />

          <InfoRow label='Vehicle Number' value={partner.vehicleNumber} />
        </Stack>
      </Paper>

      {/* ------------------------------------------ */}
      {/* Current Status                             */}
      {/* ------------------------------------------ */}

      <Paper
        variant='outlined'
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 3,
        }}
      >
        <Typography variant='h6' fontWeight={600} sx={{ mb: 2 }}>
          Current Status
        </Typography>

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={2}
        >
          <StatusBox
            label='Status'
            value={partner.status}
            color={getStatusColor(partner.status)}
          />

          <StatusBox
            label='Online'
            value={partner.isOnline ? "Online" : "Offline"}
            color={getOnlineColor(partner.isOnline)}
          />

          <StatusBox
            label='Availability'
            value={partner.isAvailable ? "Available" : "Busy"}
            color={getAvailabilityColor(partner.isAvailable)}
          />
        </Stack>
      </Paper>

      {/* ------------------------------------------ */}
      {/* Performance                               */}
      {/* ------------------------------------------ */}

      <Paper
        variant='outlined'
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 3,
        }}
      >
        <Typography variant='h6' fontWeight={600} sx={{ mb: 2 }}>
          Performance
        </Typography>

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={2}
        >
          <StatBox
            label='Average Rating'
            value={`⭐ ${partner.averageRating ?? "0.0"}`}
          />

          <StatBox label='Total Reviews' value={partner.totalReviews ?? 0} />

          <StatBox
            label='Total Deliveries'
            value={partner.totalDeliveries ?? 0}
          />
        </Stack>
      </Paper>

      {/* ------------------------------------------ */}
      {/* System Information                         */}
      {/* ------------------------------------------ */}

      <Paper variant='outlined' sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography variant='h6' fontWeight={600} sx={{ mb: 2 }}>
          System Information
        </Typography>

        <Stack spacing={1.5}>
          <InfoRow label='Partner ID' value={partner.id} />

          <InfoRow label='User ID' value={partner.userId} />

          <InfoRow label='Created At' value={formatDate(partner.createdAt)} />

          <InfoRow label='Updated At' value={formatDate(partner.updatedAt)} />

          <InfoRow
            label='Deleted At'
            value={
              partner.deletedAt ? formatDate(partner.deletedAt) : "Not deleted"
            }
          />
        </Stack>
      </Paper>

      {/* ------------------------------------------ */}
      {/* Action Confirmation Dialog                */}
      {/* ------------------------------------------ */}

      <DeliveryPartnerActionDialog
        open={Boolean(actionType)}
        partner={partner}
        actionType={actionType}
        loading={actionLoading}
        onClose={handleCloseAction}
        onConfirm={handleConfirmAction}
      />
    </Box>
  );
}

/* ---------------------------------------------- */
/* Small reusable components                      */
/* ---------------------------------------------- */

function InfoRow({ label, value }) {
  return (
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      spacing={{
        xs: 0.25,
        sm: 2,
      }}
    >
      <Typography
        variant='body2'
        color='text.secondary'
        sx={{
          width: {
            sm: 160,
          },
          flexShrink: 0,
        }}
      >
        {label}
      </Typography>

      <Typography
        variant='body2'
        sx={{
          wordBreak: "break-word",
        }}
      >
        {value || "N/A"}
      </Typography>
    </Stack>
  );
}

function StatusBox({ label, value, color }) {
  return (
    <Paper
      variant='outlined'
      sx={{
        p: 2,
        flex: 1,
      }}
    >
      <Typography variant='caption' color='text.secondary'>
        {label}
      </Typography>

      <Box sx={{ mt: 0.75 }}>
        <Chip label={value} color={color} size='small' />
      </Box>
    </Paper>
  );
}

function StatBox({ label, value }) {
  return (
    <Paper
      variant='outlined'
      sx={{
        p: 2,
        flex: 1,
      }}
    >
      <Typography variant='caption' color='text.secondary'>
        {label}
      </Typography>

      <Typography variant='h6' fontWeight={600} sx={{ mt: 0.5 }}>
        {value}
      </Typography>
    </Paper>
  );
}

function formatDate(value) {
  if (!value) {
    return "N/A";
  }

  return new Date(value).toLocaleString();
}

export default AdminDeliveryPartnerDetailsPage;
