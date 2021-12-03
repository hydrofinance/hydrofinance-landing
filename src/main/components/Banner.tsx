import { Box } from "@mui/system";
import React from "react";
import { getSingleAssetSrc } from "../../utils/getSingleAssetSrc";

export default function Banner() {
  return (
    <Box
      sx={{
        backgroundImage: `url(${getSingleAssetSrc("LANDING").default})`,
        backgroundPositionX: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        minHeight: "900px",
      }}
    />
  );
}
