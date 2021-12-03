import React from "react";
import Link from "@mui/material/Link";
import Box, { BoxProps } from "@mui/material/Box";
import HYDRO from "../../assets/HYDRO.png";
import { defaultContentPadding } from "../../utils/theme";

export default function Header(props: BoxProps) {
  const { sx, ...other } = props;

  return (
    <Box
      sx={{
        ...defaultContentPadding,
        display: "flex",
        flexDirection: "row",
        flexFlow: "row wrap",
        alignItems: "center",
        minHeight: 64,
        zIndex: "1000",
        ...sx,
      }}
      {...other}
    >
      <Link href={"https://hydroprotocol.finance"}>
        <img src={HYDRO} alt="RivrKitty" />
      </Link>
    </Box>
  );
}
