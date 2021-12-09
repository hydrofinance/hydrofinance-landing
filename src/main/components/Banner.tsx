import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useTranslation } from "react-i18next";
import { getSingleAssetSrc } from "../../utils/getSingleAssetSrc";
import { defaultContentPadding, textShadow } from "../../utils/theme";
import { makeStyles } from "@mui/styles";
import HYDROLANDING from "../../assets/HYDROLANDING.svg";
import SectionBox from "../../common/components/SectionBox";
import AddressField from "../../common/components/AddressField";

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
  // const hydroContract = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
  const classes = useStyles();

  // const handleOnCopy = () => {
  //   navigator.clipboard.writeText(hydroContract);
  // };
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
        minHeight: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <SectionBox>
        <Box
          sx={{
            ...defaultContentPadding,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <Typography variant="body1" sx={textShadow}>
            {t("welcomeTo")}
          </Typography>
          <Box>
            <img
              style={{ maxWidth: "100%" }}
              className={classes.logoImg}
              src={HYDROLANDING}
              alt="Hydro"
            />
          </Box>
          <Typography
            variant="subtitle2"
            sx={{ mt: "-5px", ...textShadow, lineHeight: "18.75px" }}
          >
            {t("hydroDescription")}
          </Typography>
          <Box sx={{ width: "50%" }}>
            <AddressField address="0xaC1fD1ECc463A7d2CCA77006E314D645B4766E9E" />
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
              href="https://www.huckleberry.finance/#/swap?outputCurrency=TODO"
              target="_blank"
              disabled
            >
              {t("buyNow")}
            </Button>
            <Button
              variant="text"
              color="secondary"
              sx={{
                fontSize: 16,
                fontWeight: 500,
                pl: 3,
                pr: 3,
              }}
              disabled
            >
              {t("liveChart")}
            </Button>
          </Box>
        </Box>
      </SectionBox>
    </Box>
  );
}
