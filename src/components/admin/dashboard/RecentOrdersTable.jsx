import {
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

function RecentOrdersTable({ orders }) {
  return (
    <Card>
      <CardContent>
        <Typography variant='h6' fontWeight={600} mb={2}>
          Recent Orders
        </Typography>

        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>Customer</TableCell>
                <TableCell>Restaurant</TableCell>
                <TableCell>Payment</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align='right'>Amount</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {!orders?.length ? (
                <TableRow>
                  <TableCell colSpan={5} align='center'>
                    No recent orders.
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      {order.customer?.firstName} {order.customer?.lastName}
                    </TableCell>

                    <TableCell>{order.restaurant?.name ?? "—"}</TableCell>

                    <TableCell>{order.paymentMethod ?? "—"}</TableCell>

                    <TableCell>
                      <Chip
                        label={order.status}
                        size='small'
                        variant='outlined'
                      />
                    </TableCell>

                    <TableCell align='right'>
                      ₹
                      {Number(order.totalAmount).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}

export default RecentOrdersTable;
