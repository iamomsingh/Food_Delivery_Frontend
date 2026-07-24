import { Box, Button, Container, Typography } from "@mui/material";

import { Link } from "react-router";

function NotFoundPage() {
  return (
    <Container maxWidth='sm'>
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant='h2' fontWeight={800}>
          404
        </Typography>

        <Typography variant='h5' sx={{ mt: 2 }}>
          Page not found
        </Typography>

        <Typography color='text.secondary' sx={{ mt: 1, mb: 3 }}>
          The page you're looking for doesn't exist.
        </Typography>

        <Button component={Link} to='/' variant='contained'>
          Back to Home
        </Button>
      </Box>
    </Container>
  );
}

export default NotFoundPage;
