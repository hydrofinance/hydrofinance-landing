import React from "react";
import {
  Modal,
  Box,
  Typography,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Fade from "@mui/material/Fade";
import AirdDropAvailable from "../../common/components/AirDropAvailable";
import AirdDropRewards from "../../common/components/AirDropRewards";
import { getSingleAssetSrc } from "../../utils/getSingleAssetSrc";
import close from "../../assets/close.png";
import { useConnectWallet } from "../../common/redux/connectWallet";
import { isValidNetworkId } from "../../web3/getNetworkData";
import AirdropDisconnected from "../../common/components/AirdropDisconnected";
import AirdropInvalidNetwork from "../../common/components/AirdropInvalidNetwork";
import { useFetchPendingClaim } from "../redux/fetchPendingClaim";

function Content() {
  const { networkId, connected } = useConnectWallet();

  const { userInfo, fetchPendingClaim } = useFetchPendingClaim();

  React.useEffect(() => {
    fetchPendingClaim();
  }, [fetchPendingClaim]);

  if (!connected) {
    return <AirdropDisconnected />;
  }

  const isValid = networkId ? isValidNetworkId(networkId) : null;
  if (!isValid) {
    return <AirdropInvalidNetwork />;
  }
  if (!userInfo) {
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
        <CircularProgress />
      </Box>
    );
  }
  if (userInfo.amount.isZero()) {
    return <AirdDropAvailable />;
  }

  return userInfo.amount.minus(userInfo.claimedAmount).isZero() ? (
    <AirdDropRewards />
  ) : (
    <AirdDropAvailable />
  );
}

export default function ClaimAirDrop(props: {
  isOpen: boolean;
  closeModalCallback: () => void;
}) {
  const { isOpen } = props;

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      xs: "400px",
    },
    maxHeight: "400px",
    background: `url(${getSingleAssetSrc("claimairdrop").default})`,
    borderRadius: "10px",
  };

  const maxWidth420 = useMediaQuery("(max-width: 420px)");

  const mobStyles = {
    wrapperBox: {
      width: "100%",
      backgroundRepeat: "no-repeat",
      borderRadius: "0",
      backgroundSize: "cover",
    },
  };

  const handleClose = () => {
    props.closeModalCallback();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      {/* <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit> */}
      <Fade in={isOpen}>
        <Box
          sx={{
            ...style,
            ...(maxWidth420 ? mobStyles.wrapperBox : {}),
          }}
        >
          <Box sx={{ pb: 3, pl: 3, pr: 3, pt: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                id="modal-modal-title"
                variant="subtitle1"
                sx={{ mb: 2, mt: 1 }}
              >
                Claim AirDrop
              </Typography>
              <img
                src={close}
                alt="Hydro"
                style={{ width: "27px", height: "27px", cursor: "pointer" }}
                onClick={handleClose}
              />
            </Box>
            <Content />
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
