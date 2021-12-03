import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Trans, useTranslation } from "react-i18next";
import FancyDivider from "../../common/components/FancyDivider";
import SectionBox from "../../common/components/SectionBox";
import SectionTitle from "../../common/components/SectionTitle";
import { defaultContentPadding } from "../../utils/theme";
import SYSTEM from "../../assets/SYSTEM.svg";

function Content() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <SectionTitle>{t("aboutUs")}</SectionTitle>
      <Typography variant="h2" sx={{ mt: 1 }}>
        <Trans i18nKey="aboutUsTitle">
          Part0<span style={{ fontWeight: 500 }}>Part1</span>Part2
        </Trans>
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        <Trans i18nKey="aboutUsDescription">
          Part0<span style={{ fontWeight: 700 }}>Part1</span>Part2
          <span style={{ fontWeight: 700 }}>Part3</span>Part4
        </Trans>
      </Typography>
      <Box
        component="ol"
        style={{
          paddingInlineStart: "14px",
        }}
        sx={{
          fontWeight: 700,
          fontSize: 16,
          ml: 1,
        }}
      >
        {[...Array.from({ length: 5 }, (_, index) => index)].map((k) => (
          <Box key={k} component="li" sx={{ lineHeight: "140%" }}>
            {t(`aboutUsPoint${k + 1}`)}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default function AboutUs() {
  return (
    <SectionBox>
      <Box
        sx={{
          ...defaultContentPadding,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <FancyDivider />
        <Grid container sx={{ mt: 4, mb: 4 }}>
          <Grid item xs={12} md={7}>
            <Content />
          </Grid>
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              component="img"
              src={SYSTEM}
              alt="NFT"
              style={{ alignSelf: "center", maxWidth: "100%" }}
            />
          </Grid>
        </Grid>
        <FancyDivider />
      </Box>
    </SectionBox>
  );
}
