import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import BigNumber from "bignumber.js";
import { useTranslation } from "react-i18next";
import LPIcon from "../../assets/LPIcon.svg";
import GraphIcon from "../../assets/GraphIcon.svg";
import MarketCapIcon from "../../assets/MarketCapIcon.svg";
import PriceIcon from "../../assets/PriceIcon.svg";
import RewardIcon from "../../assets/RewardIcon.svg";
import BurnedIcon from "../../assets/Burned.svg";
import info from "../../assets/info.png";
import PriceStatsModal from "./PriceStatsModal/PriceStatsModal";
import { useFetchPrice } from "../redux/fetchPrice";
import { useFetchRewards } from "../redux/fetchRewards";
import { TFunction } from "i18next";
import { Box, Typography, useMediaQuery, IconButton } from "@mui/material";
import { BoxProps } from "@mui/system";
import { useFetchTokenInfo } from "../redux/fetchTokenInfo";
import { Rewards } from "../model/reducer";

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
  rewards: Rewards | null,
  h2oLPValue: string | null,
  h2oPrice: string | null,
  burnedAmount: BigNumber | null,
  h2oVolumeDay: string | null
) => {
  const lpValue = h2oLPValue
    ? "$" + new BigNumber(h2oLPValue).decimalPlaces(0).toFormat()
    : "-";
  const mcValue =
    h2oPrice && burnedAmount
      ? "$" +
        new BigNumber(h2oPrice)
          .multipliedBy(new BigNumber(10).pow(9).minus(burnedAmount))
          .decimalPlaces(0)
          .toFormat()
      : "-";
  const priceValue = h2oPrice
    ? "$" + new BigNumber(h2oPrice).decimalPlaces(7).toFormat()
    : "-";
  const rewardValue = rewards
    ? "$" + new BigNumber(rewards.total).decimalPlaces(2).toFormat()
    : "-";
  const volume = h2oVolumeDay
    ? "$" + new BigNumber(h2oVolumeDay).decimalPlaces(0).toFormat()
    : "-";
  const burnedValue = burnedAmount?.toFormat() || "-";
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
      value: volume,
      keyValue: "TV",
    },
    { icon: BurnedIcon, text: t("statsBurned"), value: burnedValue },
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
    setPopUpDataProps,
  } = props;

  return (
    <Grid item xs={6} lg={2} md={4}>
      <Box
        sx={{
          position: "relative",
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
        {keyValue && (
          <IconButton
            sx={{
              alignSelf: "end",
              position: "absolute",
              top: "2px",
              right: "4px",
            }}
            onClick={() => setPopUpDataProps(keyValue)}
          >
            <Box
              component="img"
              src={info}
              alt={text}
              sx={{
                width: iconWidth || 20,
                height: iconHeight || 20,
              }}
            />
          </IconButton>
        )}
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
  const max900 = useMediaQuery("(max-width: 900px)");
  const { fetchRewards, rewards } = useFetchRewards();
  const { fetchPrice, h2oLPValue, h2oPrice, h2oVolumeDay } = useFetchPrice();
  const { fetchTokenInfo, burnedAmount } = useFetchTokenInfo();
  const [popUpData, setPopUpData] = useState("");
  React.useEffect(() => {
    fetchRewards();
  }, [fetchRewards]);
  React.useEffect(() => {
    fetchPrice();
  }, [fetchPrice]);
  React.useEffect(() => {
    fetchTokenInfo();
  }, [fetchTokenInfo]);

  const items = React.useMemo(
    () =>
      createItems(t, rewards, h2oLPValue, h2oPrice, burnedAmount, h2oVolumeDay),
    [rewards, h2oLPValue, h2oPrice, burnedAmount, h2oVolumeDay, t]
  );

  const closeModalCallback = () => {
    setPopUpData("");
  };

  return (
    <Box sx={props.sx}>
      <Box sx={{ ml: 1, pt: max900 ? 5 : 6, display: "flex" }}>
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
      <Grid
        container
        spacing={{
          xs: 1,
          md: 3,
        }}
      >
        {items.map((i) => (
          <Item key={i.text} item={i} setPopUpDataProps={setPopUpData} />
        ))}
        {popUpData && (
          <PriceStatsModal
            type={popUpData}
            items={items}
            isOpen={true}
            closeModalCallback={closeModalCallback}
          />
        )}
      </Grid>
    </Box>
  );
}
