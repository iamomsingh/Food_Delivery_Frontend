import {
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import AccessTimeIcon from "@mui/icons-material/AccessTime";

import FoodTypeIndicator from "./FoodTypeIndicator";

function MenuItemCard({ menuItem }) {
  const hasDiscount =
    menuItem.discountedPrice &&
    Number(menuItem.discountedPrice) < Number(menuItem.price);

  const finalPrice = hasDiscount ? menuItem.discountedPrice : menuItem.price;

  const discountPercentage = hasDiscount
    ? Math.round(
        ((menuItem.price - menuItem.discountedPrice) / menuItem.price) * 100,
      )
    : 0;

  return (
    <Card
      elevation={0}
      sx={{
        p: 4,
        display: "flex",
        justifyContent: "space-between",
        gap: 3,
        borderRadius: 3,
        transition: "0.2s",

        "&:hover": {
          boxShadow: 3,
        },
      }}
    >
      {/* LEFT */}

      <Box flex={1}>
        <FoodTypeIndicator foodType={menuItem.foodType} />

        <Stack direction='row' spacing={1} alignItems='center' sx={{ mt: 1 }}>
          <Typography variant='h6' fontWeight={700}>
            {menuItem.name}
          </Typography>

          {menuItem.isFeatured && (
            <Chip label='Bestseller' color='warning' size='small' />
          )}
        </Stack>

        {/* PRICE */}

        <Stack direction='row' spacing={1} alignItems='center' sx={{ mt: 1 }}>
          <Typography variant='h6' fontWeight={700} color='primary'>
            ₹{finalPrice}
          </Typography>

          {hasDiscount && (
            <>
              <Typography
                color='text.secondary'
                sx={{
                  textDecoration: "line-through",
                }}
              >
                ₹{menuItem.price}
              </Typography>

              <Chip
                label={`${discountPercentage}% OFF`}
                color='success'
                size='small'
              />
            </>
          )}
        </Stack>

        {/* META */}

        <Stack direction='row' spacing={2} sx={{ mt: 1 }}>
          <Typography variant='body2' color='text.secondary'>
            ⭐ {menuItem.averageRating}
            {" ("}
            {menuItem.totalReviews}
            {")"}
          </Typography>

          <Stack direction='row' spacing={0.5} alignItems='center'>
            <AccessTimeIcon fontSize='small' />

            <Typography variant='body2' color='text.secondary'>
              {menuItem.preparationTimeMinutes} mins
            </Typography>
          </Stack>
        </Stack>

        {/* DESCRIPTION */}

        <Typography
          variant='body2'
          color='text.secondary'
          sx={{
            mt: 2,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {menuItem.description}
        </Typography>
      </Box>

      {/* RIGHT */}

      <Box
        sx={{
          width: 160,
          position: "relative",
        }}
      >
        <CardMedia
          component='img'
          image={menuItem.imageUrl || "https://placehold.co/200"}
          alt={menuItem.name}
          sx={{
            height: 150,
            borderRadius: 2,
            objectFit: "cover",
          }}
        />

        <Button
          fullWidth
          variant='contained'
          disabled={!menuItem.isAvailable}
          sx={{
            position: "absolute",
            bottom: -18,
            left: "50%",
            transform: "translateX(-50%)",
            width: 120,
            borderRadius: 5,
          }}
        >
          {menuItem.isAvailable ? "ADD" : "OUT OF STOCK"}
        </Button>
      </Box>
    </Card>
  );
}

export default MenuItemCard;
