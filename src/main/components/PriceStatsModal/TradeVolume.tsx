import React from "react";
import { Box, Typography, Button } from "@mui/material";

export default function TradeVolume() {
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
            24H TRADING VOLUME:
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#40B3E0", display: "inline"}}
          >
            $30,000
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          height: "72px",
          minWidth: "300px",
          maxWidth: "335px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "space-around",
          mt: 5,
          mb: 6
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
            7D TRADING VOLUME
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#40B3E0", display: "inline"}}
          >
            $210,000
          </Typography>
        </Box>
      </Box>
    </Box>);
}
