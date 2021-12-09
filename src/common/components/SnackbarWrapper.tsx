import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "../redux/snackbar";

export default function SnackbarWrapper(props: { children: React.ReactNode }) {
  const { children } = props;
  const { hideSnackbar, snackbar } = useSnackbar();

  const { t } = useTranslation();

  return (
    <>
      {children}
      <Snackbar
        open={!!snackbar}
        autoHideDuration={5000}
        onClose={hideSnackbar}
        message={snackbar?.message || ""}
      >
        <Alert
          onClose={hideSnackbar}
          severity={snackbar?.type}
          sx={{ width: "100%" }}
        >
          {snackbar?.message}
          {snackbar && snackbar.messageKey && t(snackbar.messageKey)}
        </Alert>
      </Snackbar>
    </>
  );
}
