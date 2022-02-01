import React from "react";
import BigNumber from "bignumber.js";
import { Box, Typography } from "@mui/material";
import { useFetchPrice } from "../../redux/fetchPrice";

export default function TradeVolume() {
  const { h2oVolumeDay, h2oVolumeWeek } = useFetchPrice();

  const volumeDay = h2oVolumeDay
    ? "$" + new BigNumber(h2oVolumeDay).decimalPlaces(0).toFormat()
    : "-";
  const volumeWeek = h2oVolumeWeek
    ? "$" + new BigNumber(h2oVolumeWeek).decimalPlaces(0).toFormat()
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
            24H TRADING VOLUME:
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#40B3E0", display: "inline" }}
          >
            {volumeDay}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          height: "72px",
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "space-around",
          mt: 5,
          mb: 6,
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
            7D TRADING VOLUME
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#40B3E0", display: "inline" }}
          >
            {volumeWeek}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
