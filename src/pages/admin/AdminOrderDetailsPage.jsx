import { useEffect } from "react";

import { Alert, Box, Button, Grid, Stack, Typography } from "@mui/material";

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  clearSelectedOrder,
  fetchAdminOrderDetails,
} from "../../features/admin/adminOrderSlice";

import OrderDetailsHeader from "../../components/admin/order/details/OrderDetailsHeader";
import OrderCustomerCard from "../../components/admin/order/details/OrderCustomerCard";
import OrderRestaurantCard from "../../components/admin/order/details/OrderRestaurantCard";
import OrderDeliveryCard from "../../components/admin/order/details/OrderDeliveryCard";
import OrderItemsTable from "../../components/admin/order/details/OrderItemsTable";
import OrderPricingCard from "../../components/admin/order/details/OrderPricingCard";
import OrderTimeline from "../../components/admin/order/details/OrderTimeline";
import OrderDeliveryPartnerCard from "../../components/admin/order/details/OrderDeliveryPartnerCard";

function AdminOrderDetailsPage() {
  const { orderId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedOrder, detailLoading, detailError } = useSelector(
    (state) => state.adminOrder,
  );

  useEffect(() => {
    if (orderId) {
      dispatch(fetchAdminOrderDetails(orderId));
    }

    return () => {
      dispatch(clearSelectedOrder());
    };
  }, [dispatch, orderId]);

  const handleBack = () => {
    navigate("/admin/orders");
  };

  const handleRefresh = () => {
    if (orderId) {
      dispatch(fetchAdminOrderDetails(orderId));
    }
  };

  return (
    <Box>
      <Stack spacing={3}>
        {/* Top navigation */}
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: {
              xs: "stretch",
              sm: "center",
            },
          }}
        >
          <Button
            variant='text'
            startIcon={<ArrowBackOutlinedIcon />}
            onClick={handleBack}
            sx={{
              alignSelf: "flex-start",
            }}
          >
            Back to Orders
          </Button>

          <Button
            variant='outlined'
            startIcon={<RefreshOutlinedIcon />}
            onClick={handleRefresh}
            disabled={detailLoading}
          >
            {detailLoading ? "Refreshing..." : "Refresh"}
          </Button>
        </Stack>

        {detailError && <Alert severity='error'>{detailError}</Alert>}

        {detailLoading && (
          <Typography color='text.secondary'>
            Loading order details...
          </Typography>
        )}

        {selectedOrder && (
          <>
            <OrderDetailsHeader order={selectedOrder} />

            {selectedOrder.cancellationReason && (
              <Alert severity='error' sx={{ borderRadius: 3 }}>
                <Typography variant='body2' fontWeight={600}>
                  Cancellation Reason
                </Typography>

                <Typography variant='body2' sx={{ mt: 0.5 }}>
                  {selectedOrder.cancellationReason}
                </Typography>
              </Alert>
            )}

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, lg: 6 }}>
                <OrderCustomerCard customer={selectedOrder.customer} />
              </Grid>

              <Grid size={{ xs: 12, lg: 6 }}>
                <OrderRestaurantCard restaurant={selectedOrder.restaurant} />
              </Grid>

              <Grid size={{ xs: 12, lg: 8 }}>
                <OrderDeliveryCard delivery={selectedOrder.delivery} />
              </Grid>

              <Grid size={{ xs: 12, lg: 4 }}>
                <OrderDeliveryPartnerCard
                  deliveryPartner={selectedOrder.deliveryPartner}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <OrderItemsTable items={selectedOrder.items} />
              </Grid>

              <Grid size={{ xs: 12, lg: 7 }}>
                <OrderTimeline
                  status={selectedOrder.status}
                  statusLogs={selectedOrder.statusLogs}
                />
              </Grid>

              <Grid size={{ xs: 12, lg: 5 }}>
                <OrderPricingCard pricing={selectedOrder.pricing} />
              </Grid>
            </Grid>
          </>
        )}
      </Stack>
    </Box>
  );
}

export default AdminOrderDetailsPage;
