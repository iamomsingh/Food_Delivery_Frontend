import {
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  Skeleton,
} from "@mui/material";

function RestaurantCardSkeleton() {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image */}
      <Skeleton variant='rectangular' height={180} animation='wave' />

      <CardContent sx={{ flexGrow: 1 }}>
        {/* Restaurant Name + Rating */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            mb: 1,
          }}
        >
          <Skeleton variant='text' width='60%' height={32} animation='wave' />

          {/* Chip Placeholder */}
          <Chip
            label={
              <Skeleton
                variant='rounded'
                width={55}
                height={24}
                animation='wave'
              />
            }
            size='small'
          />
        </Box>

        {/* Cuisine */}
        <Skeleton variant='text' width='45%' animation='wave' />

        {/* Delivery Time + Delivery Fee */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Skeleton variant='text' width={70} animation='wave' />

          <Skeleton variant='text' width={100} animation='wave' />
        </Box>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Skeleton variant='rounded' width='100%' height={36} animation='wave' />
      </CardActions>
    </Card>
  );
}

export default RestaurantCardSkeleton;
