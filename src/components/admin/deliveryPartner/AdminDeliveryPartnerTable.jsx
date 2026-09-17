import {
  Chip,
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import PauseCircleOutlinedIcon from "@mui/icons-material/PauseCircleOutlined";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";

function AdminDeliveryPartnerTable({
  applications,
  actionLoadingType,
  actionLoadingId,
  onView,
  onApprove,
  onReject,
  onSuspend,
  onUnsuspend,
}) {
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

  return (
    <>
      {applications.map((partner) => {
        const isApproving =
          actionLoadingType === "APPROVE_DELIVERY_PARTNER" &&
          actionLoadingId === partner.id;

        const isRejecting =
          actionLoadingType === "REJECT_DELIVERY_PARTNER" &&
          actionLoadingId === partner.id;

        const isSuspending =
          actionLoadingType === "SUSPEND_DELIVERY_PARTNER" &&
          actionLoadingId === partner.id;

        const isUnsuspending =
          actionLoadingType === "UNSUSPEND_DELIVERY_PARTNER" &&
          actionLoadingId === partner.id;

        const actionLoading =
          isApproving || isRejecting || isSuspending || isUnsuspending;

        const fullName = partner.user
          ? `${partner.user.firstName} ${partner.user.lastName}`
          : "Unknown";

        return (
          <TableRow
            key={partner.id}
            hover
            sx={{ cursor: "pointer" }}
            onClick={() => onView(partner.id)}
          >
            {/* Partner */}
            <TableCell>
              <Stack>
                <Typography variant='body2' fontWeight={600}>
                  {fullName}
                </Typography>

                <Typography variant='caption' color='text.secondary'>
                  {partner.user?.email || "No email"}
                </Typography>
              </Stack>
            </TableCell>

            {/* Contact */}
            <TableCell>
              <Typography variant='body2'>
                {partner.user?.phone || "No phone"}
              </Typography>
            </TableCell>

            {/* Vehicle */}
            <TableCell>
              <Stack spacing={0.25}>
                <Typography variant='body2' fontWeight={500}>
                  {partner.vehicleType}
                </Typography>

                <Typography variant='caption' color='text.secondary'>
                  {partner.vehicleNumber}
                </Typography>
              </Stack>
            </TableCell>

            {/* Status */}
            <TableCell>
              <Chip
                label={partner.status}
                color={getStatusColor(partner.status)}
                size='small'
              />
            </TableCell>

            {/* Online */}
            <TableCell>
              <Chip
                label={partner.isOnline ? "Online" : "Offline"}
                color={getOnlineColor(partner.isOnline)}
                size='small'
                variant={partner.isOnline ? "filled" : "outlined"}
              />
            </TableCell>

            {/* Availability */}
            <TableCell>
              <Chip
                label={partner.isAvailable ? "Available" : "Busy"}
                color={getAvailabilityColor(partner.isAvailable)}
                size='small'
                variant='outlined'
              />
            </TableCell>

            {/* Rating */}
            <TableCell>
              <Typography variant='body2'>
                ⭐ {partner.averageRating ?? "0.0"}
              </Typography>

              <Typography variant='caption' color='text.secondary'>
                {partner.totalReviews ?? 0} reviews
              </Typography>
            </TableCell>

            {/* Deliveries */}
            <TableCell>
              <Typography variant='body2'>
                {partner.totalDeliveries ?? 0}
              </Typography>
            </TableCell>

            {/* Joined */}
            <TableCell>
              <Typography variant='body2'>
                {new Date(partner.createdAt).toLocaleDateString()}
              </Typography>
            </TableCell>

            {/* Actions */}
            <TableCell onClick={(event) => event.stopPropagation()}>
              <Stack direction='row' spacing={0.5}>
                {/* View */}
                <Tooltip title='View details'>
                  <IconButton size='small' onClick={() => onView(partner.id)}>
                    <VisibilityIcon fontSize='small' />
                  </IconButton>
                </Tooltip>

                {/* Pending actions */}
                {partner.status === "PENDING" && (
                  <>
                    <Tooltip title='Approve'>
                      <span>
                        <IconButton
                          size='small'
                          color='success'
                          disabled={actionLoading}
                          onClick={() => onApprove(partner)}
                        >
                          <CheckIcon fontSize='small' />
                        </IconButton>
                      </span>
                    </Tooltip>

                    <Tooltip title='Reject'>
                      <span>
                        <IconButton
                          size='small'
                          color='error'
                          disabled={actionLoading}
                          onClick={() => onReject(partner)}
                        >
                          <CloseIcon fontSize='small' />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </>
                )}

                {/* Approved action */}
                {partner.status === "APPROVED" && (
                  <Tooltip title='Suspend'>
                    <span>
                      <IconButton
                        size='small'
                        color='warning'
                        disabled={actionLoading}
                        onClick={() => onSuspend(partner)}
                      >
                        <PauseCircleOutlinedIcon fontSize='small' />
                      </IconButton>
                    </span>
                  </Tooltip>
                )}

                {/* Suspended action */}
                {partner.status === "SUSPENDED" && (
                  <Tooltip title='Unsuspend'>
                    <span>
                      <IconButton
                        size='small'
                        color='success'
                        disabled={actionLoading}
                        onClick={() => onUnsuspend(partner)}
                      >
                        <PlayCircleOutlinedIcon fontSize='small' />
                      </IconButton>
                    </span>
                  </Tooltip>
                )}
              </Stack>
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
}

export default AdminDeliveryPartnerTable;
