import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        mb: "20px",
      }}
    >
      <Typography variant="h3">{t("hydro")}</Typography>
      <Typography variant="body2" sx={{ ml: "12px" }}>
        {t("copyright")}
      </Typography>
    </Box>
  );
}
