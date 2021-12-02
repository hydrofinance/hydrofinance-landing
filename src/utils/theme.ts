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
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
  },
});
