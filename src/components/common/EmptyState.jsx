import { Box, Button, Stack, Typography } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";

function EmptyState({ title, message, actionLabel, onAction }) {
  return (
    <Box
      sx={{
        py: 8,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Stack
        spacing={2}
        sx={{ alignItems: "center", textAlign: "center", maxWidth: 450 }}
      >
        <SearchOffIcon
          sx={{
            fontSize: 64,
            color: "text.secondary",
          }}
        />

        <Typography variant='h5' fontWeight={700}>
          {title}
        </Typography>

        <Typography color='text.secondary'>{message}</Typography>

        {actionLabel && (
          <Button variant='contained' onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </Stack>
    </Box>
  );
}

export default EmptyState;
