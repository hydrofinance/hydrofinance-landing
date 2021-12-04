import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useTranslation } from "react-i18next";
import { getSingleAssetSrc } from "../../utils/getSingleAssetSrc";
import { defaultContentPadding, textShadow } from "../../utils/theme";

export default function Banner() {
  const { t } = useTranslation();

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
        <Box
          sx={{
            fontSize: {
              xs: 96,
              md: 136,
            },
            fontWeight: 700,
            mt: {
              xs: "-12px",
              md: "-24px",
            },
            ml: "-5px",
            ...textShadow,
          }}
        >
          {t("hydro")}
        </Box>
        <Typography variant="subtitle2" sx={{ mt: "-8px", ...textShadow }}>
          {t("hydroDescription")}
        </Typography>
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
