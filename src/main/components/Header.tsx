import React, { useState } from "react";
import Link from "@mui/material/Link";
import Box, { BoxProps } from "@mui/material/Box";
import HYDRO from "../../assets/HYDRO.svg";
import { defaultContentPadding } from "../../utils/theme";
import SocialButton from "../../common/components/SocialButton";
import { Button, Hidden } from "@mui/material";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";
import ClaimAirDrop from "./ClaimAirDrop";

const useHeaderStyles = makeStyles({
  logoImg: {
    marginLeft: "-3px",
  },
});

export default function Header(props: BoxProps) {
  const { sx, ...other } = props;
  const [isModalOpen, setModalOpen] = useState(false);
  const { t } = useTranslation();

  const classes = useHeaderStyles();

  const handleClaimAirdrop = () => {
    setModalOpen(true);
  };

  const closeModalCallback = () => {
    setModalOpen(false);
  }
  
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
      <Hidden mdDown>
        <SocialButton />
        <Box sx={{ mr: 2 }} />
      </Hidden>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleClaimAirdrop}
        sx={{
          width: {
            sx: "100px",
            md: "155px",
          },
          backgroundColor: "#ffffff33",
        }}
      >
        {t("claimAirdrop")}
      </Button>
      <ClaimAirDrop isOpen={isModalOpen} closeModalCallback={closeModalCallback}/>
      <Hidden mdUp>
        <Box sx={{ ml: 2 }} />
        <SocialButton />
      </Hidden>
    </Box>
  );
}
