import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Alert,
  Box,
  Button,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";

import {
  fetchDeliveryOrderDetails,
  pickupOrder,
  outForDelivery,
  deliverOrder,
} from "../../features/delivery/deliveryOrderSlice";

import DeliveryOrderHeader from "../../components/delivery/order/details/DeliveryOrderHeader";
import DeliveryRestaurantCard from "../../components/delivery/order/details/DeliveryRestaurantCard";
import DeliveryCustomerCard from "../../components/delivery/order/details/DeliveryCustomerCard";
import DeliveryAddressCard from "../../components/delivery/order/details/DeliveryAddressCard";
import DeliveryItemsTable from "../../components/delivery/order/details/DeliveryItemsTable";
import DeliveryPricingCard from "../../components/delivery/order/details/DeliveryPricingCard";
import DeliveryAssignmentTimeline from "../../components/delivery/order/details/DeliveryAssignmentTimeline";
import DeliveryOrderAction from "../../components/delivery/order/details/DeliveryOrderAction";

function DeliveryOrderDetailsPage() {
  const { orderId } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    selectedOrder,
    orderDetailsLoading,
    orderDetailsError,
    actionLoading,
    actionError,
  } = useSelector((state) => state.deliveryOrder);

  const loadOrder = () => {
    if (orderId) {
      dispatch(fetchDeliveryOrderDetails(orderId));
    }
  };

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  const handleAction = async () => {
    if (!selectedOrder?.order) {
      return;
    }

    const status = selectedOrder.order.status;

    let action;

    switch (status) {
      case "READY_FOR_PICKUP":
        action = pickupOrder;
        break;

      case "PICKED_UP":
        action = outForDelivery;
        break;

      case "OUT_FOR_DELIVERY":
        action = deliverOrder;
        break;

      default:
        return;
    }

    const result = await dispatch(action(orderId));

    if (action.fulfilled.match(result)) {
      loadOrder();
    }
  };

  if (orderDetailsLoading) {
    return (
      <Stack spacing={3}>
        <Skeleton variant='rounded' height={100} />

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Skeleton variant='rounded' height={180} />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Skeleton variant='rounded' height={180} />
          </Grid>

          <Grid size={12}>
            <Skeleton variant='rounded' height={220} />
          </Grid>

          <Grid size={{ xs: 12, lg: 8 }}>
            <Skeleton variant='rounded' height={350} />
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>
            <Skeleton variant='rounded' height={350} />
          </Grid>
        </Grid>
      </Stack>
    );
  }

  if (orderDetailsError) {
    return (
      <Stack spacing={2}>
        <Button
          startIcon={<ArrowBackOutlinedIcon />}
          onClick={() => navigate("/delivery/orders")}
          sx={{ alignSelf: "flex-start" }}
        >
          Back to Orders
        </Button>

        <Alert severity='error'>{orderDetailsError}</Alert>

        <Button
          variant='outlined'
          startIcon={<RefreshOutlinedIcon />}
          onClick={loadOrder}
          sx={{ alignSelf: "flex-start" }}
        >
          Try Again
        </Button>
      </Stack>
    );
  }

  if (!selectedOrder) {
    return null;
  }

  const { order, restaurant, customer, deliveryAddress, assignment, items } =
    selectedOrder;

  return (
    <Stack spacing={3}>
      {/* Page header */}
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
          startIcon={<ArrowBackOutlinedIcon />}
          onClick={() => navigate("/delivery/orders")}
          sx={{
            alignSelf: {
              xs: "flex-start",
              sm: "center",
            },
          }}
        >
          Back to Orders
        </Button>

        <Button
          variant='outlined'
          startIcon={<RefreshOutlinedIcon />}
          onClick={loadOrder}
          disabled={orderDetailsLoading}
          sx={{
            alignSelf: {
              xs: "flex-start",
              sm: "center",
            },
          }}
        >
          Refresh
        </Button>
      </Stack>

      {/* Header */}
      <DeliveryOrderHeader order={order} />

      {/* Restaurant + Customer */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <DeliveryRestaurantCard restaurant={restaurant} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <DeliveryCustomerCard customer={customer} />
        </Grid>
      </Grid>

      {/* Address */}
      <DeliveryAddressCard address={deliveryAddress} />

      {/* Items + Pricing */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <DeliveryItemsTable items={items} />
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <DeliveryPricingCard order={order} />
        </Grid>
      </Grid>

      {/* Timeline + Action */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <DeliveryAssignmentTimeline assignment={assignment} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <DeliveryOrderAction
            status={order.status}
            loading={actionLoading}
            error={actionError}
            onAction={handleAction}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}

export default DeliveryOrderDetailsPage;
