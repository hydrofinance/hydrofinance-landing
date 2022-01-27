import React from "react";
import Link from "@mui/material/Link";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Box, Typography } from "@mui/material";

export default function TotalLiquidity() {
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
            Total Liquidity
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#40B3E0", display: "inline"}}
          >
            $1000,000,000
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
          DEX:
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: "#fff", marginBottom: "12px", fontWeight: "bold", textAlign: "center" }}
        >
          Huckleberry
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#fff", marginBottom: "12px", textAlign: "center" }}
        >
          Pair Contract Address
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
              <span style={{ marginLeft: "6px" }}>0xa7324c8c487fda048363386181b3f7c57ba6263c</span>
              <OpenInNewIcon sx={{ ml: 1, fontSize: "12px", float: "right", marginRight: 2 }} />
          </Link>
        </Typography>
      </Box>
    </Box>);
}
