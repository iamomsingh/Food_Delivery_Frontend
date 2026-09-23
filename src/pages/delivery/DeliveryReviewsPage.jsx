import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Pagination,
  Rating,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import StarIcon from "@mui/icons-material/Star";

import { fetchDeliveryProfile } from "../../features/delivery/deliverySlice";
import { fetchMyDeliveryReviews } from "../../features/review/reviewSlice";

function formatReviewDate(date) {
  if (!date) return "";

  const reviewDate = new Date(date);
  const now = new Date();

  const differenceInSeconds = Math.floor((now - reviewDate) / 1000);

  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  if (differenceInSeconds < minute) {
    return "Just now";
  }

  if (differenceInSeconds < hour) {
    const minutes = Math.floor(differenceInSeconds / minute);

    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  }

  if (differenceInSeconds < day) {
    const hours = Math.floor(differenceInSeconds / hour);

    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  }

  if (differenceInSeconds < week) {
    const days = Math.floor(differenceInSeconds / day);

    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }

  if (differenceInSeconds < month) {
    const weeks = Math.floor(differenceInSeconds / week);

    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  }

  if (differenceInSeconds < year) {
    const months = Math.floor(differenceInSeconds / month);

    return `${months} ${months === 1 ? "month" : "months"} ago`;
  }

  const years = Math.floor(differenceInSeconds / year);

  return `${years} ${years === 1 ? "year" : "years"} ago`;
}

function getCustomerName(customer) {
  if (!customer) {
    return "Customer";
  }

  return (
    [customer.firstName, customer.lastName].filter(Boolean).join(" ") ||
    "Customer"
  );
}

function getInitials(name) {
  if (!name || name === "Customer") {
    return "C";
  }

  const parts = name.split(" ");

  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

function ReviewSkeleton() {
  return (
    <Stack spacing={2}>
      {[1, 2, 3, 4].map((item) => (
        <Card
          key={item}
          elevation={0}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
          }}
        >
          <CardContent>
            <Stack direction='row' spacing={2} alignItems='center'>
              <Skeleton variant='circular' width={48} height={48} />

              <Box flex={1}>
                <Skeleton width='25%' />
                <Skeleton width='15%' />
              </Box>
            </Stack>

            <Skeleton width='80%' height={24} sx={{ mt: 2 }} />

            <Skeleton width='60%' height={24} />
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}

function DeliveryReviewsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profile, profileLoading, profileError } = useSelector(
    (state) => state.delivery,
  );

  const {
    myDeliveryReviews,
    myDeliveryReviewsPagination,
    myDeliveryReviewsLoading,
    myDeliveryReviewsError,
  } = useSelector((state) => state.review);

  const currentPage = myDeliveryReviewsPagination?.currentPage || 1;

  const totalPages = myDeliveryReviewsPagination?.totalPages || 1;

  const totalReviews = myDeliveryReviewsPagination?.totalItems || 0;

  useEffect(() => {
    dispatch(fetchDeliveryProfile());
  }, [dispatch]);

  useEffect(() => {
    if (!profile?.id) return;
    dispatch(
      fetchMyDeliveryReviews({
        deliveryPartnerId: profile.id,
        page: 1,
        limit: 10,
      }),
    );
  }, [dispatch, profile?.id]);

  const handlePageChange = (_, page) => {
    if (!profile?.id) return;

    dispatch(
      fetchMyDeliveryReviews({
        deliveryPartnerId: profile.id,
        page,
        limit: 10,
      }),
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Stack spacing={3}>
      {/* Page Header */}

      <Box>
        <Button
          variant='text'
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/delivery/dashboard")}
        >
          Dashboard
        </Button>
      </Box>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
        }}
        gap={2}
      >
        <Stack direction='row' spacing={1} sx={{ alignItems: "center" }}>
          <Stack direction='row' spacing={1}>
            <RateReviewOutlinedIcon color='primary' />

            <Box>
              <Typography variant='h4' fontWeight={700}>
                Customer Feedback
              </Typography>

              <Typography
                variant='body1'
                color='textSecondary'
                sx={{ mt: 0.5 }}
              >
                Reviews and feedback from customers you have delivered orders
                to.
              </Typography>
            </Box>
          </Stack>
        </Stack>

        {totalReviews > 0 && (
          <Typography variant='body2' color='textSecondary'>
            {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
          </Typography>
        )}
      </Stack>

      {/* Error */}

      {myDeliveryReviewsError && (
        <Alert severity='error'>{myDeliveryReviewsError}</Alert>
      )}

      {/* Loading */}

      {myDeliveryReviewsLoading && <ReviewSkeleton />}

      {/* Empty State */}

      {!myDeliveryReviewsLoading &&
        !myDeliveryReviewsError &&
        myDeliveryReviews.length === 0 && (
          <Card
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
            }}
          >
            <CardContent
              sx={{
                py: 8,
                textAlign: "center",
              }}
            >
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  mx: "auto",
                  bgcolor: "action.hover",
                  color: "textSecondary",
                }}
              >
                <RateReviewOutlinedIcon />
              </Avatar>

              <Typography variant='h6' fontWeight={600} sx={{ mt: 2 }}>
                No customer feedback yet
              </Typography>

              <Typography
                variant='body2'
                color='textSecondary'
                sx={{
                  mt: 1,
                  maxWidth: 450,
                  mx: "auto",
                }}
              >
                Customer feedback will appear here after customers review your
                completed deliveries.
              </Typography>
            </CardContent>
          </Card>
        )}

      {/* Reviews */}

      {!myDeliveryReviewsLoading && myDeliveryReviews.length > 0 && (
        <Stack spacing={2}>
          {myDeliveryReviews.map((review) => {
            const customerName = getCustomerName(review.customer);

            return (
              <Card
                key={review.id}
                elevation={0}
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 3,
                  transition: "border-color 0.2s ease, box-shadow 0.2s ease",

                  "&:hover": {
                    borderColor: "primary.main",
                    boxShadow: 2,
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
                  <Stack spacing={2}>
                    {/* Customer */}

                    <Stack
                      direction='row'
                      sx={{
                        justifyContent: "space-between",
                        alignItems: "flex-start",
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
                            width: 48,
                            height: 48,
                            fontWeight: 600,
                          }}
                        >
                          {getInitials(customerName)}
                        </Avatar>

                        <Box>
                          <Typography fontWeight={600}>
                            {customerName}
                          </Typography>

                          <Typography variant='caption' color='textSecondary'>
                            {formatReviewDate(review.createdAt)}
                          </Typography>
                        </Box>
                      </Stack>

                      {/* Rating */}

                      <Stack
                        direction='row'
                        spacing={0.5}
                        sx={{ alignItems: "center" }}
                      >
                        <StarIcon
                          sx={{
                            fontSize: 20,
                            color: "warning.main",
                          }}
                        />

                        <Typography fontWeight={700}>
                          {review.deliveryRating}/5
                        </Typography>
                      </Stack>
                    </Stack>

                    <Rating
                      value={review.deliveryRating || 0}
                      precision={1}
                      readOnly
                      size='small'
                    />

                    <Divider />

                    {/* Comment */}

                    {review.deliveryComment ? (
                      <Typography
                        variant='body1'
                        sx={{
                          lineHeight: 1.7,
                        }}
                      >
                        "{review.deliveryComment}"
                      </Typography>
                    ) : (
                      <Typography
                        variant='body2'
                        color='textSecondary'
                        fontStyle='italic'
                      >
                        Customer left a rating without a comment.
                      </Typography>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      )}

      {/* Pagination */}

      {!myDeliveryReviewsLoading &&
        myDeliveryReviews.length > 0 &&
        totalPages > 1 && (
          <Stack alignItems='center' sx={{ pb: 3 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color='primary'
              showFirstButton
              showLastButton
            />
          </Stack>
        )}
    </Stack>
  );
}

export default DeliveryReviewsPage;
