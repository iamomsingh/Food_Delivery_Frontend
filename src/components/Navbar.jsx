import { BorderBottom, BorderColor } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router";

function Navbar() {
  return (
    <AppBar
      position='sticky'
      color='inherit'
      elevation={0}
      sx={{
        BorderBottom: 1,
        BorderColor: "divider",
      }}
    >
      <Container maxWidth='lg'>
        <Toolbar
          disableGutters
          // sx={{
          //   minHeight: 72,
          // }}
        >
          <Typography
            variant='h5'
            component={Link}
            to='/'
            color='primary'
            fontWeight={800}
            sx={{
              textDecoration: "none",
            }}
          >
            Omato
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              alignItems: "center",
              gap: 1,
            }}
          >
            <Button component={Link} to='/' color='inherit'>
              Restaurants
            </Button>

            <Button component={Link} to='/orders' color='inherit'>
              Orders
            </Button>

            <IconButton component={Link} to='/cart'>
              <Badge badgeContent={0} color='primary'>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <IconButton component={Link} to='/profile'>
              <PersonIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: {
                xs: "flex",
                md: "none",
              },

              alignItems: "center",
            }}
          >
            <IconButton>
              <Badge badgeContent={0} color='primary'>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <IconButton>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
