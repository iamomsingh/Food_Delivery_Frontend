import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#E23744",
    },

    background: {
      default: "#FAFAFA",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#1C1C1C",
      secondary: "#696969",
    },
  },

  typography: {
    fontFamily: '"Inter", "Roboto", "Arial", sans-serif',

    h1: {
      fontWeight: 700,
    },

    h2: {
      fontWeight: 700,
    },

    h3: {
      fontWeight: 600,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 12,
  },
});

export default theme;
