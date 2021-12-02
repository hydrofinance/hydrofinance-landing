import React from "react";
import { Box } from "@mui/system";

export default function Main() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
        alignItems: "center",
      }}
    ></Box>
  );
}
