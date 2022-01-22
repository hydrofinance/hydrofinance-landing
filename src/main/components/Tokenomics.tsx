import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useMediaQuery } from "@mui/material";
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
    links: [
      {
        textKey: "tokenomicsInfo1Link",
        url: "https://moonriver.moonscan.io/address/0x36A58BEd6347DAE855D4B5E29d21A93E1dE66450",
      },
    ],
  },
  {
    titleKey: "tokenomicsInfo2Title",
    descriptionKey: "tokenomicsInfo2Description",
  },
  {
    titleKey: "tokenomicsInfo3Title",
    descriptionKey: "tokenomicsInfo3Description",
    transDescription: true,
    links: [
      {
        textKey: "tokenomicsInfo3Link",
        url: "https://moonriver.moonscan.io/address/0x22b32f4743364AAEd06EDeE8bb7131e43BCc4F71",
      },
      {
        textKey: "tokenomicsInfo3Link",
        url: "https://moonriver.moonscan.io/address/0x261A5C7389990fA233351295DE5865ddf783F3Ba",
      },
      {
        textKey: "tokenomicsInfo3Link",
        url: "https://moonriver.moonscan.io/address/0x1638e402a06c454B8426D987079E908dfC106409",
      },
      {
        textKey: "tokenomicsInfo3Link",
        url: "https://moonriver.moonscan.io/address/0x56653Ed8BaB5d927dA8E7FdD137509BB62dc5E37",
      },
    ],
  },
];

const TaxInfoItems: TaxInfoItemType[] = [
  {
    titleKey: "tokenomicsTaxInfo1Title",
    subtitleKey: "tokenomicsTaxInfo1Subtitle",
    caption1Key: "tokenomicsTaxInfo1Caption1",
    caption2Key: "tokenomicsTaxInfo1Caption2",
    caption3Key: "tokenomicsTaxInfo1Caption3",
    caption4Key: "tokenomicsTaxInfo1Caption4",
    background: getSingleAssetSrc("TOKENOMICSBUY").default,
    type: "BUY",
  },
  {
    titleKey: "tokenomicsTaxInfo2Title",
    subtitleKey: "tokenomicsTaxInfo2Subtitle",
    caption1Key: "tokenomicsTaxInfo2Caption1",
    caption2Key: "tokenomicsTaxInfo2Caption2",
    caption3Key: "tokenomicsTaxInfo2Caption3",
    caption4Key: "tokenomicsTaxInfo2Caption4",
    background: getSingleAssetSrc("TOKENOMICSSELL").default,
    type: "SELL",
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
  caption3Key: string;
  caption4Key: string;
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
              key={link.url}
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
        1,000,000,000,000
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

  const min900 = useMediaQuery("(min-width: 900px)");
  const max1000 = useMediaQuery("(max-width: 1000px)");
  const max1100 = useMediaQuery("(max-width: 1100px)");
  const desktop = min900 && max1100;

  const titleFontSize = desktop ? 24 : 28;
  const subtitleFontSize = desktop ? 28 : 30;
  const captionFontSize = desktop ? 16 : 18;

  const buyBgPosition = desktop ? "0px 4px" : "0 -1px";
  const paddingTop = min900 && max1000 ? "27px" : (min900 && max1100 ? "42px" : "55px");

  const sellTaxProps = {
    backgroundPosition: "2px 66px",
    paddingTop: paddingTop,
    paddingBottom: "62px",
    paddingRight: "34px",
  };

  const buyTaxProps = {
    backgroundPosition: buyBgPosition,
    paddingTop: paddingTop,
    paddingBottom: "28px",
    paddingRight: "32px",
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${item.background})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        ...(item.type === "BUY" ? buyTaxProps : sellTaxProps),
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
      <Typography variant="h4" sx={{ fontSize: titleFontSize, fontWeight: 700 }}>
        <Trans i18nKey={item.titleKey}>
          Part0<span style={{ fontWeight: 400 }}>Part1</span>Part2
        </Trans>
      </Typography>
      <Typography variant="h4" sx={{ fontSize: subtitleFontSize , fontWeight: 700, mt: desktop ? 0 : 1 }}>
        {t(item.subtitleKey)}
      </Typography>
      <Typography variant="subtitle1" sx={{ fontSize: captionFontSize , mt: 0 }}>
        {t(item.caption1Key)}
      </Typography>
      <Typography variant="subtitle1" sx={{  fontSize: captionFontSize, mt: -1 }}>
        {t(item.caption2Key)}
      </Typography>
      <Typography variant="subtitle1" sx={{  fontSize: captionFontSize, mt: -1 }}>
        {t(item.caption3Key)}
      </Typography>
      <Typography variant="subtitle1" sx={{  fontSize: captionFontSize, mt: -1 }}>
        {t(item.caption4Key)}
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "25px",
        }}
      >
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
