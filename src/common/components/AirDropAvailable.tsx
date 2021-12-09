import { Box, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import CopyClipboard from "./CopyClipboard";

export default function AirdDropAvailable(props: {handleClaim: ()=>void}) {
  const { t } = useTranslation();
  const handleClaim = () => {
    props.handleClaim();
  }
  return (
    <Box
      sx={{
        minHeight: "400px",
        maxWidth: {
          xs: "335px",
        },
        margin: "0 auto",
      }}
    >
      <Box
        sx={{
          height: "72px",
          maxWidth: {
            xs: "335px",
          },
          backgroundColor: "#fff",
          borderRadius: "40px",
          display: "flex",
          justifyContent: "space-around",
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            mt: "auto",
            ml: 3,
          }}
        >
          <Typography
            variant="body1"
            sx={{ color: "#09060B", lineHeight: "19px" }}
          >
            Rewards Available
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#40B3E0", display: "inline" }}
          >
            1,000,000,000
          </Typography>
          <span
            style={{
              color: "#09060B",
              display: "inline",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            {" "}
            H2O
          </span>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            sx={{
              width: "90px",
              height: "56px",
              background: "linear-gradient(90deg, #8462B6 0%, #06AEC8 100%);",
            }}
            onClick={handleClaim}
          >
            Claim
          </Button>
        </Box>
      </Box>
      <Box sx={{mt: "32px"}}>
        <CopyClipboard buttonText="check" headerText="claimAirdropClaimToWallet"/>
      </Box>
      <Box sx={{mt: "32px"}}>
        <Typography variant="body1" sx={{ width: "100%"}}>{t("airdropStarts")}</Typography> 
        <Typography variant="body1" sx={{ width: "100%"}}>{t("X:XX pm NOV Xth 2021 (UTC)")}</Typography> 
      </Box>
    </Box>
  );
}
