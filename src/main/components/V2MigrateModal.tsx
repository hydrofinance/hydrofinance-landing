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
import { getSingleAssetSrc } from "../../utils/getSingleAssetSrc";
import close from "../../assets/close.png";
import { useConnectWallet } from "../../common/redux/connectWallet";
import { isValidNetworkId } from "../../web3/getNetworkData";
import ContentDisconnected from "../../common/components/ContentDisconnected";
import ContentInvalidNetwork from "../../common/components/ContentInvalidNetwork";
import { useFetchBalance } from "../redux/fetchBalance";
import ContentV2MigrateNoTokens from "../../common/components/ContentV2MigrateNoTokens";
import { useV2Migrate } from "../redux/v2Migrate";
import ContentV2Migrate from "../../common/components/ContentV2Migrate";
import ContentV2MigrateSuccess from "../../common/components/ContentV2MigrateSuccess";

function Content() {
  const { networkId, connected } = useConnectWallet();

  const { v1Balance, fetchBalance } = useFetchBalance();
  const { migrateDone } = useV2Migrate();

  React.useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  if (!connected) {
    return <ContentDisconnected />;
  }

  const isValid = networkId ? isValidNetworkId(networkId) : null;
  if (!isValid) {
    return <ContentInvalidNetwork />;
  }
  if (!v1Balance) {
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

  if (migrateDone) {
    return <ContentV2MigrateSuccess />;
  } else if (v1Balance.isZero()) {
    return <ContentV2MigrateNoTokens />;
  } else {
    return <ContentV2Migrate />;
  }
}

export default function V2MigrateModal(props: {
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
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
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
                V2 Upgrade
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
