import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { useSnackbar } from "../redux/snackbar";

type StyleProps = {
  disabledCopy?: boolean;
};

const useStyles = makeStyles({
  input: {
    borderRadius: (props: StyleProps) =>
      props.disabledCopy ? "25px 25px 25px 25px" : "25px 0px 0 25px",
    color: "white",
    height: 48,
    padding: "0 8px",
    border: "2px solid #fff",
    "& input:disabled": {
      color: "rgba(255, 255, 255)",
      textFillColor: "rgba(255,255,255)",
    },
  },
  mobileInput: {
    height: "30px",
    fontSize: "14px",
  },
  button: {
    padding: 7,
    borderRadius: "0 20px 20px 0",
    width: "200px",
    background: "#ffffff",
    color: "#40B3E0",
    fontSize: "16px",
    fontWeight: "500px",
    "&:hover": {
      background: "#ffffff",
    },
  },
  logoImg: {
    marginLeft: "-3px",
  },
  headerText: {
    marginLeft: "2px",
    marginBottom: "4px",
  },
});

const defaultProps = {
  buttonText: "copy",
  headerText: "",
};

interface Props {
  address: string;
  headerText?: string;
  disableCopy?: boolean;
  shortenAddress?: boolean;
}

export default function AddressField(propsReceived: Props) {
  const { address: fullAddress, ...other } = propsReceived;
  const address = other.shortenAddress
    ? `${fullAddress.slice(0, 15)}...${fullAddress.slice(-14)}`
    : fullAddress;

  const { t } = useTranslation();
  const classes = useStyles({ disabledCopy: other.disableCopy });
  const { showSnackbar } = useSnackbar();

  const isMobileorTab = false;

  const handleOnCopy = () => {
    navigator.clipboard.writeText(address);
    showSnackbar({ message: t("addressCopiedToClipboard"), type: "info" });
  };

  const props = {
    ...defaultProps,
    ...other,
  };

  return (
    <Box sx={{ mt: 2 }}>
      {props.headerText ? (
        <Box className={classes.headerText} sx={{ width: "100%" }}>
          <Typography variant="body1" sx={{ width: "100%" }}>
            {t(props.headerText)}
          </Typography>
        </Box>
      ) : null}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          disabled
          InputProps={{
            className: ` ${classes.input} ${
              isMobileorTab && classes.mobileInput
            }`,
          }}
          fullWidth
          defaultValue={address}
          id="fullWidth"
        />
        {!props.disableCopy && (
          <Button
            variant="outlined"
            color="secondary"
            sx={{
              fontSize: 14,
              fontWeight: 500,
              height: "48px",
              width: "120px !important",
            }}
            className={classes.button}
            onClick={handleOnCopy}
          >
            {t(props.buttonText)}
          </Button>
        )}
      </Box>
    </Box>
  );
}
