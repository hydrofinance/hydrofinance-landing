import React from "react";
import { Box } from "@mui/system";
import SectionBox from "../common/components/SectionBox";
import Header from "./components/Header";
import Add from "./components/Add";

export default function AddLiquidity() {
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
    >
      <SectionBox
        sx={{
          position: "absolute",
          top: 0,
          zIndex: 2,
        }}
      >
        <Header />
      </SectionBox>
      <Add />
    </Box>
  );
}
