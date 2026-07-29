import { Outlet } from "react-router";

import { Box, Container, Paper, Typography } from "@mui/material";

function AuthLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "background.default",
        py: 4,
      }}
    >
      <Container maxWidth='sm'>
        <Typography
          variant='h4'
          color='primary'
          fontWeight={800}
          sx={{
            mb: 3,
            textAlign: "center",
            fontWeight: "800",
          }}
        >
          Omato
        </Typography>

        <Paper
          elevation={2}
          sx={{
            p: {
              xs: 3,
              sm: 5,
            },
            borderRadius: 2,
          }}
        >
          <Outlet />
        </Paper>
      </Container>
    </Box>
  );
}

export default AuthLayout;
