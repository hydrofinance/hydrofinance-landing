import React from "react";
import SectionBox from "../../common/components/SectionBox";
import { Grid, Typography, Box, Button, Link, SxProps } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FancyDivider from "../../common/components/FancyDivider";
import { defaultContentPadding } from "../../utils/theme";
import { useFetchBalances } from "../redux/fetchBalances";
import { useFetchApproval } from "../redux/fetchApproval";
import { INPUT_FORMAT } from "../../utils/bignumber";
import BigNumber from "bignumber.js";
import AmountTextField from "../../common/components/CurrencyTextField";
import { useSnackbar } from "../../common/redux/snackbar";
import { useAddLiquidity } from "../redux/addLiquidity";
import Footer from "../../common/components/Footer";

const TextFieldBoxSx: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  border: "1px solid white",
  borderRadius: "4px",
  padding: 2,
  minWidth: { md: "400px", xs: "300px" },
};

function Content() {
  const {
    finnAddress,
    hydroAddress,
    tokenBalance,
    tokenAllowance,
    fetchBalances,
  } = useFetchBalances();
  const [approvalPending, setApprovalPending] = React.useState<{
    [address: string]: boolean;
  }>({});
  const [isAdding, setIsAdding] = React.useState(false);
  const { fetchApproval } = useFetchApproval();
  const { addLiquidity } = useAddLiquidity();
  const { showSnackbar } = useSnackbar();
  const [inputSettings, setInputSettings] = React.useState({
    hydroAmount: new BigNumber(0),
    hydroInput: "",
    finnAmount: new BigNumber(0),
    finnInput: "",
  });

  React.useEffect(() => {
    fetchBalances();
  }, [fetchBalances]);

  const hydroBal = tokenBalance(hydroAddress);
  const finnBal = tokenBalance(finnAddress);

  const handleHydroAmountClick = () => {
    setInputSettings((s) => ({
      ...s,
      hydroInput: hydroBal.toFormat(INPUT_FORMAT),
      hydroAmount: hydroBal,
    }));
  };

  const handleHydroInputChange = (amount: BigNumber | null, input: string) => {
    setInputSettings((s) => ({
      ...s,
      hydroInput: amount
        ? amount.isEqualTo(input)
          ? input
          : amount.toFormat(INPUT_FORMAT)
        : "",
      hydroAmount: amount || new BigNumber(0),
    }));
  };

  const handleFinnAmountClick = () => {
    setInputSettings((s) => ({
      ...s,
      finnInput: finnBal.toFormat(INPUT_FORMAT),
      finnAmount: finnBal,
    }));
  };

  const handleFinnInputChange = (amount: BigNumber | null, input: string) => {
    setInputSettings((s) => ({
      ...s,
      finnInput: amount
        ? amount.isEqualTo(input)
          ? input
          : amount.toFormat(INPUT_FORMAT)
        : "",
      finnAmount: amount || new BigNumber(0),
    }));
  };

  const handleAddLiquidityClick = () => {
    setIsAdding(true);
    addLiquidity({
      finnAmount: inputSettings.finnAmount,
      hydroAmount: inputSettings.hydroAmount,
    })
      .then(() => {
        showSnackbar({ message: "Liquidity added!", type: "success" });
        setInputSettings({
          hydroAmount: new BigNumber(0),
          hydroInput: "0.0",
          finnAmount: new BigNumber(0),
          finnInput: "0.0",
        });
        fetchBalances();
        setIsAdding(false);
      })
      .catch((error) => {
        showSnackbar({
          message: `Failed to add liquidity: ${error}`,
          type: "error",
        });
        setIsAdding(false);
      });
  };

  const handleApproveHydroClick = () => {
    setApprovalPending((a) => ({ ...a, [hydroAddress || ""]: true }));
    fetchApproval({
      tokenAddress: hydroAddress || "",
    })
      .then(() => {
        showSnackbar({ message: "HYDRO approval success!", type: "success" });
        fetchBalances();
        setApprovalPending((a) => ({ ...a, [hydroAddress || ""]: false }));
      })
      .catch((error) => {
        showSnackbar({
          message: `HYDRO approval error: ${error}`,
          type: "error",
        });
        setApprovalPending((a) => ({ ...a, [hydroAddress || ""]: false }));
      });
  };

  const handleApproveFinnClick = () => {
    setApprovalPending((a) => ({ ...a, [finnAddress || ""]: true }));
    fetchApproval({
      tokenAddress: finnAddress || "",
    })
      .then(() => {
        showSnackbar({ message: "FINN approval success!", type: "success" });
        fetchBalances();
        setApprovalPending((a) => ({ ...a, [finnAddress || ""]: false }));
      })
      .catch((error) => {
        showSnackbar({
          message: `FINN approval error: ${error}`,
          type: "error",
        });
        setApprovalPending((a) => ({ ...a, [finnAddress || ""]: false }));
      });
  };

  const showApproveHydro =
    inputSettings.hydroAmount.gt(0) &&
    hydroAddress &&
    tokenAllowance(hydroAddress).lt(inputSettings.hydroAmount);
  const showApproveFinn =
    inputSettings.finnAmount.gt(0) &&
    finnAddress &&
    tokenAllowance(finnAddress).lt(inputSettings.finnAmount);

  const addLiquidityDisabled =
    inputSettings.hydroAmount.eq(0) ||
    inputSettings.finnAmount.eq(0) ||
    isAdding;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", marginBottom: 4 }}>
        <Typography variant="h5">
          Add Liquidity to the $HYDRO - $FINN Pool without incurring 12% tax
        </Typography>
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Please follow the steps below:
        </Typography>
        <Typography variant="body1">
          <ol style={{ paddingLeft: 20, marginTop: 8 }}>
            <li>
              Go to the Huckleberry{" "}
              <Link
                href="https://www.huckleberry.finance/#/add/0x56cfe76545939AFAbc8BDbA94192A96801D24d28/0x9A92B5EBf1F6F6f7d93696FCD44e5Cf75035A756"
                target="_blank"
              >
                Add Liquidity Page
              </Link>
            </li>
            <li>
              Specify the amount of <b>$HYDRO</b> you wish to add and wait for
              the $FINN asset amount to autofill.
            </li>
            <li>
              Return to this page:{" "}
              <Link
                href="http://hydroprotocol.finance/liquidity"
                target="_blank"
              >
                http://hydroprotocol.finance/liquidity
              </Link>
            </li>
            <li>
              Paste the exact amount of <b>$HYDRO</b> and <b>$FINN</b> you
              copied earlier in both inputs
            </li>
            <li>Approve both assets and sign</li>
            <li>Hit Add Liquidity and sign</li>
            <li>Congratulations, you've just added liquidity tax free!</li>
          </ol>
        </Typography>
      </Box>
      <Box sx={TextFieldBoxSx}>
        <Typography variant="body1">
          HYDRO Balance
          <Link
            sx={{ cursor: "pointer", marginLeft: 2 }}
            onClick={handleHydroAmountClick}
          >
            {hydroBal.decimalPlaces(18, BigNumber.ROUND_DOWN).toFormat()}
          </Link>
        </Typography>
        <AmountTextField
          fullWidth
          value={inputSettings.hydroInput}
          maxValue={hydroBal}
          decimals={18}
          disabled={isAdding}
          onValueChange={handleHydroInputChange}
        />
      </Box>
      <AddIcon sx={{ marginTop: 2, marginBottom: 2 }} />
      <Box sx={TextFieldBoxSx}>
        <Typography variant="body1">
          FINN Balance
          <Link
            sx={{ cursor: "pointer", marginLeft: 2 }}
            onClick={handleFinnAmountClick}
          >
            {finnBal.decimalPlaces(18, BigNumber.ROUND_DOWN).toFormat()}
          </Link>
        </Typography>
        <AmountTextField
          fullWidth
          value={inputSettings.finnInput}
          maxValue={finnBal}
          decimals={18}
          disabled={isAdding}
          onValueChange={handleFinnInputChange}
        />
      </Box>
      <Box sx={{ display: "flex", marginTop: 2 }}>
        {showApproveHydro && (
          <Button
            sx={{ flex: 1, width: "180px", mr: 1 }}
            variant="contained"
            disabled={approvalPending[hydroAddress || ""]}
            onClick={handleApproveHydroClick}
          >
            {approvalPending[hydroAddress || ""]
              ? "Approving HYDRO"
              : "Approve HYDRO"}
          </Button>
        )}
        {showApproveFinn && (
          <Button
            sx={{ flex: 1, width: "180px", ml: 1 }}
            variant="contained"
            disabled={approvalPending[finnAddress || ""]}
            onClick={handleApproveFinnClick}
          >
            {approvalPending[finnAddress || ""]
              ? "Approving FINN"
              : "Approve FINN"}
          </Button>
        )}
        {!showApproveFinn && !showApproveHydro && (
          <Button
            sx={{ flex: 1, alignSelf: "stretch" }}
            variant="contained"
            disabled={addLiquidityDisabled}
            onClick={handleAddLiquidityClick}
          >
            {isAdding ? "Adding Liquidity" : "Add Liquidity"}
          </Button>
        )}
      </Box>
    </Box>
  );
}
export default function Add() {
  return (
    <SectionBox>
      <Box
        sx={{
          ...defaultContentPadding,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <FancyDivider />
        <Grid container sx={{ justifyContent: "center", alignItems: "center" }}>
          <Content />
        </Grid>
        <FancyDivider sx={{ marginBottom: "10px" }} />
        <Footer />
      </Box>
    </SectionBox>
  );
}
