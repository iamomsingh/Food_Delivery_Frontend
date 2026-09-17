import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";

import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";

import AdminDeliveryPartnerTable from "../../components/admin/deliveryPartner/AdminDeliveryPartnerTable";
import DeliveryPartnerActionDialog from "../../components/admin/deliveryPartner/DeliveryPartnerActionDialog";

import {
  fetchAdminDeliveryPartners,
  setDeliveryPartnerStatusFilter,
  setDeliveryPartnerPage,
  setDeliveryPartnerLimit,
  approveDeliveryPartner,
  rejectDeliveryPartner,
  suspendDeliveryPartner,
  unsuspendDeliveryPartner,
} from "../../features/admin/adminDeliveryPartnerSlice";

function AdminDeliveryPartnersPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    applications,
    pagination,
    filters,
    loading,
    error,
    actionLoadingType,
    actionLoadingId,
    actionError,
  } = useSelector((state) => state.adminDeliveryPartner);

  const [actionPartner, setActionPartner] = useState(null);
  const [actionType, setActionType] = useState(null);

  useEffect(() => {
    dispatch(
      fetchAdminDeliveryPartners({
        page: pagination.page,
        limit: pagination.limit,
        status: filters.status,
      }),
    );
  }, [dispatch, pagination.page, pagination.limit, filters.status]);

  // Status filter
  const handleStatusChange = (event) => {
    dispatch(setDeliveryPartnerStatusFilter(event.target.value));
  };

  const handleView = (partnerId) => {
    navigate(`/admin/delivery-partners/${partnerId}`);
  };

  const openActionDialog = (partner, type) => {
    setActionPartner(partner);
    setActionType(type);
  };

  const closeActionDialog = () => {
    setActionPartner(null);
    setActionType(null);
  };

  // Confirm acion
  const handleActionConfirm = async () => {
    if (!actionPartner || !actionType) {
      return;
    }

    let result;

    switch (actionType) {
      case "APPROVE":
        result = await dispatch(approveDeliveryPartner(actionPartner.id));
        break;

      case "REJECT":
        result = await dispatch(rejectDeliveryPartner(actionPartner.id));
        break;

      case "SUSPEND":
        result = await dispatch(suspendDeliveryPartner(actionPartner.id));
        break;

      case "UNSUSPEND":
        result = await dispatch(unsuspendDeliveryPartner(actionPartner.id));
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
      closeActionDialog();

      dispatch(
        fetchAdminDeliveryPartners({
          page: pagination.page,
          limit: pagination.limit,
          status: filters.status,
        }),
      );
    }
  };

  const handlePageChange = (_, newPage) => {
    dispatch(setDeliveryPartnerPage(newPage + 1));
  };

  const handleRowsPerPageChange = (event) => {
    const newLimit = Number(event.target.value);

    dispatch(setDeliveryPartnerLimit(newLimit));
  };

  return (
    <Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          mb: 3,
          justifyContent: "space-between",
          alignItems: {
            xs: "stretch",
            sm: "center",
          },
        }}
      >
        <Box>
          <Typography variant='h5' fontWeight={600}>
            Delivery Partners
          </Typography>

          <Typography variant='body2' color='textSecondary' sx={{ mt: 0.5 }}>
            Review and manage delivery partner applications.
          </Typography>
        </Box>

        <FormControl
          size='small'
          sx={{
            minWidth: {
              xs: "100%",
              sm: 180,
            },
          }}
        >
          <InputLabel id='delivery-partner-status-label'>Status</InputLabel>

          <Select
            labelId='delivery-partner-status-label'
            value={filters.status}
            label='Status'
            onChange={handleStatusChange}
          >
            <MenuItem value=''>All Delivery Partners</MenuItem>
            <MenuItem value='PENDING'>Pending</MenuItem>
            <MenuItem value='APPROVED'>Approved</MenuItem>
            <MenuItem value='REJECTED'>Rejected</MenuItem>
            <MenuItem value='SUSPENDED'>Suspended</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      {error && (
        <Alert severity='error' sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {actionError && (
        <Alert severity='error' sx={{ mb: 2 }}>
          {actionError}
        </Alert>
      )}
      {loading && <Loader />}
      {!loading && applications.length === 0 && (
        <EmptyState
          title='No delivery partners found'
          description={
            filters.status
              ? `No ${filters.status.toLowerCase()} delivery partners found.`
              : "There are no delivery partners to display."
          }
        />
      )}
      {!loading && applications.length > 0 && (
        <Paper variant='outlined' elevation={0}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Partner</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Vehicle</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Online</TableCell>
                  <TableCell>Availability</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Deliveries</TableCell>
                  <TableCell>Joined</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <AdminDeliveryPartnerTable
                  applications={applications}
                  actionLoadingType={actionLoadingType}
                  actionLoadingId={actionLoadingId}
                  onView={handleView}
                  onApprove={(partner) => openActionDialog(partner, "APPROVE")}
                  onReject={(partner) => openActionDialog(partner, "REJECT")}
                  onSuspend={(partner) => openActionDialog(partner, "SUSPEND")}
                  onUnsuspend={(partner) =>
                    openActionDialog(partner, "UNSUSPEND")
                  }
                />
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component='div'
            count={pagination.total}
            page={pagination.page - 1}
            rowsPerPage={pagination.limit}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            rowsPerPageOptions={[5, 10, 20, 50]}
          />
        </Paper>
      )}

      <DeliveryPartnerActionDialog
        open={Boolean(actionPartner)}
        partner={actionPartner}
        actionType={actionType}
        loading={actionLoadingId === actionPartner?.id}
        onClose={closeActionDialog}
        onConfirm={handleActionConfirm}
      />
    </Box>
  );
}

export default AdminDeliveryPartnersPage;
