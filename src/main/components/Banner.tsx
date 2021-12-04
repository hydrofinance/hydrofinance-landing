import { Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import React from "react";
import { useTranslation } from "react-i18next";
import { getSingleAssetSrc } from "../../utils/getSingleAssetSrc";
import { defaultContentPadding, textShadow } from "../../utils/theme";
import { makeStyles } from "@mui/styles";
import HYDROLANDING from "../../assets/HYDROLANDING.png";
import useMediaQuery from '@mui/material/useMediaQuery';

const useStyles = makeStyles({
  input: {
    borderRadius: "20px 0px 0 20px",
    color: "white",
    height: 48,
    padding: "0 8px",
    border: "2px solid #fff",
    "& input:disabled": {
      color: "rgba(255, 255, 255)",
      textFillColor: "rgba(255,255,255)"

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
});

export default function Banner() {
  const { t } = useTranslation();
  const contractTobeCopied = 'contractTobeCopied';
  const classes = useStyles();
  const isMobileorTab = useMediaQuery('(max-width:899px)');

  const handleOnCopy=()=>{
    navigator.clipboard.writeText(contractTobeCopied)
  } 
  return (
    <Box
      sx={{
        backgroundImage: `url(${getSingleAssetSrc("LANDING").default})`,
        backgroundPositionX: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: {
          sx: "auto 100%",
          lg: "100% 100%",
        },
        width: "100%",
        maxHeight: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          ...defaultContentPadding,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="body1" sx={textShadow}>
          {t("welcomeTo")}
        </Typography>
        <Box>
          <img style={{maxWidth: "100%"}} src={HYDROLANDING} alt="Hydro" />
        </Box>
        <Typography variant="subtitle2" sx={{ mt: "-8px", ...textShadow }}>
          {t("hydroDescription")}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <TextField
            disabled
            InputProps={{ className: ` ${classes.input} ${isMobileorTab && classes.mobileInput}` }}
            fullWidth
            defaultValue="Contract to be confirmed"
            id="fullWidth"
          />
          <Button
            variant="outlined"
            color="secondary"
            sx={{
              fontSize: 14,
              fontWeight: 500,
              pl: 3,
              pr: 3,
              height: {xs: "30px", md: "48px"}
            }}
            className={classes.button}
            onClick={handleOnCopy}
          >
            {t("Copy")}
          </Button>
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
    </Box>
  );
}
