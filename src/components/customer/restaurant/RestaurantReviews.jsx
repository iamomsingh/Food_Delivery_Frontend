import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Alert,
  Avatar,
  Box,
  Card,
  Chip,
  Divider,
  Pagination,
  Rating,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import StarIcon from "@mui/icons-material/Star";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";

import { fetchRestaurantReviews } from "../../../features/review/reviewSlice";

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
  if (!customer) return "Customer";

  return (
    [customer.firstName, customer.lastName].filter(Boolean).join(" ") ||
    "Customer"
  );
}

function getInitials(name) {
  if (!name || name === "Customer") {
    return "C";
  }

  const words = name.split(" ");

  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }

  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
}

function ReviewSkeleton() {
  return (
    <Stack spacing={2}>
      {[1, 2, 3].map((item) => (
        <Card
          key={item}
          elevation={0}
          sx={{
            p: 3,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
          }}
        >
          <Stack direction='row' spacing={2} alignItems='center'>
            <Skeleton variant='circular' width={48} height={48} />

            <Box flex={1}>
              <Skeleton width='30%' height={24} />
              <Skeleton width='20%' height={20} />
            </Box>
          </Stack>

          <Skeleton width='90%' height={22} sx={{ mt: 2 }} />

          <Skeleton width='65%' height={22} />
        </Card>
      ))}
    </Stack>
  );
}

function RestaurantReviews({ restaurantId, restaurant }) {
  const dispatch = useDispatch();

  const {
    restaurantReviews,
    restaurantReviewsPagination,
    restaurantReviewsLoading,
    restaurantReviewsError,
  } = useSelector((state) => state.review);

  const currentPage = restaurantReviewsPagination?.currentPage || 1;

  const totalPages = restaurantReviewsPagination?.totalPages || 1;

  const totalReviews =
    restaurantReviewsPagination?.totalItems || restaurant?.totalReviews || 0;

  const averageRating = Number(restaurant?.averageRating) || 0;

  useEffect(() => {
    if (!restaurantId) return;

    dispatch(
      fetchRestaurantReviews({
        restaurantId,
        page: 1,
        limit: 10,
      }),
    );
  }, [dispatch, restaurantId]);

  const handlePageChange = (_, page) => {
    dispatch(
      fetchRestaurantReviews({
        restaurantId,
        page,
        limit: 10,
      }),
    );

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <Box
      component='section'
      sx={{
        mt: 7,
        pb: 4,
      }}
    >
      {/* ============================================
          SECTION HEADER
      ============================================ */}

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          mb: 3,
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
        }}
      >
        <Box>
          <Stack direction='row' spacing={1} sx={{ alignItems: "center" }}>
            <RateReviewOutlinedIcon color='primary' />

            <Typography variant='h5' fontWeight={700}>
              Customer Reviews
            </Typography>
          </Stack>

          <Typography variant='body2' color='textSecondary' sx={{ mt: 0.5 }}>
            See what customers think about this restaurant
          </Typography>
        </Box>

        {totalReviews > 0 && (
          <Chip
            label={`${totalReviews} ${
              totalReviews === 1 ? "Review" : "Reviews"
            }`}
            variant='outlined'
          />
        )}
      </Stack>

      {/* ============================================
          REVIEW SUMMARY
      ============================================ */}

      {totalReviews > 0 && (
        <Card
          elevation={0}
          sx={{
            mb: 3,
            p: { xs: 3, md: 4 },
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
            background:
              "linear-gradient(135deg, rgba(255,193,7,0.08), rgba(255,255,255,0))",
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            sx={{
              alignItems: { xs: "flex-start", sm: "center" },
            }}
            spacing={{ xs: 2, sm: 5 }}
          >
            {/* Average rating */}

            <Box
              sx={{
                minWidth: 150,
                textAlign: {
                  xs: "left",
                  sm: "center",
                },
              }}
            >
              <Typography variant='h2' fontWeight={800} lineHeight={1}>
                {averageRating.toFixed(1)}
              </Typography>

              <Rating
                value={averageRating}
                precision={0.1}
                readOnly
                sx={{ mt: 1 }}
              />

              <Typography
                variant='body2'
                color='textSecondary'
                sx={{ mt: 0.5 }}
              >
                Based on {totalReviews}{" "}
                {totalReviews === 1 ? "review" : "reviews"}
              </Typography>
            </Box>

            <Divider
              orientation='vertical'
              flexItem
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
            />

            {/* Rating message */}

            <Box>
              <Stack direction='row' spacing={1} sx={{ alignItems: "center" }}>
                <StarIcon color='warning' />

                <Typography variant='h6' fontWeight={600}>
                  Customer rating
                </Typography>
              </Stack>

              <Typography
                variant='body2'
                color='textSecondary'
                sx={{
                  mt: 1,
                  maxWidth: 500,
                }}
              >
                Ratings and feedback from customers who have ordered from this
                restaurant.
              </Typography>
            </Box>
          </Stack>
        </Card>
      )}

      {restaurantReviewsError && (
        <Alert
          severity='error'
          sx={{
            mb: 3,
            borderRadius: 2,
          }}
        >
          {restaurantReviewsError}
        </Alert>
      )}

      {restaurantReviewsLoading && <ReviewSkeleton />}

      {!restaurantReviewsLoading &&
        !restaurantReviewsError &&
        restaurantReviews.length === 0 && (
          <Card
            elevation={0}
            sx={{
              py: 7,
              px: 3,
              textAlign: "center",
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Avatar
              sx={{
                width: 64,
                height: 64,
                mx: "auto",
                mb: 2,
                bgcolor: "action.hover",
                color: "textSecondary",
              }}
            >
              <RateReviewOutlinedIcon />
            </Avatar>

            <Typography variant='h6' fontWeight={600}>
              No reviews yet
            </Typography>

            <Typography
              variant='body2'
              color='textSecondary'
              sx={{
                mt: 1,
                maxWidth: 400,
                mx: "auto",
              }}
            >
              This restaurant hasn't received any customer reviews yet.
            </Typography>
          </Card>
        )}

      {!restaurantReviewsLoading && restaurantReviews.length > 0 && (
        <Stack spacing={2}>
          {restaurantReviews.map((review) => {
            const customerName = getCustomerName(review.customer);

            return (
              <Card
                key={review.id}
                elevation={0}
                sx={{
                  p: { xs: 2.5, md: 3 },
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  transition: "border-color 0.2s, box-shadow 0.2s",

                  "&:hover": {
                    borderColor: "primary.main",
                    boxShadow: 2,
                  },
                }}
              >
                {/* Customer */}

                <Stack
                  direction='row'
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                  spacing={2}
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
                      <Typography fontWeight={600}>{customerName}</Typography>

                      <Typography variant='caption' color='textSecondary'>
                        {formatReviewDate(review.createdAt)}
                      </Typography>
                    </Box>
                  </Stack>

                  {/* Rating */}

                  <Stack
                    direction='row'
                    spacing={0.5}
                    sx={{
                      flexShrink: 0,
                      alignItems: "center",
                    }}
                  >
                    <StarIcon
                      sx={{
                        fontSize: 18,
                        color: "warning.main",
                      }}
                    />

                    <Typography fontWeight={700}>
                      {review.restaurantRating}
                    </Typography>
                  </Stack>
                </Stack>

                {/* Rating stars */}

                <Rating
                  value={review.restaurantRating || 0}
                  size='small'
                  readOnly
                  sx={{ mt: 1.5 }}
                />

                {/* Comment */}

                {review.restaurantComment ? (
                  <Typography
                    variant='body1'
                    sx={{
                      mt: 1.5,
                      lineHeight: 1.7,
                    }}
                  >
                    {review.restaurantComment}
                  </Typography>
                ) : (
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{
                      mt: 1.5,
                      fontStyle: "italic",
                    }}
                  >
                    Customer left a rating without a comment.
                  </Typography>
                )}
              </Card>
            );
          })}
        </Stack>
      )}

      {/* ============================================
          PAGINATION
      ============================================ */}

      {!restaurantReviewsLoading &&
        restaurantReviews.length > 0 &&
        totalPages > 1 && (
          <Stack sx={{ mt: 4, alignItems: "center" }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color='primary'
              size='medium'
              showFirstButton
              showLastButton
            />
          </Stack>
        )}
    </Box>
  );
}

export default RestaurantReviews;
