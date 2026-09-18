import {
  Chip,
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";

function AdminRestaurantTable({
  restaurants,
  actionLoadingType,
  actionLoadingId,
  onView,
  onApprove,
  onReject,
}) {
  const getStatusColor = (status) => {
    switch (status) {
      case "APPROVED":
        return "success";

      case "PENDING":
        return "warning";

      case "REJECTED":
        return "error";

      default:
        return "default";
    }
  };

  return (
    <>
      {restaurants.map((restaurant) => {
        const isApproving =
          actionLoadingType === "APPROVE_RESTAURANT" &&
          actionLoadingId === restaurant.id;

        const isRejecting =
          actionLoadingType === "REJECT_RESTAURANT" &&
          actionLoadingId === restaurant.id;

        const actionLoading = isApproving || isRejecting;

        return (
          <TableRow
            key={restaurant.id}
            hover
            sx={{ cursor: "pointer" }}
            onClick={() => onView(restaurant.id)}
          >
            {/* Restaurant */}
            <TableCell>
              <Stack
                direction='row'
                spacing={1.5}
                sx={{ alignItems: "center" }}
              >
                {restaurant.logoUrl ? (
                  <img
                    src={restaurant.logoUrl}
                    alt={restaurant.name}
                    width={44}
                    height={44}
                    style={{
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Stack
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 2,
                      bgcolor: "action.hover",
                      alignItem: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant='caption'>N/A</Typography>
                  </Stack>
                )}

                <Stack>
                  <Typography variant='body2' fontWeight={600}>
                    {restaurant.name}
                  </Typography>

                  <Typography variant='caption' color='textSecondary'>
                    {restaurant.slug}
                  </Typography>
                </Stack>
              </Stack>
            </TableCell>

            {/* Owner */}
            <TableCell>
              <Typography variant='body2'>
                {restaurant.owner
                  ? `${restaurant.owner.firstName} ${restaurant.owner.lastName}`
                  : "Unknown"}
              </Typography>
            </TableCell>

            {/* Status */}
            <TableCell>
              <Chip
                label={restaurant.status}
                color={getStatusColor(restaurant.status)}
                size='small'
              />
            </TableCell>

            {/* Pure Veg */}
            <TableCell>
              <Chip
                label={restaurant.isPureVeg ? "Pure Veg" : "Non Veg"}
                size='small'
                variant='outlined'
              />
            </TableCell>

            {/* Rating */}
            <TableCell>
              <Typography variant='body2'>
                ⭐ {restaurant.averageRating ?? 0}
              </Typography>
            </TableCell>

            {/* Reviews */}
            <TableCell>
              <Typography variant='body2'>
                {restaurant.totalReviews ?? 0}
              </Typography>
            </TableCell>

            {/* Created */}
            <TableCell>
              <Typography variant='body2'>
                {new Date(restaurant.createdAt).toLocaleDateString()}
              </Typography>
            </TableCell>

            {/* Actions */}
            <TableCell onClick={(event) => event.stopPropagation()}>
              <Stack direction='row' spacing={1.5}>
                <Tooltip title='View details'>
                  <IconButton
                    size='small'
                    onClick={() => onView(restaurant.id)}
                  >
                    <VisibilityIcon fontSize='small' />
                  </IconButton>
                </Tooltip>

                {restaurant.status === "PENDING" && (
                  <>
                    <Tooltip title='Approve'>
                      <span>
                        <IconButton
                          size='small'
                          color='success'
                          disabled={actionLoading}
                          onClick={() => onApprove(restaurant.id)}
                        >
                          <CheckIcon fontSize='small' />
                        </IconButton>
                      </span>
                    </Tooltip>

                    <Tooltip title='Reject'>
                      <span>
                        <IconButton
                          size='small'
                          color='error'
                          disabled={actionLoading}
                          onClick={() => onReject(restaurant)}
                        >
                          <CloseIcon fontSize='small' />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </>
                )}
              </Stack>
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
}

export default AdminRestaurantTable;
