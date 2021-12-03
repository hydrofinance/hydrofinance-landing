import React from "react";
import { Box } from "@mui/system";
import SectionBox from "../common/components/SectionBox";
import Header from "./components/Header";
import Banner from "./components/Banner";

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
    >
      <SectionBox sx={{ position: "absolute", top: 0 }}>
        <Header />
      </SectionBox>
      <Banner />
    </Box>
  );
}
