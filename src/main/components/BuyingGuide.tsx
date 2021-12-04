import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box, { BoxProps } from "@mui/system/Box";
import { Trans, useTranslation } from "react-i18next";
import BorderedBox from "../../common/components/BorderedBox";
import SectionBox from "../../common/components/SectionBox";
import { defaultContentPadding } from "../../utils/theme";

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

function StepItem(props: { item: StepItemType, stepNo: Number } & BoxProps) {
  const {
    item: { titleKey, descriptionKey, transDescription },
    stepNo,
    sx,
    ...other
  } = props;

  const { t } = useTranslation();

  return (
    <BorderedBox 
      style={{
        alignItems: "flex-start",
        flexDirection: "row",
        display: "flex",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        marginBottom: "10px"
      }} 
      sx={{ padding: 1, paddingLeft: 2, ...(sx || {}) }} {...other}>
      <div style={{ 
        alignSelf: "center",
        padding: "0 120px 0 20px",
        fontWeight: "bold",
        fontSize: "20px",
        minWidth: "75px"
      }}>
        <span>{`Step ${stepNo}`}</span>
      </div>
      <div style={{ 
        padding: "10px 0",
      }}>
        <Typography variant="body1" style={{fontWeight: "bold", marginBottom: "4px"}}>{t(titleKey)}</Typography>
        <Typography variant="body2">
          {transDescription ? (
            <Trans i18nKey={descriptionKey}>
              Part0<a href="https://TODO" style={{ color: "#40B3E0" }}>Part1</a>Part2
            </Trans>
          ) : (
            t(descriptionKey)
          )}
        </Typography>
      </div>
    </BorderedBox>
  );
}

function Info() {
  const { t } = useTranslation();

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {Steps.map((item, i) => (
        <StepItem key={item.titleKey} stepNo={++i} item={item} />
      ))}
    </Box>
  );
}

export default function BuyingGuide() {
  return (
    <Box
      sx={{
        backgroundSize: {
          sx: "auto 100%",
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
          <Grid item xs={12} md={7}>
            <Info />
          </Grid>
          <Grid item xs={12} md={7}>
          </Grid>
          <Grid item xs={12} md={4}></Grid>
        </Grid>
      </SectionBox>
    </Box>
  );
}
