import { AlertColor } from "@mui/material/Alert";
import Web3 from "web3";

export type SnackbarInfo = {
  message?: string;
  messageKey?: string;
  type: AlertColor;
};

export type CommonState = {
  address: string | null;
  web3: Web3 | null;
  connected: boolean;
  networkId: number | null;
  connectWalletPending?: boolean;
  disconnectWalletPending?: boolean;
  snackbar: SnackbarInfo | null;
};
