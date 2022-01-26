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

  return (
    <Box
      sx={{
        backgroundImage: `url(${getSingleAssetSrc("LANDING").default})`,
        backgroundPositionX: {
          xs: "left",
          lg: "center",
        },
        backgroundRepeat: "no-repeat",
        // backgroundSize: "100%",
        backgroundSize: {
          xs: "cover",
          lg: "100%",
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
            flexDirection: {
              xs: "column-reverse",
              md: "row",
            },
            justifyContent: "flex-start",
            margin: {
              xs: "41px 30px 0 30px",
              md: "82px 30px 0 30px",
            },
          }}
        >
            <Box
              component="img"
              sx={{
                position: {
                  xs: "unset",
                  md: "relative",
                },
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
                margin: {
                  xs: "column-reverse",
                  md: "0 20px 0 48px",
                },
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
