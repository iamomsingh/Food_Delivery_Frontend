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

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";

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
          sx={{
            minHeight: 72,
          }}
        >
          <Typography
            variant='h5'
            component='div'
            color='primary'
            fontWeight={800}
          >
            Omato
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Button color='inherit'>Restaurants</Button>

            <Button color='inherit'>Orders</Button>

            <IconButton>
              <Badge badgeContent={0} color='primary'>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <IconButton>
              <PersonIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
