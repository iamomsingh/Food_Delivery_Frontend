import {
  Card,
  CardContent,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

function DeliveryItemsTable({ items = [] }) {
  return (
    <Card
      elevation={0}
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 3,
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Stack spacing={2}>
          <Typography variant='h6' fontWeight={700}>
            Order Items
          </Typography>

          <Divider />

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell align='center'>Qty</TableCell>
                  <TableCell align='right'>Unit Price</TableCell>
                  <TableCell align='right'>Total</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Typography variant='body2' fontWeight={600}>
                        {item.itemName}
                      </Typography>

                      {item.itemDescription && (
                        <Typography variant='caption' color='textSecondary'>
                          {item.itemDescription}
                        </Typography>
                      )}
                    </TableCell>

                    <TableCell align='center'>{item.quantity}</TableCell>

                    <TableCell align='right'>
                      ₹{Number(item.unitPrice).toFixed(2)}
                    </TableCell>

                    <TableCell align='right'>
                      <Typography fontWeight={600}>
                        ₹{Number(item.totalPrice).toFixed(2)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default DeliveryItemsTable;
