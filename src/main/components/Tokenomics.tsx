import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Box, { BoxProps } from "@mui/system/Box";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import React from "react";
import { Trans, useTranslation } from "react-i18next";
import BorderedBox from "../../common/components/BorderedBox";
import SectionBox from "../../common/components/SectionBox";
import Team from "../../assets/Team.svg";
import AutoLiq from "../../assets/carbon_automatic.svg";
import FluentMoneyHand from "../../assets/fluent_money-hand.svg";
import { getSingleAssetSrc } from "../../utils/getSingleAssetSrc";
import { defaultContentPadding } from "../../utils/theme";

const InfoItems: InfoItemType[] = [
  {
    titleKey: "tokenomicsInfo1Title",
    descriptionKey: "tokenomicsInfo1Description",
    // links: [{ textKey: "tokenomicsInfo1Link", url: "https://TODO" }],
  },
  {
    titleKey: "tokenomicsInfo2Title",
    descriptionKey: "tokenomicsInfo2Description",
  },
  {
    titleKey: "tokenomicsInfo3Title",
    descriptionKey: "tokenomicsInfo3Description",
    transDescription: true,
    // links: [
    //   { textKey: "tokenomicsInfo3Link", url: "https://TODO" },
    //   { textKey: "tokenomicsInfo3Link", url: "https://TODO" },
    // ],
  },
];

const TaxInfoItems: TaxInfoItemType[] = [
  {
    titleKey: "tokenomicsTaxInfo1Title",
    subtitleKey: "tokenomicsTaxInfo1Subtitle",
    caption1Key: "tokenomicsTaxInfo1Caption1",
    caption2Key: "tokenomicsTaxInfo1Caption2",
    background: getSingleAssetSrc("TOKENOMICSBUY").default,
    type: "BUY"
  },
  {
    titleKey: "tokenomicsTaxInfo2Title",
    subtitleKey: "tokenomicsTaxInfo2Subtitle",
    caption1Key: "tokenomicsTaxInfo2Caption1",
    caption2Key: "tokenomicsTaxInfo2Caption2",
    background: getSingleAssetSrc("TOKENOMICSSELL").default,
    type: "SELL"
  },
];

type InfoItemLinkType = {
  textKey: string;
  url: string;
};

type InfoItemType = {
  titleKey: string;
  descriptionKey: string;
  transDescription?: boolean;
  links?: InfoItemLinkType[];
};

type TaxInfoItemType = {
  titleKey: string;
  subtitleKey: string;
  caption1Key: string;
  caption2Key: string;
  background: string;
  type: string;
};

function InfoItem(props: { item: InfoItemType } & BoxProps) {
  const {
    item: { titleKey, descriptionKey, transDescription, links },
    sx,
    ...other
  } = props;

  const { t } = useTranslation();

  return (
    <BorderedBox sx={{ padding: 1, paddingLeft: 2, ...(sx || {}) }} {...other}>
      <Typography variant="h5">{t(titleKey)}</Typography>
      <Typography variant="body1">
        {transDescription ? (
          <Trans i18nKey={descriptionKey}>
            Part0<span style={{ fontWeight: 700 }}>Part1</span>Part2
          </Trans>
        ) : (
          t(descriptionKey)
        )}
      </Typography>
      {links && (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {links.map((link, index) => (
            <Link
              href={link.url}
              color="secondary"
              key={link.textKey}
              target="_blank"
              sx={{
                display: "flex",
                alignItems: "center",
                ml: index === 0 ? 0 : 2,
              }}
            >
              {t(link.textKey)}
              <OpenInNewIcon sx={{ ml: 1 }} />
            </Link>
          ))}
        </Box>
      )}
    </BorderedBox>
  );
}

function Info() {
  const { t } = useTranslation();

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h2">{t("tokenomics")}</Typography>
      <Typography variant="h3" sx={{ mt: 1 }}>
        1,000,000,000
      </Typography>
      <Typography variant="body1" sx={{ ml: 1 }}>
        {t("tokenomicsTokensAmount")}
      </Typography>
      <Typography variant="h4" sx={{ mt: 3 }}>
        {t("tokenomicsDistribution")}
      </Typography>
      {InfoItems.map((item) => (
        <InfoItem key={item.titleKey} item={item} sx={{ height: 90, mt: 1 }} />
      ))}
    </Box>
  );
}

function TaxInfoItem(props: { item: TaxInfoItemType } & BoxProps) {
  const { item, sx, ...other } = props;

  const { t } = useTranslation();

  const sellTaxProps = {
    backgroundPosition: "2px 66px",
    paddingTop: "55px",
    paddingBottom: "62px",
    paddingRight: "34px"
  };

  const buyTaxProps = {
    backgroundPosition: "0px -1px",
    paddingTop: "54px",
    paddingBottom: "28px",
    paddingRight: "32px"
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${item.background})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat" ,
        ... item.type === "BUY" ? buyTaxProps : sellTaxProps,
        width: "250px",
        height: "258px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        ...(sx || {}),
      }}
      {...other}
    >
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        <Trans i18nKey={item.titleKey}>
          Part0<span style={{ fontWeight: 400 }}>Part1</span>Part2
        </Trans>
      </Typography>
      <Typography variant="h4" sx={{ fontSize: 30, fontWeight: 700, mt: 1 }}>
        {t(item.subtitleKey)}
      </Typography>
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        {t(item.caption1Key)}
      </Typography>
      <Typography variant="subtitle1" sx={{ mt: -1 }}>
        {t(item.caption2Key)}
      </Typography>
    </Box>
  );
}

function TaxInfo() {
  const { t } = useTranslation();
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h3" sx={{ textAlign: "center", mt: "90px" }}>
        {t("tokenomicsTax")}
      </Typography>
      <Grid container spacing={5} sx={{ mt: 1 }}>
        {TaxInfoItems.map((item) => (
          <Grid
            item
            key={item.titleKey}
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TaxInfoItem item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

function InfoData(props: { imageSrc: string; title: string; text: string }) {
  const { imageSrc, text, title } = props;
  return (
    <Box sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: 60,
          minHeight: 60,
          backgroundColor: "transparent",
          borderRadius: "4px",
          mr: 2,
        }}
      >
        <img src={imageSrc} style={{ width: 40, height: 40 }} alt={title} />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", marginTop: "25px" }}>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography
          variant="body1"
          sx={{
            minHeight: 72,
            lineHeight: "18.75px",
            mt: 1,
            width: "85%",
            marginTop: "3px",
          }}
        >
          {text}
        </Typography>
      </Box>
    </Box>
  );
}

export default function Tokenomics() {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        backgroundImage: `url(${getSingleAssetSrc("TOKENOMICS").default})`,
        backgroundPositionX: {
          xs: "left",
          lg: "center",
        },
        backgroundSize: {
          xs: "auto 100%",
          lg: "100% 100%",
        },
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <SectionBox>
        <Grid
          container
          sx={{
            ...defaultContentPadding,
            mt: "120px",
            mb: "120px",
          }}
        >
          <Grid item xs={12} md={5}>
            <Info />
          </Grid>
          <Grid item xs={12} md={7}>
            <TaxInfo />
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoData
              imageSrc={Team}
              title={t("tokenomicsGridCommunityTitle")}
              text={t("tokenomicsGridCommunityDesc")}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoData
              imageSrc={AutoLiq}
              title={t("tokenomicsLiquidityTitle")}
              text={t("tokenomicsLiquidityText")}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoData
              imageSrc={FluentMoneyHand}
              title={t("tokenomicsRewardTitle")}
              text={t("tokenomicsRewardText")}
            />
          </Grid>
        </Grid>
      </SectionBox>
    </Box>
  );
}
