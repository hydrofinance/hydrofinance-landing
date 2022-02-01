import React from "react";
import Link from "@mui/material/Link";
import { Box, Typography } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useFetchRewards } from "../../redux/fetchRewards";
import BigNumber from "bignumber.js";
import { Reward } from "../../model/reducer";

function RewardRow(props: { reward: Reward }) {
  const { reward } = props;
  const value = "$" + new BigNumber(reward.value).decimalPlaces(0).toFormat();
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Link
        href={`https://moonriver.moonscan.io/address/${reward.address}`}
        color="secondary"
        target="_blank"
        sx={{
          fontSize: 20,
          fontWeight: 800,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {reward.tokenName}
        <OpenInNewIcon sx={{ ml: 1 }} />
      </Link>
      <Typography sx={{ fontSize: 20, fontWeight: 800 }}>{value}</Typography>
    </Box>
  );
}

export default function TotalRewarded() {
  const { rewards } = useFetchRewards();

  const rewardValue = rewards
    ? "$" + new BigNumber(rewards.total).decimalPlaces(2).toFormat()
    : "-";

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
            Hodlers have been rewarded:
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#40B3E0", display: "inline" }}
          >
            {rewardValue}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Typography variant="body1">Reward tokens</Typography>
        <Typography variant="body1">Amount rewarded</Typography>
      </Box>
      {rewards?.rewards?.map((r) => (
        <RewardRow key={r.address} reward={r} />
      ))}
    </Box>
  );
}
