import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

function RestaurantInfoCard({ restaurant }) {
  if (!restaurant) {
    return null;
  }

  const statusColor = restaurant.status === "APPROVED" ? "success" : "warning";

  return (
    <Card>
      <CardContent>
        <Stack spacing={3}>
          <Box>
            <Stack
              direction='row'
              spacing={2}
              sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
            >
              <Box>
                <Typography variant='h5' fontWeight={600}>
                  {restaurant.name}
                </Typography>

                <Typography
                  variant='body2'
                  color='textSecondary'
                  sx={{ mt: 0.5 }}
                >
                  {restaurant.slug}
                </Typography>
              </Box>

              <Chip
                label={restaurant.status}
                color={statusColor}
                size='small'
              />
            </Stack>
          </Box>

          <Divider />

          <Box>
            <Typography variant='subtitle1' fontWeight={600} gutterBottom>
              Basic Information
            </Typography>

            <Stack spacing={1.5}>
              <InfoRow
                label='Description'
                value={restaurant.description || "Not provided"}
              />

              <InfoRow
                label='Phone'
                value={restaurant.phone || "Not provided"}
              />

              <InfoRow
                label='Email'
                value={restaurant.email || "Not provided"}
              />

              <InfoRow
                label='Pure Vegetarian'
                value={restaurant.isPureVeg ? "Yes" : "No"}
              />
            </Stack>
          </Box>

          <Divider />

          <Box>
            <Typography variant='subtitle1' fontWeight={600} gutterBottom>
              Images
            </Typography>

            <Stack spacing={2}>
              <ImagePreview label='Logo' imageUrl={restaurant.logoUrl} />

              <ImagePreview
                label='Cover Image'
                imageUrl={restaurant.coverImageUrl}
              />
            </Stack>
          </Box>

          <Divider />

          <Box>
            <Typography variant='subtitle1' fontWeight={600} gutterBottom>
              Restaurant Statistics
            </Typography>

            <Stack direction='row' spacing={4}>
              <Stat
                label='Average Rating'
                value={restaurant.averageRating ?? 0}
              />

              <Stat
                label='Total Reviews'
                value={restaurant.totalReviews ?? 0}
              />
            </Stack>
          </Box>

          <Divider />

          <Box>
            <Typography variant='subtitle1' fontWeight={600} gutterBottom>
              System Information
            </Typography>

            <Stack spacing={1.5}>
              <InfoRow label='Restaurant ID' value={restaurant.id} />

              <InfoRow
                label='Created At'
                value={
                  restaurant.createdAt
                    ? new Date(restaurant.createdAt).toLocaleString()
                    : "Unknown"
                }
              />
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

function InfoRow({ label, value }) {
  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 0.5, sm: 2 }}>
      <Typography variant='body2' color='text.secondary' sx={{ minWidth: 130 }}>
        {label}
      </Typography>

      <Typography variant='body2'>{value}</Typography>
    </Stack>
  );
}

function ImagePreview({ label, imageUrl }) {
  return (
    <Box>
      <Typography variant='body2' color='textSecondary' gutterBottom>
        {label}
      </Typography>

      {imageUrl ? (
        <Box
          component='img'
          src={imageUrl}
          alt={label}
          sx={{
            width: "100%",
            maxWidth: 300,
            height: 140,
            objectFit: "cover",
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
          }}
        />
      ) : (
        <Typography variant='body2' color='textSecondary'>
          No image provided
        </Typography>
      )}
    </Box>
  );
}

function Stat({ label, value }) {
  return (
    <Box>
      <Typography variant='h6' fontWeight={600}>
        {value}
      </Typography>

      <Typography variant='body2' color='textSecondary'>
        {label}
      </Typography>
    </Box>
  );
}

export default RestaurantInfoCard;
