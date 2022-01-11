import { Typography } from "@mui/material";
import Box from "@mui/system/Box";
import React from "react";
import { useTranslation } from "react-i18next";

export default function ContentV2MigrateNoTokens() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        minHeight: "300px",
        maxWidth: {
          xs: "335px",
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        {t("migrateNoTokens")}
      </Typography>
    </Box>
  );
}
