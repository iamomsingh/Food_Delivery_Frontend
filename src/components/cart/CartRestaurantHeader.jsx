import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";

import StarIcon from "@mui/icons-material/Star";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";

function CartRestaurantHeader({ restaurant, totalItems }) {
  return (
    <Box
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
        bgcolor: "background.paper",
      }}
    >
      {/* Top context */}
      <Box
        sx={{
          px: { xs: 2, sm: 3 },
          pt: 2,
          pb: 1,
        }}
      >
        <Stack direction='row' spacing={1} alignItems='center'>
          <RestaurantOutlinedIcon
            sx={{
              fontSize: 18,
              color: "text.secondary",
            }}
          />

          <Typography variant='body2' color='text.secondary' fontWeight={500}>
            Your order from
          </Typography>
        </Stack>
      </Box>

      <Divider />

      {/* Restaurant information */}
      <Box
        sx={{
          px: { xs: 2, sm: 3 },
          py: 2.5,
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems='center'
          sx={{
            width: "100%",
          }}
        >
          {/* Restaurant */}
          <Stack
            direction='row'
            spacing={2}
            alignItems='center'
            minWidth={0}
            sx={{ flex: 1 }}
          >
            <Avatar
              src={restaurant.logoUrl || undefined}
              alt={restaurant.name}
              sx={{
                width: 64,
                height: 64,
                borderRadius: 2.5,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "grey.20",
                flexShrink: 0,
              }}
            >
              {restaurant.name?.charAt(0)}
            </Avatar>

            <Box minWidth={0}>
              <Typography variant='h6' fontWeight={700} noWrap>
                {restaurant.name}
              </Typography>

              <Stack
                direction='row'
                spacing={1}
                alignItems='center'
                sx={{ mt: 0.5 }}
              >
                <Stack direction='row' spacing={0.4} alignItems='center'>
                  <StarIcon
                    sx={{
                      fontSize: 17,
                      color: "warning.main",
                    }}
                  />

                  <Typography variant='body2' fontWeight={600}>
                    {restaurant.averageRating || "0.0"}
                  </Typography>
                </Stack>

                <Typography variant='body2' color='text.secondary'>
                  ·
                </Typography>

                <Typography variant='body2' color='text.secondary'>
                  {restaurant.totalReviews || 0} reviews
                </Typography>
              </Stack>
            </Box>
          </Stack>

          {/* Cart count */}
          <Box
            sx={{
              textAlign: "right",
              flexShrink: 0,
              ml: "auto",
            }}
          >
            <Typography variant='h6' fontWeight={700}>
              {totalItems}
            </Typography>

            <Typography variant='body2' color='text.secondary'>
              {totalItems === 1 ? "item" : "items"}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default CartRestaurantHeader;
