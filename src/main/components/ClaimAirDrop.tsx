import { Modal, Box, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import AirdDropAvailable from "../../common/components/AirDropAvailable";
import AirdDropRewards from "../../common/components/AirDropRewards";
import { getSingleAssetSrc } from "../../utils/getSingleAssetSrc";
import close from '../../assets/close.png';
import { useState } from "react";

export default function ClaimAirDrop(props: { isOpen: boolean, closeModalCallback: ()=>void }) {
  const { isOpen } = props;

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      xs: "400px"
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
        backgroundSize: "100%"
    }
  };
  const [showRewards, setShowRewards] = useState(false);

  const handleClaim = () => {
    setShowRewards(true);
  }

  const handleClose = () => {
    setShowRewards(false);
    props.closeModalCallback();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={
        {
          ...style,
          ... maxWidth420 ? mobStyles.wrapperBox : {}
        }
      }>
        <Box sx={{ pb: 3, pl:3, pr:3, pt:2 }}>
          <Box sx={{display: "flex", justifyContent: "space-between"}}>
          <Typography id="modal-modal-title" variant="subtitle1" sx={{mb: 2, mt:1}}>
            Claim AirDrop
          </Typography>
          <img src={close}  alt="Hydro" style={{width: '27px', height: '27px', cursor:"pointer"}} onClick={handleClose}/>
          </Box>
          { 
            showRewards 
              ? <AirdDropRewards />
              : <AirdDropAvailable handleClaim={handleClaim}/>
          }
        </Box>
      </Box>
    </Modal>
  );
}
