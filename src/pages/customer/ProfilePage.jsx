import { Container, Typography } from "@mui/material";

function ProfilePage() {
  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Typography variant='h4' component='h1' fontWeight={700}>
        Profile page
      </Typography>
    </Container>
  );
}

export default ProfilePage;
