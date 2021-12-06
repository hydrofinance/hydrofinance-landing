import React from "react";
import { Box } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import SectionBox from "../common/components/SectionBox";
import Header from "./components/Header";
import Banner from "./components/Banner";
import AboutUs from "./components/AboutUs";
import Tokenomics from "./components/Tokenomics";
import BuyingGuide from "./components/BuyingGuide";

export default function Main() {
  const isLessThan1800 = useMediaQuery("(max-width: 1800px)");

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
          ...(isLessThan1800 ? { maxWidth: "100%" } : {}),
        }}
      >
        <Header />
      </SectionBox>
      <Banner />
      <AboutUs />
      <Tokenomics />
      <BuyingGuide />
    </Box>
  );
}
