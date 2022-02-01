import React from "react";
import BigNumber from "bignumber.js";
import Link from "@mui/material/Link";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Box, Typography } from "@mui/material";
import { useFetchPrice } from "../../redux/fetchPrice";

export default function TotalLiquidity() {
  const { h2oLPValue } = useFetchPrice();

  const lpValue = h2oLPValue
    ? "$" + new BigNumber(h2oLPValue).decimalPlaces(0).toFormat()
    : "-";

  return (
    <Box>
      <Box
        sx={{
          height: "72px",
          width: "100%",
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
            textAlign: "center",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "#09060B",
              fontWeight: "bold",
              lineHeight: "19px",
              textAlign: "center",
            }}
          >
            Total Liquidity
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#40B3E0", display: "inline" }}
          >
            {lpValue}
          </Typography>
        </Box>
      </Box>
      <Box margin="32px 0 18px 0">
        <Typography
          variant="body1"
          sx={{
            color: "#fff",
            marginBottom: "12px",
            lineHeight: "19px",
            textAlign: "center",
          }}
        >
          DEX:
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#fff",
            marginBottom: "12px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Huckleberry
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#fff", marginBottom: "12px", textAlign: "center" }}
        >
          Pair Contract Address
          <Link
            href={
              "https://moonriver.moonscan.io/address/0x6F0c50fB6270F206a074F8058f165720c7a9761c"
            }
            color="secondary"
            key={""}
            target="_blank"
            sx={{
              display: "block",
              fontSize: "12px",
            }}
          >
            <span style={{ marginLeft: "6px" }}>
              0x6F0c50fB6270F206a074F8058f165720c7a9761c
            </span>
            <OpenInNewIcon
              sx={{ ml: 1, fontSize: "12px", float: "right", marginRight: 2 }}
            />
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
