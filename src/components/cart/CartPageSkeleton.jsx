import { Box, Skeleton, Stack } from "@mui/material";

function CartPageSkeleton() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "minmax(0, 1fr) 360px",
        },
        gap: 3,
      }}
    >
      {/* Left */}
      <Stack spacing={2}>
        <Skeleton variant='rounded' height={120} />

        <Skeleton variant='rounded' height={130} />

        <Skeleton variant='rounded' height={130} />
      </Stack>

      {/* Right */}
      <Skeleton variant='rounded' height={350} />
    </Box>
  );
}

export default CartPageSkeleton;
