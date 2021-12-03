import { createTheme } from "@mui/material/styles";

export const defaultContentPadding = {
  paddingLeft: {
    xs: 2,
    md: "5%",
    xl: "10%",
  },
  paddingRight: {
    xs: 2,
    md: "5%",
    xl: "10%",
  },
};

export const absoluteCenterVertically = {
  top: "50%",
  transform: "translate(0%, -50%)",
};

export default createTheme({
  palette: {
    mode: "dark",
    secondary: {
      main: "#ffffff",
    },
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    h2: {
      fontSize: 48,
      fontWeight: 600,
    },
    h3: {
      fontSize: 36,
      fontWeight: 600,
    },
    h4: {
      fontSize: 28,
      fontWeight: 600,
    },
    h5: {
      fontSize: 26,
      fontWeight: 700,
    },
    subtitle1: {
      fontSize: 22,
      fontWeight: 600
    },
    body1: {
      fontSize: 16,
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        sx: {
          fontWeight: 600,
          fontSize: 16,
        },
      },
      variants: [
        {
          props: { variant: "outlined" },
          style: {
            border: "2px solid white",
            borderRadius: 40,
            textTransform: "none",
            height: 35,
            "&:hover": {
              border: "2px solid white",
            },
          },
        },
      ],
    },
  },
});
