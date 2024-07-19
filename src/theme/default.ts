import { createTheme } from "@mui/material";

export const DefaultTheme = createTheme({
  palette: {
    primary: {
      main: "#03D69D",
      light: "#E5E5E5",
    },
    secondary: {
      main: "#133A6F",
      light: "rgba(19, 58, 111, 0.8)",
    },
    text: {
      primary: "#4D4D4D",
      secondary: "#AFAFAF",
      disabled: "#E5E5E5",
    },
    common: {
      black: "#000000",
      white: "#FFFFFF",
    },
    background: {
      default: "#FFFFFF",
      paper: "#F4FBF9",
    },
    info: {
      main: "#B2B2B2",
    },
  },
  typography: {
    fontFamily: ["Nunito", "Arial", "sans-serif"].join(","),
    h1: {
      fontWeight: 800,
      fontSize: "1.5rem",
      lineHeight: "normal",
    },
    h2: {
      fontWeight: 600,
      fontSize: "1.125rem",
      lineHeight: "normal",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: "normal",
    },
    h4: {
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: "normal",
    },
    h5: {
      fontWeight: 300,
      fontSize: "0.75rem",
      lineHeight: "normal",
    },
    h6: {
      fontWeight: 300,
      fontSize: "0.625rem",
      lineHeight: "normal",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
  },
});
