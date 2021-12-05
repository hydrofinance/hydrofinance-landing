import React from "react";
import Link from "@mui/material/Link";
import Box, { BoxProps } from "@mui/material/Box";
import HYDRO from "../../assets/HYDRO.png";
import { defaultContentPadding } from "../../utils/theme";
import SocialButton from "../../common/components/SocialButton";
import { Button, Hidden } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTranslation } from "react-i18next";

export default function Header(props: BoxProps) {
  const { sx, ...other } = props;

  const { t } = useTranslation();
  
  const isLessThan1800 = useMediaQuery("(max-width: 1800px)");

  return (
    <Box
      sx={{
        ... isLessThan1800 ? defaultContentPadding : {},
        display: "flex",
        flexDirection: "row",
        flexFlow: "row wrap",
        alignItems: "center",
        minHeight: 76,
        zIndex: "1000",
        ...sx,
      }}
      {...other}
    >
      <Link href={"https://hydroprotocol.finance"} sx={{ mt: 1 }}>
        <img src={HYDRO} alt="Hydro" />
      </Link>
      <Box flex={1} />
      <Hidden mdDown>
        <SocialButton />
        <Box sx={{ mr: 2 }} />
      </Hidden>
      <Button
        variant="outlined"
        color="secondary"
        sx={{
          width: {
            sx: "100px",
            md: "155px",
          },
          backgroundColor: "#ffffff33",
        }}
        disabled
      >
        {t("claimAirdrop")}
      </Button>
      <Hidden mdUp>
        <Box sx={{ ml: 2 }} />
        <SocialButton />
      </Hidden>
    </Box>
  );
}
