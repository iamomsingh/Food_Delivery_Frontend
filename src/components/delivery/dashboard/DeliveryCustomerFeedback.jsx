import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Rating,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";

import { fetchMyDeliveryReviews } from "../../../features/review/reviewSlice";

function formatReviewDate(date) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getCustomerName(customer) {
  if (!customer) return "Customer";

  return (
    [customer.firstName, customer.lastName].filter(Boolean).join(" ") ||
    "Customer"
  );
}

function getInitials(name) {
  if (!name || name === "Customer") return "C";

  const parts = name.split(" ");

  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

function DeliveryCustomerFeedback({ deliveryPartnerId, onViewAll }) {
  const dispatch = useDispatch();

  const {
    myDeliveryReviews,
    myDeliveryReviewsLoading,
    myDeliveryReviewsError,
  } = useSelector((state) => state.review);

  useEffect(() => {
    if (!deliveryPartnerId) return;

    dispatch(
      fetchMyDeliveryReviews({
        deliveryPartnerId,
        page: 1,
        limit: 3,
      }),
    );
  }, [dispatch, deliveryPartnerId]);

  if (!deliveryPartnerId) {
    return null;
  }

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Stack spacing={2.5}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            sx={{
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
            }}
            gap={2}
          >
            <Box>
              <Stack direction='row' spacing={1} sx={{ alignItems: "center" }}>
                <RateReviewOutlinedIcon color='primary' />

                <Typography variant='h6' fontWeight={700}>
                  Customer Feedback
                </Typography>
              </Stack>

              <Typography
                variant='body2'
                color='textSecondary'
                sx={{ mt: 0.5 }}
              >
                Recent feedback from your customers
              </Typography>
            </Box>

            {myDeliveryReviews.length > 0 && (
              <Button variant='outlined' size='small' onClick={onViewAll}>
                View All
              </Button>
            )}
          </Stack>

          {myDeliveryReviewsError && (
            <Typography color='error'>{myDeliveryReviewsError}</Typography>
          )}

          {myDeliveryReviewsLoading && (
            <Stack spacing={2}>
              {[1, 2, 3].map((item) => (
                <Stack
                  key={item}
                  direction='row'
                  spacing={2}
                  sx={{ alignItems: "center" }}
                >
                  <Skeleton variant='circular' width={40} height={40} />

                  <Box flex={1}>
                    <Skeleton width='30%' />
                    <Skeleton width='80%' />
                  </Box>
                </Stack>
              ))}
            </Stack>
          )}

          {!myDeliveryReviewsLoading &&
            !myDeliveryReviewsError &&
            myDeliveryReviews.length === 0 && (
              <Typography variant='body2' color='textSecondary'>
                No customer feedback yet.
              </Typography>
            )}

          {!myDeliveryReviewsLoading && myDeliveryReviews.length > 0 && (
            <Stack spacing={2}>
              {myDeliveryReviews.map((review, index) => {
                const customerName = getCustomerName(review.customer);

                return (
                  <Box key={review.id}>
                    <Stack spacing={1.5}>
                      <Stack
                        direction='row'
                        sx={{
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                        gap={2}
                      >
                        <Stack
                          direction='row'
                          spacing={1.5}
                          sx={{ alignItems: "center" }}
                        >
                          <Avatar
                            sx={{
                              width: 40,
                              height: 40,
                              fontSize: "0.9rem",
                              fontWeight: 600,
                            }}
                          >
                            {getInitials(customerName)}
                          </Avatar>

                          <Box>
                            <Typography variant='body2' fontWeight={600}>
                              {customerName}
                            </Typography>

                            <Typography variant='caption' color='textSecondary'>
                              {formatReviewDate(review.createdAt)}
                            </Typography>
                          </Box>
                        </Stack>

                        <Rating
                          value={review.deliveryRating || 0}
                          precision={1}
                          readOnly
                          size='small'
                        />
                      </Stack>

                      {review.deliveryComment && (
                        <Typography variant='body2' color='text.secondary'>
                          "{review.deliveryComment}"
                        </Typography>
                      )}
                    </Stack>

                    {index < myDeliveryReviews.length - 1 && (
                      <Divider sx={{ mt: 2 }} />
                    )}
                  </Box>
                );
              })}
            </Stack>
          )}

          {myDeliveryReviews.length > 0 && (
            <Button
              variant='text'
              onClick={onViewAll}
              sx={{ alignSelf: "flex-start" }}
            >
              View all feedback
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default DeliveryCustomerFeedback;
