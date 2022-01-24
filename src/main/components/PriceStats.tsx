import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import BigNumber from "bignumber.js";
import { useTranslation } from "react-i18next";
import LPIcon from "../../assets/LPIcon.svg";
import DolphinIcon from "../../assets/DolphinIcon.svg";
import GraphIcon from "../../assets/GraphIcon.svg";
import MarketCapIcon from "../../assets/MarketCapIcon.svg";
import PriceIcon from "../../assets/PriceIcon.svg";
import RewardIcon from "../../assets/RewardIcon.svg";
import PriceStatsModal from "./PriceStatsModal/PriceStatsModal";
import { useFetchPrice } from "../redux/fetchPrice";
import { useFetchRewards } from "../redux/fetchRewards";
import { TFunction } from "i18next";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import { BoxProps } from "@mui/system";

export type ItemType = {
  icon: string;
  text: string;
  value: string;
  iconWidth?: number;
  iconHeight?: number;
  keyValue: string;
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
    { icon: LPIcon, text: t("statsLpText"), value: lpValue, keyValue: "TL" },
    { icon: MarketCapIcon, text: t("statsMarketCapText"), value: mcValue },
    {
      icon: PriceIcon,
      text: t("statsPriceText"),
      value: priceValue,
      iconWidth: 18,
    },
    {
      icon: GraphIcon,
      text: t("statsTradeVolume"),
      value: rewardValue,
      keyValue: "TV",
    },
    { icon: DolphinIcon, text: t("statsTotalHodlers"), value: rewardValue },
    {
      icon: RewardIcon,
      text: t("statsRewardedText"),
      value: rewardValue,
      keyValue: "TR",
    },
  ] as ItemType[];
};

function Item(props: {
  item: ItemType;
  setPopUpDataProps: (arg0: string) => void;
}) {
  const {
    item: { icon, text, value, iconWidth, iconHeight, keyValue },
  } = props;
  const handleItemClick = (key: string = "") => {
    props.setPopUpDataProps(key);
  };

  return (
    <Grid item xs={6} md={2}>
      <Button
        variant="text"
        sx={{ width: "100%" }}
        onClick={() => {
          handleItemClick(keyValue);
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            backgroundColor: "#FFFFFF4D",
            textAlign: "left",
            borderRadius: "10px",
            paddingLeft: 2,
            paddingRight: 2,
            paddingTop: 1,
            paddingBottom: 2,
            height: {
              xs: 75,
              md: 100,
            },
            width: "100%",
            color: "#fff",
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
      </Button>
    </Grid>
  );
}

export default function PriceStats(props: BoxProps) {
  const { t } = useTranslation();
  const max900 = useMediaQuery("(max-width: 900px)");
  const { fetchRewards, rewardsUSDValue } = useFetchRewards();
  const { fetchPrice, h2oLPValue, h2oPrice } = useFetchPrice();
  const [popUpData, setPopUpData] = useState("");
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

  const closeModalCallback = () => {
    setPopUpData("");
  };

  return (
    <>
      <Box sx={{ ml:1, pt: max900 ? 5 : 6 ,display: "flex" }}>
        <Box
          component="img"
          src={GraphIcon}
          alt={`QuickStats Icon`}
          sx={{ width: 25, height: 25, marginTop: "12px" }}
        />
        <Typography
          id="modal-modal-title"
          variant="subtitle1"
          sx={{ ml: 1, mt: 1 }}
        >
          Quick Stats
        </Typography>
      </Box>
      <Grid sx={props.sx} container spacing={3}>
        {items.map((i) => (
          <Item key={i.text} item={i} setPopUpDataProps={setPopUpData} />
        ))}
        {popUpData && <PriceStatsModal type={popUpData} items={items} isOpen={true} closeModalCallback={closeModalCallback}/>}
      </Grid>
    </>
  );
}
