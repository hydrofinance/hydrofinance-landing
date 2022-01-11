import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useConnectWallet } from "../redux/connectWallet";
import { useSnackbar } from "../redux/snackbar";
import AddressField from "./AddressField";
import { useV2Migrate } from "../../main/redux/v2Migrate";
import { useFetchBalance } from "../../main/redux/fetchBalance";
import { formatToFit } from "../../utils/bignumber";


export default function ContentV2Migrate() {
  const { t } = useTranslation();

  const { v1Balance, v1ApprovalBalance } = useFetchBalance();
  const { migrate, approve, migratePending, approvePending } = useV2Migrate();
  const { showSnackbar } = useSnackbar();
  const { address } = useConnectWallet();

  const handleMigrate = () => {
    migrate()
      .then(() => {
        showSnackbar({ message: t("migrateSuccess"), type: "success" });
      })
      .catch((error) => {
        showSnackbar({
          message: t("migrateError", { error }),
          type: "error",
        });
      });
  };

  const handleApprove = () => {
    approve()
      .then(() => {
        showSnackbar({ message: t("migrateApproveSuccess"), type: "success" });
      })
      .catch((error) => {
        showSnackbar({
          message: t("migrateError", { error }),
          type: "error",
        });
      });
  };

  const isApprovalNeeded = v1Balance && v1ApprovalBalance && v1ApprovalBalance.isLessThan(v1Balance);

  const handleAction = () => {
    isApprovalNeeded ? handleApprove() : handleMigrate();
  }

  let balance = v1Balance ? formatToFit(v1Balance) : null;

  return (
    <Box
      sx={{
        minHeight: "400px",
        maxWidth: {
          xs: "335px",
        },
        margin: "0 auto",
      }}
    >
      <Box
        sx={{
          height: "72px",
          maxWidth: {
            xs: "335px",
          },
          backgroundColor: "#fff",
          borderRadius: "40px",
          display: "flex",
          justifyContent: "space-around",
          margin: "0 auto",
          marginTop: 6
        }}
      >
        <Box
          sx={{
            mt: "auto",
            ml: 3,
          }}
        >
          <Typography
            variant="body1"
            sx={{ color: "#09060B", lineHeight: "19px" }}
          >
            {t("migrateAmountAvailable")}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#40B3E0", display: "inline" }}
          >
            {balance?.toFormat() || "-"}
          </Typography>
          <span
            style={{
              color: "#09060B",
              display: "inline",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            {" "}
            H2O
          </span>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            sx={{
              width: "90px",
              height: "56px",
              background: "linear-gradient(90deg, #8462B6 0%, #06AEC8 100%);",
              "&:hover": {
                opacity: 0.7,
              },
            }}
            disabled={
              !v1Balance ||
              migratePending ||
              approvePending ||
              v1Balance.isZero()
            }
            onClick={handleAction}
          >
            {isApprovalNeeded ? t("migrateApprove") : t("migrateAll")}
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <AddressField
          headerText="migrateToWallet"
          address={address || ""}
          disableCopy
          shortenAddress
        />
      </Box>
    </Box>
  );
}
