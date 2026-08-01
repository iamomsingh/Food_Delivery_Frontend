import { Box, Button, Stack, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlined";

function ErrorState({ title, message, onRetry }) {
  return (
    <Box
      sx={{
        py: 8,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Stack spacing={2} alignItems='center' textAlign='center' maxWidth={450}>
        <ErrorOutlineIcon color='error' sx={{ fontSize: 64 }} />

        <Typography variant='h5' fontWeight={700}>
          {title}
        </Typography>

        <Typography variant='body1' color='text.secondary'>
          {message}
        </Typography>

        <Button variant='contained' onClick={onRetry}>
          Retry
        </Button>
      </Stack>
    </Box>
  );
}

export default ErrorState;
