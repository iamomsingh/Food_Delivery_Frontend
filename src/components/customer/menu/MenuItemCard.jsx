import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import FoodTypeIndicator from "../../common/FoodTypeIndicator";
import {
  addCartItem,
  updateCartItemQuantity,
  deleteCartItem,
} from "../../../features/customer/cartSlice";

function MenuItemCard({ menuItem }) {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart);

  const cartItem = cart?.items?.find(
    (item) => item.menuItem.id === menuItem.id,
  );

  const quantity = cartItem?.quantity || 0;

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
        p: { xs: 2, sm: 3, md: 4 },
        display: "flex",
        flexDirection: { xs: "column-reverse", sm: "row" },
        justifyContent: "space-between",
        gap: { xs: 3, sm: 3 },
        borderRadius: 3,
        transition: "0.2s",
        minWidth: 0,

        "&:hover": {
          boxShadow: 3,
        },
      }}
    >
      {/* LEFT */}

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <FoodTypeIndicator foodType={menuItem.foodType} />

        <Stack
          direction='row'
          spacing={1}
          sx={{ mt: 1, rowGap: 0.5, alignItems: "center", flexWrap: "wrap" }}
        >
          <Typography
            variant='h6'
            fontWeight={700}
            sx={{ minWidth: 0, overflowWrap: "anywhere" }}
          >
            {menuItem.name}
          </Typography>

          {menuItem.isFeatured && (
            <Chip label='Bestseller' color='warning' size='small' />
          )}
        </Stack>

        {/* PRICE */}

        <Stack
          direction='row'
          spacing={1}
          sx={{ mt: 1, rowGap: 0.5, alignItems: "center", flexWrap: "wrap" }}
        >
          <Typography variant='h6' fontWeight={700} color='primary'>
            ₹{menuItem.discountedPrice}
          </Typography>

          {hasDiscount && (
            <>
              <Typography
                color='textSecondary'
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

        <Stack
          direction='row'
          spacing={2}
          sx={{ mt: 1, rowGap: 0.5, flexWrap: "wrap" }}
        >
          <Typography variant='body2' color='textSecondary'>
            ⭐ {menuItem.averageRating}
            {" ("}
            {menuItem.totalReviews}
            {")"}
          </Typography>

          <Stack direction='row' spacing={0.5} sx={{ alignItems: "center" }}>
            <AccessTimeIcon fontSize='small' />

            <Typography variant='body2' color='textSecondary'>
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
            overflowWrap: "anywhere",
          }}
        >
          {menuItem.description}
        </Typography>
      </Box>

      {/* RIGHT */}

      <Box
        sx={{
          position: "relative",
          width: { xs: "100%", sm: 160 },
          flexShrink: 0,
          // Extra space for the floating button
          pb: 1,
        }}
      >
        <CardMedia
          component='img'
          image={menuItem.imageUrl || "https://placehold.co/200"}
          alt={menuItem.name}
          sx={{
            width: "100%",
            height: { xs: 200, sm: 150 },
            borderRadius: 2,
            objectFit: "cover",
          }}
        />

        {quantity === 0 ? (
          <Button
            fullWidth
            variant='contained'
            disabled={!menuItem.isAvailable}
            sx={{
              position: "absolute",
              bottom: -18,
              left: "50%",
              transform: "translateX(-50%)",
              width: { xs: 140, sm: 120 },
              borderRadius: 5,
              whiteSpace: "nowrap",
            }}
            onClick={() =>
              dispatch(addCartItem({ menuItemId: menuItem.id, quantity: 1 }))
            }
          >
            {menuItem.isAvailable ? "ADD" : "OUT OF STOCK"}
          </Button>
        ) : (
          <ButtonGroup
            variant='contained'
            sx={{
              position: "absolute",
              bottom: -8,
              left: "50%",
              transform: "translateX(-50%)",
              width: { xs: 140, sm: 120 },

              "& .MuiButton-root": {
                minWidth: { xs: 46, sm: 40 },
              },
            }}
          >
            <Button
              onClick={() => {
                if (quantity === 1) {
                  dispatch(deleteCartItem(cartItem.cartItemId));
                } else {
                  dispatch(
                    updateCartItemQuantity({
                      cartItemId: cartItem.cartItemId,
                      quantity: quantity - 1,
                    }),
                  );
                }
              }}
            >
              -
            </Button>

            <Button disabled>{quantity}</Button>

            <Button
              disabled={!cartItem || !menuItem.isAvailable}
              onClick={() => {
                if (!cartItem) return;

                dispatch(
                  updateCartItemQuantity({
                    cartItemId: cartItem.cartItemId,
                    quantity: quantity + 1,
                  }),
                );
              }}
            >
              +
            </Button>
          </ButtonGroup>
        )}
      </Box>
    </Card>
  );
}

export default MenuItemCard;
