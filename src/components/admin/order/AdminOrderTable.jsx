import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const STATUS_CONFIG = {
  PLACED: {
    label: "Placed",
    color: "info",
  },
  ACCEPTED: {
    label: "Accepted",
    color: "primary",
  },
  PREPARING: {
    label: "Preparing",
    color: "warning",
  },
  READY_FOR_PICKUP: {
    label: "Ready for Pickup",
    color: "warning",
  },
  PICKED_UP: {
    label: "Picked Up",
    color: "info",
  },
  OUT_FOR_DELIVERY: {
    label: "Out for Delivery",
    color: "secondary",
  },
  DELIVERED: {
    label: "Delivered",
    color: "success",
  },
  CANCELLED: {
    label: "Cancelled",
    color: "error",
  },
  REJECTED: {
    label: "Rejected",
    color: "error",
  },
};

const PAYMENT_STATUS_CONFIG = {
  PENDING: {
    label: "Pending",
    color: "warning",
  },
  PAID: {
    label: "Paid",
    color: "success",
  },
};

function formatCurrency(value) {
  return `₹${Number(value ?? 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatDate(value) {
  if (!value) return "—";

  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getInitials(firstName, lastName) {
  return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
}

function formatOrderId(id) {
  if (!id) return "—";

  return `#${id.slice(0, 8)}`;
}

function AdminOrderTable({ orders, loading, onView }) {
  if (loading) {
    return (
      <Paper
        sx={{
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <TableContainer>
          <Table>
            <TableBody>
              {Array.from({ length: 6 }).map((_, index) => (
                <TableRow key={index}>
                  {Array.from({ length: 8 }).map((_, cellIndex) => (
                    <TableCell key={cellIndex}>
                      <Skeleton
                        variant='text'
                        width={cellIndex === 1 ? 140 : 90}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  }

  if (!orders.length) {
    return (
      <Paper
        sx={{
          borderRadius: 3,
          p: 6,
          textAlign: "center",
        }}
      >
        <Typography variant='h6' fontWeight={600}>
          No orders found
        </Typography>

        <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
          Try changing or resetting your filters.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      sx={{
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <TableContainer
        sx={{
          overflowX: "auto",
        }}
      >
        <Table
          sx={{
            minWidth: 1050,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Order</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Restaurant</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Placed At</TableCell>
              <TableCell align='right'>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map((order) => {
              const status = STATUS_CONFIG[order.status] ?? {
                label: order.status,
                color: "default",
              };

              const paymentStatus = PAYMENT_STATUS_CONFIG[
                order.paymentStatus
              ] ?? {
                label: order.paymentStatus,
                color: "default",
              };

              return (
                <TableRow
                  key={order.id}
                  hover
                  sx={{
                    "&:last-child td": {
                      borderBottom: 0,
                    },
                  }}
                >
                  {/* Order */}
                  <TableCell>
                    <Stack spacing={0.25}>
                      <Typography variant='body2' fontWeight={700}>
                        {formatOrderId(order.id)}
                      </Typography>

                      <Typography variant='caption' color='textSecondary'>
                        Order ID
                      </Typography>
                    </Stack>
                  </TableCell>

                  {/* Customer */}
                  <TableCell>
                    <Stack direction='row' spacing={1.25} alignItems='center'>
                      <Avatar
                        sx={{
                          width: 36,
                          height: 36,
                          fontSize: 14,
                        }}
                      >
                        {getInitials(
                          order.customer?.firstName,
                          order.customer?.lastName,
                        )}
                      </Avatar>

                      <Box>
                        <Typography variant='body2' fontWeight={600}>
                          {order.customer?.firstName} {order.customer?.lastName}
                        </Typography>

                        <Typography variant='caption' color='textSecondary'>
                          Customer
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>

                  {/* Restaurant */}
                  <TableCell>
                    <Typography variant='body2' fontWeight={600}>
                      {order.restaurant?.name ?? "—"}
                    </Typography>
                  </TableCell>

                  {/* Amount */}
                  <TableCell>
                    <Typography variant='body2' fontWeight={700}>
                      {formatCurrency(order.totalAmount)}
                    </Typography>
                  </TableCell>

                  {/* Payment */}
                  <TableCell>
                    <Stack spacing={0.5} alignItems='flex-start'>
                      <Typography variant='body2' fontWeight={600}>
                        {order.paymentMethod ?? "—"}
                      </Typography>

                      <Chip
                        size='small'
                        label={paymentStatus.label}
                        color={paymentStatus.color}
                        variant='outlined'
                      />
                    </Stack>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Chip
                      size='small'
                      label={status.label}
                      color={status.color}
                      variant='outlined'
                    />
                  </TableCell>

                  {/* Date */}
                  <TableCell>
                    <Typography variant='body2' color='text.secondary'>
                      {formatDate(order.placedAt)}
                    </Typography>
                  </TableCell>

                  {/* Action */}
                  <TableCell align='right'>
                    <Tooltip title='View order'>
                      <IconButton size='small' onClick={() => onView(order.id)}>
                        <VisibilityOutlinedIcon fontSize='small' />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default AdminOrderTable;
