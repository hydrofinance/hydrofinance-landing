import { Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";
import { getSingleAssetSrc } from "../../utils/getSingleAssetSrc";
import { defaultContentPadding, textShadow } from "../../utils/theme";
import { makeStyles } from "@mui/styles";
import DolphinHandShake from "../../assets/Handshake.gif";
import SectionBox from "../../common/components/SectionBox";

const useStyles = makeStyles({
  fontBold: {
      fontWeight: "700"
  },
});

export default function Disclaimer() {
  const { t } = useTranslation();
  const classes = useStyles();

  const bigHeight = useMediaQuery("(min-height:700px)");

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
            flexDirection: "row",
            justifyContent: "flex-start",
            margin: "82px 30px 0 30px",
          }}
        >
            <Box
              component="img"
              sx={{
                position: "relative",
                top: "-39px",
                height: "195px",
                width: "225px",
              }}
              src={DolphinHandShake}
              alt="Dolphin"
            />
            <Typography
              variant="body1"
              sx={{
                fontWeight: "400",
                margin: "0 20px 0 48px",
                fontSize: "20px",
                lineHeight: "23.44px",
                textShadow : "0px 2px 2px #00000066",
              }}
            >
              <span className={classes.fontBold}>{t("disclaimerHeader")} </span> 
              <span >{t("disclaimerDescription")}</span>
            </Typography>
        </Box>
      </SectionBox>
    </Box>
  );
}
