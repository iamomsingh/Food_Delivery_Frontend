import { Link } from "react-router-dom";

import { Typography } from "@mui/material";

function AppLogo() {
  return (
    <Typography
      component={Link}
      to='/'
      variant='h5'
      fontWeight={800}
      color='primary'
      sx={{
        textDecoration: "none",
        flexShrink: 0,
      }}
    >
      Omato
    </Typography>
  );
}

export default AppLogo;
