import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  fetchAdminUsers,
  updateAdminUserStatus,
  assignAdminRole,
  removeAdminRole,
  setUserStatusFilter,
  setUserPage,
  setUserLimit,
  clearUserActionError,
} from "../../features/admin/adminUserSlice";

import AdminUserTable from "../../components/admin/user/AdminUserTable";
import UserStatusDialog from "../../components/admin/user/UserStatusDialog";
import AdminRoleDialog from "../../components/admin/user/AdminRoleDialog";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  Alert,
  Button,
  TableRow,
} from "@mui/material";

function AdminUsersPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    users,
    pagination,
    filters,
    loading,
    actionLoadingType,
    actionLoadingId,
    error,
    actionError,
  } = useSelector((state) => state.adminUser);

  const currentUser = useSelector((state) => state.auth.user);

  const [actionUser, setActionUser] = useState(null);
  const [actionStatus, setActionStatus] = useState("");

  const [roleUser, setRoleUser] = useState(null);
  const [roleAction, setRoleAction] = useState("");

  useEffect(() => {
    dispatch(
      fetchAdminUsers({
        page: pagination.page,
        limit: pagination.limit,
        status: filters.status,
      }),
    );
  }, [dispatch, pagination.page, pagination.limit, filters.status]);

  const handleStatusFilterChange = (event) => {
    dispatch(setUserStatusFilter(event.target.value));
  };

  const handleStatusAction = (user, status) => {
    dispatch(clearUserActionError());

    setActionUser(user);
    setActionStatus(status);
  };

  const handleConfirmStatusChange = async () => {
    if (!actionUser || !actionStatus) {
      return;
    }

    const resultAction = await dispatch(
      updateAdminUserStatus({
        userId: actionUser.id,
        status: actionStatus,
      }),
    );

    if (updateAdminUserStatus.fulfilled.match(resultAction)) {
      setActionUser(null);
      setActionStatus("");

      dispatch(
        fetchAdminUsers({
          page: pagination.page,
          limit: pagination.limit,
          status: filters.status,
        }),
      );
    }
  };

  const handleRoleAction = (user, action) => {
    dispatch(clearUserActionError());

    setRoleUser(user);
    setRoleAction(action);
  };

  const handleConfirmRoleChange = async () => {
    if (!roleUser || !roleAction) {
      return;
    }

    let resultAction;

    if (roleAction === "ASSIGN") {
      resultAction = await dispatch(assignAdminRole(roleUser.id));
    }

    if (roleAction === "REMOVE") {
      resultAction = await dispatch(removeAdminRole(roleUser.id));
    }

    if (
      assignAdminRole.fulfilled.match(resultAction) ||
      removeAdminRole.fulfilled.match(resultAction)
    ) {
      setRoleUser(null);
      setRoleAction("");
    }
  };

  const handleCloseRoleDialog = () => {
    if (isRoleActionLoading) {
      return;
    }

    setRoleUser(null);
    setRoleAction("");

    dispatch(clearUserActionError());
  };

  const isRoleActionLoading =
    (actionLoadingType === "ASSIGN_ADMIN_ROLE" ||
      actionLoadingType === "REMOVE_ADMIN_ROLE") &&
    actionLoadingId === roleUser?.id;

  const isActionLoading =
    actionLoadingType === "UPDATE_USER_STATUS" &&
    actionLoadingId === actionUser?.id;

  const handleCloseDialog = () => {
    if (isActionLoading) {
      return;
    }

    setActionUser(null);
    setActionStatus("");
    dispatch(clearUserActionError());
  };

  const handleChangePage = (_, newPage) => {
    dispatch(setUserPage(newPage + 1));
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(setUserLimit(Number(event.target.value)));
  };

  const handleViewUser = (user) => {
    navigate(`/admin/users/${user.id}`);
  };

  return (
    <Box>
      {/* Page Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          mb: 3,
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Typography variant='h5' fontWeight={600}>
            Users
          </Typography>

          <Typography variant='body2' color='textSecondary'>
            Manage registered users and their account status.
          </Typography>
        </Box>

        <FormControl size='small' sx={{ minWidth: 180 }}>
          <InputLabel>Status</InputLabel>

          <Select
            value={filters.status}
            label='Status'
            onChange={handleStatusFilterChange}
          >
            <MenuItem value=''>All</MenuItem>
            <MenuItem value='ACTIVE'>Active</MenuItem>
            <MenuItem value='BLOCKED'>Blocked</MenuItem>
            <MenuItem value='SUSPENDED'>Suspended</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {/* Error */}
      {error && (
        <Alert severity='error' sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {/* Action Error */}
      {actionError && (
        <Alert
          severity='error'
          sx={{ mb: 2 }}
          onClose={() => dispatch(clearUserActionError())}
        >
          {actionError}
        </Alert>
      )}
      {/* User Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Joined</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <AdminUserTable
                users={users}
                currentUserId={currentUser?.id}
                loading={loading}
                actionLoadingId={actionLoadingId}
                onView={handleViewUser}
                onStatusAction={handleStatusAction}
                onRoleAction={handleRoleAction}
              />
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component='div'
          count={pagination.total}
          page={pagination.page - 1}
          rowsPerPage={pagination.limit}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 20, 50]}
        />
      </Paper>
      {/* Status Dialog */}
      <UserStatusDialog
        open={Boolean(actionUser)}
        user={actionUser}
        targetStatus={actionStatus}
        loading={isActionLoading}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmStatusChange}
      />

      <AdminRoleDialog
        open={Boolean(roleUser)}
        user={roleUser}
        action={roleAction}
        loading={isRoleActionLoading}
        onClose={handleCloseRoleDialog}
        onConfirm={handleConfirmRoleChange}
      />
    </Box>
  );
}

export default AdminUsersPage;
