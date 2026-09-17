import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

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

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function AdminUserTable({
  users,
  currentUserId,
  loading,
  actionLoadingId,
  onView,
  onStatusAction,
}) {
  if (loading) {
    return (
      <TableRow>
        <TableCell colSpan={9} align='center'>
          <Box
            sx={{
              py: 6,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        </TableCell>
      </TableRow>
    );
  }

  if (!users.length) {
    return (
      <TableRow>
        <TableCell colSpan={9} align='center'>
          <Box sx={{ py: 6 }}>
            <Typography color='text.secondary'>No users found.</Typography>
          </Box>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {users.map((user) => {
        const isCurrentAdmin = user.id === currentUserId;

        const isActionLoading = actionLoadingId === user.id;

        return (
          <TableRow
            key={user.id}
            hover
            sx={{
              cursor: "pointer",
            }}
            onClick={() => onView(user)}
          >
            {/* User */}
            <TableCell>
              <Stack direction='row' spacing={1.5} alignItems='center'>
                {user.profileImageUrl ? (
                  <Box
                    component='img'
                    src={user.profileImageUrl}
                    alt={`${user.firstName} ${user.lastName}`}
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "action.hover",
                      fontWeight: 600,
                    }}
                  >
                    {user.firstName?.charAt(0)?.toUpperCase()}
                  </Box>
                )}

                <Box>
                  <Typography fontWeight={600}>
                    {user.firstName} {user.lastName}
                  </Typography>

                  {isCurrentAdmin && (
                    <Typography variant='caption' color='textSecondary'>
                      You
                    </Typography>
                  )}
                </Box>
              </Stack>
            </TableCell>

            {/* Email */}
            <TableCell>
              <Typography variant='body2'>{user.email}</Typography>
            </TableCell>

            {/* Phone */}
            <TableCell>{user.phone || "—"}</TableCell>

            {/* Status */}
            <TableCell>
              <Chip
                label={user.status}
                color={getStatusColor(user.status)}
                size='small'
              />
            </TableCell>

            {/* Joined */}
            <TableCell>{formatDate(user.createdAt)}</TableCell>

            {/* Actions */}
            <TableCell
              align='right'
              onClick={(event) => event.stopPropagation()}
            >
              <Stack direction='row' spacing={1} justifyContent='flex-end'>
                <Button
                  size='small'
                  variant='outlined'
                  onClick={() => onView(user)}
                >
                  View
                </Button>

                {!isCurrentAdmin && (
                  <>
                    {user.status !== "ACTIVE" && (
                      <Button
                        size='small'
                        variant='outlined'
                        color='success'
                        disabled={isActionLoading}
                        onClick={() => onStatusAction(user, "ACTIVE")}
                      >
                        {isActionLoading ? (
                          <CircularProgress size={16} />
                        ) : (
                          "Activate"
                        )}
                      </Button>
                    )}

                    {user.status === "ACTIVE" && (
                      <>
                        <Button
                          size='small'
                          variant='outlined'
                          color='warning'
                          disabled={isActionLoading}
                          onClick={() => onStatusAction(user, "SUSPENDED")}
                        >
                          {isActionLoading ? (
                            <CircularProgress size={16} />
                          ) : (
                            "Suspend"
                          )}
                        </Button>

                        <Button
                          size='small'
                          variant='outlined'
                          color='error'
                          disabled={isActionLoading}
                          onClick={() => onStatusAction(user, "BLOCKED")}
                        >
                          {isActionLoading ? (
                            <CircularProgress size={16} />
                          ) : (
                            "Block"
                          )}
                        </Button>
                      </>
                    )}
                  </>
                )}
              </Stack>
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
}

export default AdminUserTable;
