import { Box, Chip, IconButton, Stack, Typography } from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

function MenuItemCard({
  item,
  actionLoadingType,
  actionLoadingId,
  onEdit,
  onDelete,
}) {
  const isUpdating =
    actionLoadingType === "UPDATE_MENU_ITEM" && actionLoadingId === item.id;

  const isDeleting =
    actionLoadingType === "DELETE_MENU_ITEM" && actionLoadingId === item.id;

  const actionLoading = isUpdating || isDeleting;

  const hasDiscount =
    item.discountedPrice != null &&
    Number(item.discountedPrice) < Number(item.price);

  return (
    <Box
      sx={{
        p: 2,
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
      }}
    >
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Box
          sx={{
            width: { xs: "100%", sm: 120 },
            height: { xs: 180, sm: 100 },
            flexShrink: 0,
            borderRadius: 2,
            overflow: "hidden",
            bgcolor: "action.hover",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {item.imageUrl ? (
            <Box
              component='img'
              src={item.imageUrl}
              alt={item.name}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <Typography variant='caption' color='text.secondary'>
              No image
            </Typography>
          )}
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack
            direction='row'
            spacing={1}
            alignItems='center'
            flexWrap='wrap'
          >
            <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
              {item.name}
            </Typography>

            {item.foodType && (
              <Chip
                label={item.foodType}
                size='small'
                color={item.foodType === "VEG" ? "success" : "error"}
              />
            )}

            {item.isFeatured && (
              <Chip
                icon={<StarOutlinedIcon />}
                label='Featured'
                size='small'
                color='info'
              />
            )}
          </Stack>

          {item.description && (
            <Typography variant='body2' color='textSecondary' sx={{ mt: 0.5 }}>
              {item.description}
            </Typography>
          )}

          <Stack direction='row' spacing={1} alignItems='center' sx={{ mt: 1 }}>
            <Typography variant='body1' fontWeight={700}>
              ₹{Number(item.discountedPrice ?? item.price).toFixed(2)}
            </Typography>

            {hasDiscount && (
              <Typography
                variant='body2'
                color='textSecondary'
                sx={{
                  textDecoration: "line-through",
                }}
              >
                ₹{Number(item.price).toFixed(2)}
              </Typography>
            )}
          </Stack>

          <Stack direction='row' spacing={2} flexWrap='wrap' sx={{ mt: 1 }}>
            <Typography variant='body2' color='textSecondary'>
              ⭐ {Number(item.averageRating).toFixed(1)} ({item.totalReviews}{" "}
              reviews)
            </Typography>

            {item.preparationTimeMinutes != null && (
              <Stack direction='row' spacing={0.5} alignItems='center'>
                <AccessTimeOutlinedIcon sx={{ fontSize: 16 }} />

                <Typography variant='body2' color='textSecondary'>
                  {item.preparationTimeMinutes} min
                </Typography>
              </Stack>
            )}
          </Stack>

          <Stack direction='row' spacing={1} sx={{ mt: 1 }}>
            <Chip
              label={item.isAvailable ? "Available" : "Unavailable"}
              color={item.isAvailable ? "success" : "default"}
              size='small'
              variant='outlined'
            />
          </Stack>
        </Box>

        <Stack
          direction='row'
          spacing={0.5}
          alignSelf={{
            xs: "flex-end",
            sm: "flex-start",
          }}
        >
          <IconButton
            onClick={() => onEdit(item)}
            disabled={actionLoading}
            aria-label='Edit menu item'
          >
            <EditOutlinedIcon />
          </IconButton>

          <IconButton
            onClick={() => onDelete(item)}
            disabled={actionLoading}
            color='error'
            aria-label='Delete menu item'
          >
            <DeleteOutlinedIcon />
          </IconButton>
        </Stack>
      </Stack>

      {isDeleting && (
        <Typography
          variant='caption'
          color='text.secondary'
          sx={{ display: "block", mt: 1 }}
        >
          Deleting...
        </Typography>
      )}

      {isUpdating && (
        <Typography
          variant='caption'
          color='text.secondary'
          sx={{ display: "block", mt: 1 }}
        >
          Updating...
        </Typography>
      )}
    </Box>
  );
}

export default MenuItemCard;
