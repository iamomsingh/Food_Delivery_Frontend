import { Card, CardActionArea, Typography } from "@mui/material";

function CategoryCard({ category }) {
  return (
    <Card
      elevation={2}
      sx={{
        minWidth: 108,
        borderRadius: 1.5,
      }}
    >
      <CardActionArea
        sx={{
          py: 3,
          px: 2,
          textAlign: "center",
        }}
      >
        <Typography
          variant='h3'
          sx={{
            mb: 1,
          }}
        >
          {category.emoji}
        </Typography>

        <Typography variant='subtitle1' fontWeight={600}>
          {category.name}
        </Typography>
      </CardActionArea>
    </Card>
  );
}

export default CategoryCard;
