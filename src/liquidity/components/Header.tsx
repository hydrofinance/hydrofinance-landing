import React from "react";
import Link from "@mui/material/Link";
import Box, { BoxProps } from "@mui/material/Box";
import HYDRO from "../../assets/HYDRO.svg";
import { defaultContentPadding } from "../../utils/theme";
import { makeStyles } from "@mui/styles";
import WalletButton from "../../common/components/WalletButton";

const useHeaderStyles = makeStyles({
  logoImg: {
    marginLeft: "-3px",
  },
});

export default function Header(props: BoxProps) {
  const { sx, ...other } = props;

  const classes = useHeaderStyles();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexFlow: "row wrap",
        alignItems: "center",
        minHeight: 76,
        zIndex: "1000",
        ...defaultContentPadding,
        ...sx,
      }}
      {...other}
    >
      <Link href={"https://hydroprotocol.finance"} sx={{ mt: 1 }}>
        <img src={HYDRO} className={classes.logoImg} alt="Hydro" />
      </Link>
      <Box flex={1} />
      <WalletButton />
    </Box>
  );
}
