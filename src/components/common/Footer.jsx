import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Footer() {
  return (
    <Box
      component='footer'
      sx={{
        py: 3,
        textAlign: "center",
      }}
    >
      <Typography>© 2026 Omato</Typography>
    </Box>
  );
}

export default Footer;
