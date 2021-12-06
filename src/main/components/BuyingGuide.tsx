import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box, { BoxProps } from "@mui/system/Box";
import { Trans, useTranslation } from "react-i18next";
import SectionBox from "../../common/components/SectionBox";
import { defaultContentPadding } from "../../utils/theme";
import BuyingGuideDescription from "../../common/components/BuyingGuideDescription";
import FancyDivider from "../../common/components/FancyDivider";

const Steps: StepItemType[] = [
  {
    titleKey: "buyingGuideStep1Title",
    descriptionKey: "buyingGuideStep1Description",
    transDescription: true,
  },
  {
    titleKey: "buyingGuideStep2Title",
    descriptionKey: "buyingGuideStep2Description",
    transDescription: true,
  },
  {
    titleKey: "buyingGuideStep3Title",
    descriptionKey: "buyingGuideStep3Description",
    transDescription: true,
  },
  {
    titleKey: "buyingGuideStep4Title",
    descriptionKey: "buyingGuideStep4Description",
  },
  {
    titleKey: "buyingGuideStep5Title",
    descriptionKey: "buyingGuideStep5Description",
  },
];

type StepItemType = {
  titleKey: string;
  descriptionKey: string;
  transDescription?: boolean;
};

function StepItem(props: { item: StepItemType; stepNo: Number } & BoxProps) {
  const {
    item: { titleKey, descriptionKey, transDescription },
    stepNo,
    sx,
    ...other
  } = props;

  const { t } = useTranslation();

  const borderGradientStyle = {
    background: `linear-gradient(#1f1f1f,#1f1f1f) padding-box, linear-gradient(90deg, #FFFFFF 0, rgba(255, 255, 255, 0) 90.1%) border-box`,
    border: "1px solid transparent",
    borderRadius: "15px",
  };

  return (
    <Box
      style={{
        alignItems: "flex-start",
        flexDirection: "row",
        display: "flex",
        marginBottom: "10px",
        ...borderGradientStyle,
      }}
      sx={{ padding: 1, paddingLeft: 2, ...(sx || {}) }}
      {...other}
    >
      <div
        style={{
          alignSelf: "center",
          padding: "0 80px 0 20px",
          fontWeight: "bold",
          fontSize: "20px",
          minWidth: "75px",
        }}
      >
        <span>{`Step ${stepNo}`}</span>
      </div>
      <div
        style={{
          padding: "2px 0 8px 0",
          minHeight: "50px",
        }}
      >
        <Typography
          variant="body1"
          style={{ fontWeight: "bold", marginBottom: "4px" }}
        >
          {t(titleKey)}
        </Typography>
        <Typography
          variant="body2"
          style={{ fontSize: "12px", lineHeight: "1.2" }}
        >
          {transDescription ? (
            <Trans i18nKey={descriptionKey}>
              Part0
              <a
                target="_blank"
                rel="noreferrer"
                href="https://app.rubic.exchange/?fromChain=BSC&toChain=MOONRIVER&from=BNB&to=MOVR"
                style={{ color: "#40B3E0", textDecoration: "none" }}
              >
                Part1
              </a>
              Part2
            </Trans>
          ) : (
            t(descriptionKey)
          )}
        </Typography>
      </div>
    </Box>
  );
}

function Info() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {Steps.map((item, i) => (
        <StepItem key={item.titleKey} stepNo={++i} item={item} />
      ))}
    </Box>
  );
}

export default function BuyingGuide() {
  const { t } = useTranslation();

  return (
    <SectionBox>
      <Box
        sx={{
          backgroundSize: {
            sx: "auto 100%",
            lg: "100% 100%",
          },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          ...defaultContentPadding,
        }}
      >
        <FancyDivider />
        <Grid container>
          <Grid
            item
            xs={12}
            md={3}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <BuyingGuideDescription />
          </Grid>
          <Grid
            item
            xs={12}
            md={9}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Grid item xs={12} md={10} sx={{ ml: "auto", mr: "auto" }}>
              <Info />
            </Grid>
          </Grid>
        </Grid>
        <FancyDivider
          sx={{
            marginBottom: "10px",
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            mb: "20px",
          }}
        >
          <Typography variant="h3">{t("hydro")}</Typography>
          <Typography variant="body2" sx={{ ml: "12px" }}>
            {t("copyright")}
          </Typography>
        </Box>
      </Box>
    </SectionBox>
  );
}
