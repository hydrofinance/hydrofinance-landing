import React from "react";
import Link from "@mui/material/Link";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Box, Typography, Button } from "@mui/material";

export default function TotalRewarded() {
  return (
    <Box>
      <Box
        sx={{
          height: "72px",
          minWidth: "300px",
          maxWidth: "335px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Box
          sx={{
            mt: "12px",
            marginLeft: 0,
            mb: "auto",
            textAlign: "center"
          }}
        >
          <Typography
            variant="body1"
            sx={{ color: "#09060B", fontWeight: "bold", lineHeight: "19px", textAlign: "center" }}
          >
            Hodlers have been rewarded:
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#40B3E0", display: "inline"}}
          >
            $1,000,000,000
          </Typography>
        </Box>
      </Box>
      <Box
        margin="32px 0 18px 0"
      >
        <Typography
          variant="body1"
          sx={{ color: "#fff", marginBottom: "12px", lineHeight: "19px", textAlign: "center" }}
        >
          Current Reward token:
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: "#fff", marginBottom: "12px", fontWeight: "bold", textAlign: "center" }}
        >
          REWARDS SWITCHED OFF
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#fff", marginBottom: "12px", textAlign: "center" }}
        >
          Moonriver Contract Address
          <Link
              href={"#"}
              color="secondary"
              key={""}
              target="_blank"
              sx={{
                display: "block",
                fontSize: "12px",
              }}
            >
              <span style={{ marginLeft: "48px" }}>N/A</span>
              <OpenInNewIcon sx={{ ml: 1, fontSize: "12px", float: "right", marginRight: 6 }} />
          </Link>
        </Typography>
      </Box>
    </Box>);
}
