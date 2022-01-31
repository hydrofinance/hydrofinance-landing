import SectionBox from "../../common/components/SectionBox";
import { Grid, Typography, Box, Button } from "@mui/material";
import FancyDivider from "../../common/components/FancyDivider";
import { defaultContentPadding } from "../../utils/theme";
import { useTranslation } from "react-i18next";

function Content() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: { xs: "start", md: "center" },
      }}
    >
      <Typography variant="h3">{t("whyHydro")}</Typography>
      <Typography
        variant="subtitle1"
        sx={{
          textAlign: { xs: "start", md: "center" },
          fontWeight: 400,
          my: 2,
        }}
      >
        {t("whyHydroDescription")}
      </Typography>
      <Button
        variant="outlined"
        color="secondary"
        sx={{
          fontSize: 18,
          fontWeight: 500,
          pl: 5,
          pr: 5,
        }}
        href="https://hydroprotocol-1.gitbook.io/hydro-protocol/"
        target="_blank"
      >
        {t("learnMore")}
      </Button>
    </Box>
  );
}
export default function WhyHydro() {
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
        <Grid container sx={{ justifyContent: "center", alignItems: "center" }}>
          <Content />
        </Grid>
        <FancyDivider />
      </Box>
    </SectionBox>
  );
}
