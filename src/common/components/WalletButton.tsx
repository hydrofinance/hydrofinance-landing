import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Hidden from "@mui/material/Hidden";
import Avatar from "@mui/material/Avatar";
import { useTranslation } from "react-i18next";
import RoundedButton from "./RoundedButton";
import { Web3ModalProvider } from "../contexts/Web3ModalProvider";
import { useConnectWallet } from "../redux/connectWallet";
const { renderIcon } = require("@download/blockies");

const useStyles = makeStyles({
  button: {},
});

export default function WalletButton() {
  const classes = useStyles();
  const { t } = useTranslation();
  const [shortAddress, setShortAddress] = React.useState("");
  const [dataUrl, setDataUrl] = React.useState<string | null>(null);
  const { connectWallet, address, connected } = useConnectWallet();
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const web3Modal = React.useContext(Web3ModalProvider);

  const connectWalletCallback = React.useCallback(() => {
    web3Modal && connectWallet(web3Modal);
  }, [web3Modal, connectWallet]);

  React.useEffect(() => {
    if (web3Modal && (web3Modal.cachedProvider || window.ethereum)) {
      connectWallet(web3Modal);
    }
  }, [web3Modal, connectWallet]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!connected || !address || !canvas) {
      return;
    }

    renderIcon({ seed: address.toLowerCase() }, canvas);
    const updatedDataUrl = canvas.toDataURL();
    if (updatedDataUrl !== dataUrl) {
      setDataUrl(updatedDataUrl);
    }
    if (address.length < 11) {
      setShortAddress(address);
    } else {
      setShortAddress(`${address.slice(0, 6)}...${address.slice(-4)}`);
    }
  }, [dataUrl, address, connected]);

  return (
    <>
      <RoundedButton
        disableElevation
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={connected ? () => {} : connectWalletCallback}
      >
        {connected ? (
          <>
            <canvas ref={canvasRef} style={{ display: "none" }} />
            <Avatar
              alt="address"
              src={dataUrl || ""}
              style={{
                width: "24px",
                height: "24px",
                marginRight: "4px",
              }}
            />
            <Hidden smDown>{shortAddress}</Hidden>
          </>
        ) : (
          <>Connect</>
        )}
      </RoundedButton>
    </>
  );
}
