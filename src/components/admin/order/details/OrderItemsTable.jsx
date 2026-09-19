import {
  Box,
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

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

function formatCurrency(value) {
  return `₹${Number(value ?? 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function OrderItemsTable({ items = [] }) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        border: 1,
        borderColor: "divider",
        boxShadow: "none",
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
        <Stack spacing={2}>
          <Stack direction='row' spacing={1} sx={{ alignItems: "center" }}>
            <ShoppingBagOutlinedIcon fontSize='small' color='action' />

            <Typography variant='h6' fontWeight={600}>
              Order Items
            </Typography>
          </Stack>

          <Divider />

          {!items.length ? (
            <Typography variant='body2' color='textSecondary'>
              No items found for this order.
            </Typography>
          ) : (
            <TableContainer
              sx={{
                overflowX: "auto",
              }}
            >
              <Table
                sx={{
                  minWidth: 650,
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell align='center'>Quantity</TableCell>
                    <TableCell align='right'>Unit Price</TableCell>
                    <TableCell align='right'>Total</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id} hover>
                      <TableCell>
                        <Stack
                          direction='row'
                          spacing={1.5}
                          sx={{ alignItems: "center" }}
                        >
                          {item.itemImageUrl ? (
                            <Box
                              component='img'
                              src={item.itemImageUrl}
                              alt={item.itemName}
                              sx={{
                                width: 48,
                                height: 48,
                                borderRadius: 2,
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <Box
                              sx={{
                                width: 48,
                                height: 48,
                                borderRadius: 2,
                                bgcolor: "action.hover",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                              }}
                            >
                              <ShoppingBagOutlinedIcon color='disabled' />
                            </Box>
                          )}

                          <Stack spacing={0.25}>
                            <Typography variant='body2' fontWeight={600}>
                              {item.itemName}
                            </Typography>

                            {item.itemDescription && (
                              <Typography
                                variant='caption'
                                color='textSecondary'
                                sx={{
                                  maxWidth: 350,
                                }}
                              >
                                {item.itemDescription}
                              </Typography>
                            )}
                          </Stack>
                        </Stack>
                      </TableCell>

                      <TableCell align='center'>
                        <Typography variant='body2' fontWeight={600}>
                          {item.quantity}
                        </Typography>
                      </TableCell>

                      <TableCell align='right'>
                        {formatCurrency(item.unitPrice)}
                      </TableCell>

                      <TableCell align='right'>
                        <Typography variant='body2' fontWeight={700}>
                          {formatCurrency(item.totalPrice)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default OrderItemsTable;
