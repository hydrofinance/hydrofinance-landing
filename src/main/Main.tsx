import React from "react";
import { Box } from "@mui/system";
import SectionBox from "../common/components/SectionBox";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Disclaimer from "./components/Disclaimer";
import AboutUs from "./components/AboutUs";
import Tokenomics from "./components/Tokenomics";
import BuyingGuide from "./components/BuyingGuide";
import WhyHydro from "./components/WhyHydro";

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
      <SectionBox
        sx={{
          position: "absolute",
          top: 0,
          zIndex: 2,
        }}
      >
        <Header />
      </SectionBox>
      <Banner />
      <WhyHydro />
      <Disclaimer />
      <AboutUs />
      <Tokenomics />
      <BuyingGuide />
    </Box>
  );
}
