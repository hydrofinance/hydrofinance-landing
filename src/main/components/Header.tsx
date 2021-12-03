import React from "react";
import Link from "@mui/material/Link";
import Box, { BoxProps } from "@mui/material/Box";
import HYDRO from "../../assets/HYDRO.png";
import { defaultContentPadding } from "../../utils/theme";
import SocialButton from "../../common/components/SocialButton";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function Header(props: BoxProps) {
  const { sx, ...other } = props;

  const { t } = useTranslation();

  return (
    <Box
      sx={{
        ...defaultContentPadding,
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
      <Link href={"https://hydroprotocol.finance"}>
        <img src={HYDRO} alt="RivrKitty" />
      </Link>
      <Box flex={1} />
      <SocialButton />
      <Button variant="outlined" color="secondary" sx={{ width: "155px", backgroundColor: "#ffffff33"}}>
        {t("claimAirdrop")}
      </Button>
    </Box>
  );
}
