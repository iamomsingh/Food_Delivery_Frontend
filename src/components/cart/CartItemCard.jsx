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

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import FoodTypeIndicator from "../FoodTypeIndicator";
import {
  deleteCartItem,
  updateCartItemQuantity,
} from "../../features/cart/cartSlice";

function CartItemCard({ item }) {
  const updatingItemId = useSelector((state) => state.cart.updatingItemId);
  const dispatch = useDispatch();

  const { menuItem, quantity, cartItemId } = item;

  const isUpdating = updatingItemId === cartItemId;

  const hasDiscount =
    menuItem.discountedPrice &&
    Number(menuItem.discountedPrice) < Number(menuItem.price);

  const finalPrice = hasDiscount ? menuItem.discountedPrice : menuItem.price;

  return (
    <Card
      elevation={0}
      sx={{
        p: 2,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ alignItems: { xs: "stretch", sm: "center" } }}
      >
        {/* Image */}
        <CardMedia
          component='img'
          image={menuItem.imageUrl || "https://placehold.co/120"}
          alt={menuItem.name}
          sx={{
            width: { xs: "100%", sm: 100 },
            height: { xs: 180, sm: 100 },
            borderRadius: 2,
            objectFit: "cover",
            flexShrink: 0,
          }}
        />

        {/* Information */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <FoodTypeIndicator foodType={menuItem.foodType} />

          <Typography variant='h6' fontWeight={700} sx={{ mt: 0.75 }}>
            {menuItem.name}
          </Typography>

          {menuItem.description && (
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{
                mt: 0.5,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {menuItem.description}
            </Typography>
          )}

          <Stack direction='row' spacing={1} alignItems='center' sx={{ mt: 1 }}>
            <Typography variant='body1' fontWeight={700}>
              ₹{finalPrice}
            </Typography>

            {hasDiscount && (
              <Typography
                variant='body2'
                color='text.secondary'
                sx={{
                  textDecoration: "line-through",
                }}
              >
                ₹{menuItem.price}
              </Typography>
            )}

            {hasDiscount && (
              <Chip
                label={`${Math.round(
                  ((Number(menuItem.price) - Number(menuItem.discountedPrice)) /
                    Number(menuItem.price)) *
                    100,
                )}% OFF`}
                color='success'
                size='small'
              />
            )}
          </Stack>
        </Box>

        {/* Item total */}
        <Box
          sx={{
            minWidth: { xs: "100%", sm: 120 },
            display: "flex",
            flexDirection: { xs: "row", sm: "column" },
            alignItems: "center",
            justifyContent: {
              xs: "space-between",
              sm: "flex-end",
            },
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              overflow: "hidden",
              gap: 0.5,
            }}
          >
            <Button
              disabled={isUpdating}
              onClick={() => {
                if (quantity === 1) {
                  dispatch(deleteCartItem(cartItemId));
                } else {
                  dispatch(
                    updateCartItemQuantity({
                      cartItemId,
                      quantity: quantity - 1,
                    }),
                  );
                }
              }}
              sx={{
                minWidth: 36,
                width: 36,
                height: 34,
                p: 0,
                borderRadius: 0,
                color: "text.primary",
              }}
            >
              <RemoveIcon fontSize='small' />
            </Button>

            <Typography
              sx={{
                width: 38,
                textAlign: "center",
                fontWeight: 700,
                fontSize: "0.95rem",
              }}
            >
              {quantity}
            </Typography>

            <Button
              disabled={isUpdating}
              onClick={() =>
                dispatch(
                  updateCartItemQuantity({
                    cartItemId,
                    quantity: quantity + 1,
                  }),
                )
              }
              sx={{
                minWidth: 36,
                width: 36,
                height: 34,
                p: 0,
                borderRadius: 0,
                color: "text.primary",
              }}
            >
              <AddIcon fontSize='small' />
            </Button>
          </Box>

          {/* Total Price */}
          <Typography variant='h6' fontWeight={700}>
            ₹{item.totalPrice}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
}

export default CartItemCard;
