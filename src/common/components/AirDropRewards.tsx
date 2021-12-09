import { Box, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import Telegram from "../../assets/telegram-plane.svg";
import Twitter from "../../assets/TWITTER.svg";
import { useFetchPendingClaim } from "../../main/redux/fetchPendingClaim";

export default function AirdDropRewards() {
  const { t } = useTranslation();

  const { userInfo } = useFetchPendingClaim();

  if (!userInfo) {
    return null;
  }

  return (
    <Box>
      <Box
        sx={{
          height: "72px",
          minWidth: "300px",
          maxWidth: "335px",
          backgroundColor: "#fff",
          borderRadius: "40px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Box
          sx={{
            mt: "12px",
            marginLeft: 0,
            mb: "auto",
          }}
        >
          <Typography
            variant="body1"
            sx={{ color: "#09060B", lineHeight: "19px", textAlign: "center" }}
          >
            You have received:
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#40B3E0", display: "inline" }}
          >
            {userInfo.claimedAmount.toFormat()}
          </Typography>
          <span
            style={{
              color: "#09060B",
              display: "inline",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            {" "}
            H2O
          </span>
        </Box>
      </Box>
      <Box
        sx={{
          mt: "auto",
          ml: 3,
          margin: "40px 35px 0",
          fontSize: "20px",
          fontWeight: "500",
          textAlign: "center",
        }}
      >
        {" "}
        Congratulations! It’s now time to join the our community
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mt: 2,
          justifyContent: "space-between",
          minWidth: "300px",
          maxWidth: "350px",
          marginTop: "42px",
        }}
      >
        <Button
          variant="outlined"
          color="secondary"
          sx={{
            fontSize: 14,
            fontWeight: 500,
            pr: 3,
            paddingLeft: "20px",
          }}
          href="https://t.me/HydroProtocolOfficial"
          target="_blank"
        >
          <img
            src={Telegram}
            alt="Telegram"
            style={{
              width: "23px",
              height: "23px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          />
          {t("menuTelegram")}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          sx={{
            fontSize: 14,
            fontWeight: 500,
            paddingLeft: "20px",
            pr: 3,
          }}
          href="https://twitter.com/H2O_Protocol"
          target="_blank"
        >
          <img
            src={Twitter}
            alt="Twitter"
            style={{
              width: "23px",
              height: "23px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          />
          {t("menuTwitter")}
        </Button>
      </Box>
    </Box>
  );
}
