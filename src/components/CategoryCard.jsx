import { Card, CardActionArea, Typography } from "@mui/material";

function CategoryCard({ category, selected, onSelect }) {
  return (
    <Card
      elevation={2}
      sx={{
        border: selected ? "2px solid" : "1px solid",
        borderColor: selected ? "primary.main" : "divider",
        bgcolor: selected ? "primary.light" : "background.paper",
        minWidth: 108,
        borderRadius: 1.5,
      }}
    >
      <CardActionArea
        onClick={onSelect}
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
