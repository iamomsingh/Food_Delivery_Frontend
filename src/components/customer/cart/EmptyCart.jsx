import { Box, Button, Stack, Typography } from "@mui/material";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import { useNavigate } from "react-router-dom";

function EmptyCart() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "55vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack spacing={2} alignItems='center' textAlign='center' maxWidth={420}>
        <Box
          sx={{
            width: 90,
            height: 90,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "action.hover",
          }}
        >
          <ShoppingCartOutlinedIcon
            sx={{
              fontSize: 44,
              color: "text.secondary",
            }}
          />
        </Box>

        <Typography variant='h5' fontWeight={700}>
          Your cart is empty
        </Typography>

        <Typography color='text.secondary'>
          Looks like you haven't added anything to your cart yet. Explore
          restaurants and find something delicious.
        </Typography>

        <Button
          variant='contained'
          size='large'
          onClick={() => navigate("/")}
          sx={{
            mt: 1,
            px: 4,
            borderRadius: 2,
          }}
        >
          Explore Restaurants
        </Button>
      </Stack>
    </Box>
  );
}

export default EmptyCart;
