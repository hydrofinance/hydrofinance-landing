import { Button } from "@mui/material";
import Box from "@mui/system/Box";
import React from "react";
import { useTranslation } from "react-i18next";
import { networkSetup } from "../../web3/networkSetup";
import { useSnackbar } from "../redux/snackbar";

export default function AirdropDisconnected() {
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();

  const targetNetworkSetup = React.useCallback(() => {
    networkSetup(1285)
      .then(() => {})
      .catch((e) => {
        if (typeof e === "object" && typeof e.message === "string") {
          showSnackbar({ message: e.message, type: "error" });
        } else if (typeof e === "string") {
          showSnackbar({ message: e, type: "error" });
        } else {
          showSnackbar({ message: t("networkUnknownError"), type: "error" });
        }
      });
  }, [t, showSnackbar]);

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
      <Button variant="outlined" color="secondary" onClick={targetNetworkSetup}>
        {t("switchToMoonriver")}
      </Button>
    </Box>
  );
}
