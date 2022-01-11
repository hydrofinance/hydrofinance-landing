import { Button, Typography } from "@mui/material";
import Box from "@mui/system/Box";
import React from "react";
import { useTranslation } from "react-i18next";
import { Web3ModalProvider } from "../contexts/Web3ModalProvider";
import { useConnectWallet } from "../redux/connectWallet";

export default function ContentDisconnected() {
  const { t } = useTranslation();
  const { connectWallet } = useConnectWallet();
  const web3Modal = React.useContext(Web3ModalProvider);
  const connectWalletCallback = React.useCallback(() => {
    web3Modal && connectWallet(web3Modal);
  }, [web3Modal, connectWallet]);

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
        {t("connectToNetworkInfo")}
      </Typography>
      <Button
        sx={{ mt: 2 }}
        variant="outlined"
        color="secondary"
        onClick={connectWalletCallback}
      >
        {t("connectToNetwork")}
      </Button>
    </Box>
  );
}
