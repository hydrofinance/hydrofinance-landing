import React from "react";
import { Box, Typography, Button } from "@mui/material";
import BigNumber from "bignumber.js";
import { useTranslation } from "react-i18next";
import { useFetchClaim } from "../../main/redux/fetchClaim";
import { useFetchIsAirdropStarted } from "../../main/redux/fetchIsAirdropStarted";
import { useFetchPendingClaim } from "../../main/redux/fetchPendingClaim";
import { useConnectWallet } from "../redux/connectWallet";
import { useSnackbar } from "../redux/snackbar";
import AddressField from "./AddressField";

const FETCH_IS_STARTED_INTERVAL_MS = 15 * 1000;

export default function AirdDropAvailable() {
  const { t } = useTranslation();

  const { userInfo } = useFetchPendingClaim();
  const { fetchPendingClaim, claimingPending } = useFetchClaim();
  const { showSnackbar } = useSnackbar();
  const { fetchIsAirdropStarted, isAirdropStarted, isAirdropStartedPending } =
    useFetchIsAirdropStarted();
  const { address } = useConnectWallet();

  const handleClaim = () => {
    fetchPendingClaim()
      .then(() => {
        showSnackbar({ message: t("airdropClaimSuccess"), type: "success" });
      })
      .catch((error) => {
        showSnackbar({
          message: t("airdropClaimError", { error }),
          type: "error",
        });
      });
  };

  React.useEffect(() => {
    const fetch = () => {
      if (!isAirdropStartedPending) {
        fetchIsAirdropStarted();
      }
    };
    fetch();

    const id = setInterval(fetch, FETCH_IS_STARTED_INTERVAL_MS);
    return () => {
      clearInterval(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchIsAirdropStarted]);

  let userInfoValue = userInfo?.amount;
  if (userInfoValue) {
    if (userInfoValue.isLessThan(new BigNumber(2))) {
      userInfoValue = userInfoValue.decimalPlaces(12, BigNumber.ROUND_DOWN);
    } else if (userInfoValue.isLessThan(new BigNumber(10000))) {
      userInfoValue = userInfoValue.decimalPlaces(6, BigNumber.ROUND_DOWN);
    } else {
      userInfoValue = userInfoValue.decimalPlaces(3, BigNumber.ROUND_DOWN);
    }
  }

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
            {t("airdropRewardsAvailable")}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#40B3E0", display: "inline" }}
          >
            {userInfoValue?.toFormat() || "-"}
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
              !isAirdropStarted ||
              !userInfo ||
              userInfo.amount.isZero() ||
              claimingPending
            }
            onClick={handleClaim}
          >
            {t("airdropClaim")}
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <AddressField
          headerText="airdropClaimToWallet"
          address={address || ""}
          disableCopy
          shortenAddress
        />
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography variant="body1" sx={{ width: "100%" }}>
          {t("airdropStarts")}
        </Typography>
        <Typography variant="body1" sx={{ width: "100%" }}>
          10:00pm DEC 10th 2021 (UTC)
        </Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1" sx={{ width: "100%" }}>
          {t("airdropEnds")}
        </Typography>
        <Typography variant="body1" sx={{ width: "100%" }}>
          10:00pm DEC 17th 2021 (UTC)
        </Typography>
      </Box>
    </Box>
  );
}
