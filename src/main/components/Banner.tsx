import { Button, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useTranslation } from "react-i18next";
import { getSingleAssetSrc } from "../../utils/getSingleAssetSrc";
import { defaultContentPadding, textShadow } from "../../utils/theme";
import { makeStyles } from "@mui/styles";
import HydroLandingImage from "../../assets/HYDROLANDING.svg";
import Flipper from "../../assets/Flipper.gif";
import CoinGeckoIcon from "../../assets/CoinGecko.svg";
import SectionBox from "../../common/components/SectionBox";
import AddressField from "../../common/components/AddressField";
import PriceStats from "./PriceStats";

const useStyles = makeStyles({
  input: {
    borderRadius: "20px 0px 0 20px",
    color: "white",
    height: 48,
    padding: "0 8px",
    border: "2px solid #fff",
    "& input:disabled": {
      color: "rgba(255, 255, 255)",
      textFillColor: "rgba(255,255,255)",
    },
  },
  mobileInput: {
    height: "30px",
    fontSize: "14px",
  },
  button: {
    padding: 7,
    borderRadius: "0 20px 20px 0",
    width: "200px",
    background: "#ffffff",
    color: "#40B3E0",
    fontSize: "16px",
    fontWeight: "500px",
    "&:hover": {
      background: "#ffffff",
    },
  },
  logoImg: {
    marginLeft: "-3px",
  },
});

export default function Banner() {
  const { t } = useTranslation();
  const classes = useStyles();

  const bigHeight = useMediaQuery("(min-height:700px)");
  const mediumWidth = useMediaQuery("(min-width:500px)");

  return (
    <Box
      sx={{
        backgroundImage: `url(${getSingleAssetSrc("LANDING").default})`,
        backgroundPositionX: {
          xs: "left",
          lg: "center",
        },
        backgroundRepeat: "no-repeat",
        backgroundSize: {
          xs: "auto 100%",
          lg: "100% 100%",
        },
        width: "100%",
        minHeight: {
          xs: "1050px",
          md: bigHeight ? "100%" : "1130px",
        },
        height: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <SectionBox>
        <Box
          sx={{
            ...defaultContentPadding,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <Box
            sx={{
              position: "relative",
              mt: {
                xs: "-140px",
                md: "-40px",
              },
            }}
          >
            <Box
              component="img"
              sx={{
                position: "absolute",
                zIndex: 0,
                width: { xs: "340px", md: "500px" },
                right: { xs: "inherit", md: "0%", lg: "10%" },
                left: { xs: "0%", md: "inherit" },
                top: { xs: "-260px", md: "-160px" },
              }}
              src={Flipper}
              alt="Flipper"
            />
            <Typography
              variant="body1"
              sx={{
                position: "absolute",
                zIndex: 1,
                top: "-27%",
                left: 0,
                ...textShadow,
              }}
            >
              {t("welcomeTo")}
            </Typography>
            <Box
              component="img"
              style={{ maxWidth: "100%", zIndex: 2, position: "relative" }}
              className={classes.logoImg}
              src={HydroLandingImage}
              alt="Hydro"
            />
          </Box>
          <Typography
            variant="subtitle2"
            sx={{
              mt: {
                xs: "0px",
                md: "-5px",
              },
              ...textShadow,
              lineHeight: "18.75px",
              fontSize: {
                xs: 16,
                md: "inherit",
              },
            }}
          >
            {t("hydroDescription")}
          </Typography>
          <Box
            sx={{
              width: {
                xs: "100%",
                md: "50%",
              },
            }}
          >
            <AddressField address="0x56cfe76545939AFAbc8BDbA94192A96801D24d28" />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Button
              variant="outlined"
              color="secondary"
              sx={{
                fontSize: 14,
                fontWeight: 500,
                pl: 3,
                pr: 3,
              }}
              href="https://www.huckleberry.finance/#/swap?outputCurrency=0x56cfe76545939AFAbc8BDbA94192A96801D24d28"
              target="_blank"
            >
              {mediumWidth ? t("buyNow") : "Buy"}
            </Button>
            <Button
              variant="text"
              color="secondary"
              sx={{
                fontSize: 16,
                fontWeight: 500,
                pl: 2,
                pr: 2,
                ml: 1,
              }}
              href="https://geckoterminal.com/movr/pools/0x6f0c50fb6270f206a074f8058f165720c7a9761c"
              target="_blank"
            >
              {mediumWidth ? t("liveChart") : "Chart"}
            </Button>
            <Button
              variant="text"
              color="secondary"
              sx={{
                fontSize: 16,
                fontWeight: 500,
                pl: 2,
                pr: 2,
                ml: 1,
              }}
              href="https://www.coingecko.com/en/coins/hydro-protocol-token"
              target="_blank"
            >
              <Box
                component="img"
                src={CoinGeckoIcon}
                alt={"CoinGecko"}
                sx={{ width: 27, height: 27, marginRight: 1 }}
              />
              CoinGecko
            </Button>
          </Box>
          <PriceStats
            sx={{
              position: "absolute",
              bottom: 48,
              left: 0,
              right: 0,
              width: "100%",
              ...defaultContentPadding,
            }}
          />
        </Box>
      </SectionBox>
    </Box>
  );
}
