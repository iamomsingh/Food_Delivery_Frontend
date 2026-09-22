import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { editReview, submitReview } from "../../features/review/reviewSlice";

const INITIAL_FORM = {
  restaurantRating: 0,
  restaurantComment: "",
  deliveryRating: 0,
  deliveryComment: "",
};

function ReviewDialog({ open, onClose, orderId, review = null }) {
  const dispatch = useDispatch();

  const { creating, createError, updating, updateError } = useSelector(
    (state) => state.review,
  );

  const isEditMode = Boolean(review);

  const [form, setForm] = useState(INITIAL_FORM);
  const [validationError, setValidationError] = useState("");

  /*
   * Populate form when editing.
   */
  useEffect(() => {
    if (!open) return;

    if (review) {
      setForm({
        restaurantRating: review.restaurantRating || 0,
        restaurantComment: review.restaurantComment || "",
        deliveryRating: review.deliveryRating || 0,
        deliveryComment: review.deliveryComment || "",
      });
    } else {
      setForm(INITIAL_FORM);
    }

    setValidationError("");
  }, [open, review]);

  const loading = isEditMode ? updating : creating;

  const error = isEditMode ? updateError : createError;

  const handleRestaurantRatingChange = (_event, value) => {
    setForm((previous) => ({
      ...previous,
      restaurantRating: value || 0,
    }));

    setValidationError("");
  };

  const handleDeliveryRatingChange = (_event, value) => {
    setForm((previous) => ({
      ...previous,
      deliveryRating: value || 0,
    }));

    setValidationError("");
  };

  const handleTextChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setValidationError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    /*
     * Restaurant rating is required
     * by the backend validator.
     */
    if (!form.restaurantRating) {
      setValidationError("Please give the restaurant a rating.");

      return;
    }

    const reviewData = {
      restaurantRating: form.restaurantRating,
      restaurantComment: form.restaurantComment.trim() || null,
      deliveryRating: form.deliveryRating || null,
      deliveryComment: form.deliveryComment.trim() || null,
    };

    let result;

    if (isEditMode) {
      result = await dispatch(
        editReview({
          reviewId: review.id,
          reviewData,
        }),
      );
    } else {
      result = await dispatch(
        submitReview({
          orderId,
          reviewData,
        }),
      );
    }

    if (
      isEditMode
        ? editReview.fulfilled.match(result)
        : submitReview.fulfilled.match(result)
    ) {
      onClose?.(result.payload);
    }
  };

  const handleClose = () => {
    if (loading) return;

    setForm(INITIAL_FORM);
    setValidationError("");

    onClose?.();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
      <Box component='form' onSubmit={handleSubmit}>
        <DialogTitle>
          {isEditMode ? "Edit Your Review" : "Rate Your Order"}
        </DialogTitle>

        <DialogContent dividers>
          <Stack spacing={3}>
            {error && <Alert severity='error'>{error}</Alert>}

            {validationError && (
              <Alert severity='warning'>{validationError}</Alert>
            )}

            {/* Restaurant */}
            <Box>
              <Typography variant='subtitle1' fontWeight={600}>
                How was the restaurant?
              </Typography>

              <Stack
                direction='row'
                spacing={2}
                alignItems='center'
                sx={{ mt: 1 }}
              >
                <Rating
                  value={form.restaurantRating}
                  onChange={handleRestaurantRatingChange}
                  size='large'
                />

                <Typography variant='body2' color='text.secondary'>
                  {form.restaurantRating
                    ? `${form.restaurantRating}/5`
                    : "Required"}
                </Typography>
              </Stack>
            </Box>

            <TextField
              fullWidth
              multiline
              minRows={3}
              maxRows={6}
              label='Restaurant Comment'
              name='restaurantComment'
              value={form.restaurantComment}
              onChange={handleTextChange}
              inputProps={{
                maxLength: 1000,
              }}
              helperText={`${form.restaurantComment.length}/1000`}
            />

            {/* Delivery */}
            <Box>
              <Typography variant='subtitle1' fontWeight={600}>
                How was the delivery?
              </Typography>

              <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
                Optional
              </Typography>

              <Stack direction='row' spacing={2} alignItems='center'>
                <Rating
                  value={form.deliveryRating}
                  onChange={handleDeliveryRatingChange}
                  size='large'
                />

                {form.deliveryRating > 0 && (
                  <Typography variant='body2' color='text.secondary'>
                    {form.deliveryRating}/5
                  </Typography>
                )}
              </Stack>
            </Box>

            <TextField
              fullWidth
              multiline
              minRows={3}
              maxRows={6}
              label='Delivery Comment'
              name='deliveryComment'
              value={form.deliveryComment}
              onChange={handleTextChange}
              inputProps={{
                maxLength: 1000,
              }}
              helperText={`${form.deliveryComment.length}/1000`}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>

          <Button type='submit' variant='contained' disabled={loading}>
            {loading ? (
              <CircularProgress size={22} />
            ) : isEditMode ? (
              "Update Review"
            ) : (
              "Submit Review"
            )}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

export default ReviewDialog;
