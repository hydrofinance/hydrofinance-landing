import React from "react";
import {
  Modal,
  Box,
  Typography,
  Backdrop,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Fade from "@mui/material/Fade";
import { getSingleAssetSrc } from "../../../utils/getSingleAssetSrc";
import close from "../../../assets/close.png";
import TotalRewarded from "./TotalRewarded";
import TradeVolume from "./TradeVolume";
import TotalLiquidity from "./TotalLiquidity";
import { ItemType } from "../PriceStats";

function Content(props: { 
  type: string;
}) {
  switch(props.type) {
    case "TR":
      return <TotalRewarded />;
    case "TV": 
      return (<TradeVolume />);
    case "TL": 
      return (<TotalLiquidity />);
    default:
      return <TotalRewarded />;
  }
}

export default function PriceStatsModal(props: {
  type: string;
  items: ItemType[];
  isOpen: boolean;
  closeModalCallback: () => void;
}) {
  const { type, isOpen, items } = props;

  interface myObject {
    [key: string]: ItemType
  }
  const getStatsTypeMap = () => {
    return items.reduce( (acc: myObject, item) => {
      acc[item.keyValue as string] = item;
      return acc;
    }, {});
  };

  const statsTypeMap = getStatsTypeMap();

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
            <Box sx={{ display: "flex" }}>
              <Box
                component="img"
                src={statsTypeMap[type].icon}
                alt={`${type} Icon`}
                sx={{ width: 25, height: 25, marginTop: "12px" }}
              />
              <Typography
                id="modal-modal-title"
                variant="subtitle1"
                sx={{ ml: 1, mb: 2, mt: 1 }}
              >
                {statsTypeMap[type].text}
              </Typography>
              <img
                src={close}
                alt="Hydro"
                style={{ width: "27px", height: "27px", cursor: "pointer", marginLeft: "auto" }}
                onClick={handleClose}
              />
            </Box>
            <Content type={type}/>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
