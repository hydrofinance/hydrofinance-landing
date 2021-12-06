import React from "react";
import SectionTitle from "../../common/components/SectionTitle";
import { useTranslation } from "react-i18next";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";

const Steps = [
  "Create a Wallet",
  "Purchase MOVR",
  "Send some MOVR to the wallet",
  "SWAP MOVR FOR HYDRO",
  "HODL",
];
function RenderSteps() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", mt: 2, mb: 3, pl: 1 }}>
      {Steps.map((item, i) => (
        <Typography variant="body1" style={{ marginBottom: "4px" }}>
          {++i}. {item}
        </Typography>
      ))}
    </Box>
  );
}
function ContractAddress() {
  const { t } = useTranslation();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", mt: 2, mb: 2, pl: 1 }}>
      <Typography
        variant="body1"
        style={{ marginBottom: "4px", fontWeight: "500" }}
      >
        {t("buyingGuideContractTitle")}
      </Typography>
      <Typography variant="body2" style={{ marginBottom: "4px" }}>
        Contract to be confirmed
      </Typography>
    </Box>
  );
}

export default function BuyingGuideDescription() {
  const { t } = useTranslation();

  return (
    <>
      <SectionTitle
        style={{ paddingLeft: "16px", paddingRight: "16px", width: "120px" }}
      >
        {t("buyingGuide")}
      </SectionTitle>
      <RenderSteps />
      <ContractAddress />
    </>
  );
}
