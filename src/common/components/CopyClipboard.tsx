import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";
import TextField from '@mui/material/TextField';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  input: {
    borderRadius: "25px 0px 0 25px",
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
    marginBottom: "4px"
  }
});

const defaultProps = {
  buttonText: "copy",
  headerText: ""
};

interface CopyClipboardProps {
  headerText?: string,
  buttonText?: string
}

export default function CopyClipboard(propsReceived: CopyClipboardProps) {
  const { t } = useTranslation();
  const hydroContract = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
  const classes = useStyles();
  const isMobileorTab = false;

  const handleOnCopy = () => {
    navigator.clipboard.writeText(hydroContract);
  };

  const props = {
    ...defaultProps,
    ...propsReceived
  };

  return (
        <Box sx={{ mt: 2 }}>
          { props.headerText 
            ? 
            <Box className={classes.headerText} sx={{ width: "100%" }}>
              <Typography variant="body1" sx={{ width: "100%"}}>{t(props.headerText)}</Typography> 
            </Box>
            : null
          }
          <Box sx={{display: "flex", alignItems: "center" }}>
            <TextField
              disabled
              InputProps={{
                className: ` ${classes.input} ${
                  isMobileorTab && classes.mobileInput
                }`,
              }}
              fullWidth
              defaultValue={hydroContract}
              id="fullWidth"
            />
            <Button
              variant="outlined"
              color="secondary"
              sx={{
                fontSize: 14,
                fontWeight: 500,
                height: "48px",
                pl: 3,
                pr: 3,
              }}
              className={classes.button}
              onClick={handleOnCopy}
            >
              {t(props.buttonText)}
            </Button>
          </Box>
        </Box> 
  );
}

