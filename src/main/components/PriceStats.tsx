import Grid from "@mui/material/Grid";
import React from "react";
import BigNumber from "bignumber.js";
import { useTranslation } from "react-i18next";
import LPIcon from "../../assets/LPIcon.svg";
import DolphinIcon from "../../assets/DolphinIcon.svg";
import GraphIcon from "../../assets/GraphIcon.svg";
import MarketCapIcon from "../../assets/MarketCapIcon.svg";
import PriceIcon from "../../assets/PriceIcon.svg";
import RewardIcon from "../../assets/RewardIcon.svg";
import { useFetchPrice } from "../redux/fetchPrice";
import { useFetchRewards } from "../redux/fetchRewards";
import { TFunction } from "i18next";
import { Box, Typography } from "@mui/material";
import { BoxProps } from "@mui/system";

type ItemType = {
  icon: string;
  text: string;
  value: string;
  iconWidth?: number;
  iconHeight?: number;
};

const createItems = (
  t: TFunction,
  rewardsUSDValue: string | null,
  h2oLPValue: string | null,
  h2oPrice: string | null
) => {
  const lpValue = h2oLPValue
    ? "$" + new BigNumber(h2oLPValue).decimalPlaces(0).toFormat()
    : "-";
  const mcValue = h2oPrice
    ? "$" +
      new BigNumber(h2oPrice)
        .multipliedBy(1000000000)
        .decimalPlaces(0)
        .toFormat()
    : "-";
  const priceValue = h2oPrice
    ? "$" + new BigNumber(h2oPrice).decimalPlaces(7).toFormat()
    : "-";
  const rewardValue = rewardsUSDValue
    ? "$" + new BigNumber(rewardsUSDValue).decimalPlaces(2).toFormat()
    : "-";
  return [
    { icon: LPIcon, text: t("statsLpText"), value: lpValue },
    { icon: MarketCapIcon, text: t("statsMarketCapText"), value: mcValue },
    {
      icon: PriceIcon,
      text: t("statsPriceText"),
      value: priceValue,
      iconWidth: 18,
    },
    { icon: GraphIcon, text: t("statsTradeVolume"), value: rewardValue },
    { icon: DolphinIcon, text: t("statsTotalHodlers"), value: rewardValue },
    { icon: RewardIcon, text: t("statsRewardedText"), value: rewardValue },
  ] as ItemType[];
};

function Item(props: { item: ItemType }) {
  const {
    item: { icon, text, value, iconWidth, iconHeight },
  } = props;
  return (
    <Grid item xs={6} md={2}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          backgroundColor: "#FFFFFF4D",
          borderRadius: "10px",
          paddingLeft: 2,
          paddingRight: 2,
          paddingTop: {
            xs: 2,
            md: 1,
          },
          paddingBottom: 2,
          height: {
            xs: 75,
            md: 100,
          },
        }}
      >
        <Box
          component="img"
          src={icon}
          alt={text}
          sx={{ width: iconWidth || 25, height: iconHeight || 25 }}
        />
        <Typography
          variant="body1"
          sx={{
            fontWeight: 700,
            mt: 1,
            fontSize: {
              xs: 12,
              md: "inherit",
            },
          }}
        >
          {text}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            fontSize: {
              xs: 11,
              md: "inherit",
            },
          }}
        >
          {value}
        </Typography>
      </Box>
    </Grid>
  );
}

export default function PriceStats(props: BoxProps) {
  const { t } = useTranslation();
  const { fetchRewards, rewardsUSDValue } = useFetchRewards();
  const { fetchPrice, h2oLPValue, h2oPrice } = useFetchPrice();

  React.useEffect(() => {
    fetchRewards();
  }, [fetchRewards]);
  React.useEffect(() => {
    fetchPrice();
  }, [fetchPrice]);

  const items = React.useMemo(
    () => createItems(t, rewardsUSDValue, h2oLPValue, h2oPrice),
    [rewardsUSDValue, h2oLPValue, h2oPrice, t]
  );

  return (
    <Grid sx={props.sx} container spacing={3}>
      {items.map((i) => (
        <Item key={i.text} item={i} />
      ))}
    </Grid>
  );
}
