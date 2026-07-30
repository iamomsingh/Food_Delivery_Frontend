import {
  Box,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

function HeroSection({ searchTerm, onSearchChange }) {
  return (
    <Box component='section'>
      <Stack
        spacing={3}
        sx={{
          alignItems: "center",
          py: {
            xs: 6,
            md: 8,
          },
        }}
      >
        <Typography variant='h1'>Good food, delivered fast</Typography>

        <Typography color='textSecondary'>
          Discover your favorite restaurants and dishes near you.
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
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </Stack>
    </Box>
  );
}

export default HeroSection;
