import { Box, Stack, Typography } from "@mui/material";

import CategoryCard from "./CategoryCard";
import { categories } from "../data/categoriesData";

function CategorySection() {
  return (
    <Box
      component='section'
      sx={{
        py: 3,
      }}
    >
      <Stack spacing={2}>
        <Typography variant='h3'>Categories</Typography>

        <Stack
          direction='row'
          spacing={2}
          sx={{
            overflowX: "auto",
            pb: 1,

            "&::-webkit-scrollbar": {
              display: "none",
            },

            scrollbarWidth: "none",
          }}
        >
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}

export default CategorySection;
