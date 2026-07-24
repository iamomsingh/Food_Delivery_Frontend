import { Box, InputAdornment, TextField, Typography } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

function HeroSection() {
  return (
    <Box
      component='section'
      sx={{
        py: {
          xs: 6,
          md: 10,
        },

        px: {
          xs: 2,
          md: 4,
        },

        mt: 3,

        textAlign: "center",
        backgroundColor: "background.paper",
        borderRadius: {
          xs: 3,
          md: 5,
        },
      }}
    >
      <Typography
        component='h1'
        sx={{
          fontSize: {
            xs: "2rem",
            sm: "2.6rem",
            md: "3.5rem",
          },

          fontWeight: 800,
          lineHeight: 1.1,
          mb: 2,
        }}
      >
        Good food, delivered fast
      </Typography>

      <Typography
        color='text.secondary'
        sx={{
          fontSize: {
            xs: "1rem",
            md: "1.15rem",
          },

          mb: 4,
        }}
      >
        Discover restaurants and delicious dishes near you.
      </Typography>

      <TextField
        fullWidth
        placeholder='Search restaurants or dishes...'
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          maxWidth: 650,

          "& .MuiOutlinedInput-root": {
            backgroundColor: "background.paper",
            borderRadius: 3,
          },
        }}
      />
    </Box>
  );
}

export default HeroSection;
