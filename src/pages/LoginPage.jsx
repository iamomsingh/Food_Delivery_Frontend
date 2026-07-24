import { Container, Typography } from "@mui/material";

function LoginPage() {
  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Typography variant='h4' component='h1' fontWeight={700}>
        Login page
      </Typography>
    </Container>
  );
}

export default LoginPage;
