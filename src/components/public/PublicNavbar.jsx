import { NavLink } from "react-router-dom";

import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import AppLogo from "../common/AppLogo";

function PublicNavbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar
      position='sticky'
      elevation={0}
      color='inherit'
      sx={{
        BorderBottom: 1,
        BorderColor: "divider",
      }}
    >
      <Container maxWidth='xl'>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <AppLogo />

          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Button component={NavLink} to='/' color='inherit'>
                Home
              </Button>

              <Button component={NavLink} to='/restaurants' color='inherit'>
                Restaurants
              </Button>

              <Button component={NavLink} to='/login' color='inherit'>
                Login
              </Button>

              <Button component={NavLink} to='/register' variant='contained'>
                Register
              </Button>
            </Box>
          )}

          {isMobile && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <Button component={NavLink} to='/login' variant='contained'>
                Login
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default PublicNavbar;
