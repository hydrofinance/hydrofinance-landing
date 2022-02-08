import { BoxProps, Button, InputAdornment } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import Box from "@mui/system/Box";
import BigNumber from "bignumber.js";
import React from "react";
import { useTranslation } from "react-i18next";

const BootstrapInput = styled(OutlinedInput)(({ theme }) => ({
  backgroundColor: "#192232",
  "& fieldset": {
    borderWidth: 0,
  },
  "&:hover fieldset": {
    borderWidth: 1,
  },
}));

type Props = {
  value: string;
  decimals: number;
  maxValue?: BigNumber;
  fullWidth?: boolean;
  disabled?: boolean;
  onValueChange: (value: BigNumber, input: string) => void;
};

export default function AmountTextField(props: Props & BoxProps) {
  const {
    value,
    maxValue,
    decimals,
    fullWidth,
    disabled,
    onValueChange,
    ...other
  } = props;

  const { t } = useTranslation();

  const handleMax = () => maxValue && onValueChange(maxValue, value);

  const handleInputAmountChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const input = event.target.value
      .replace(/[,]+/, "")
      .replace(/[^0-9.]+/, "");
    let amount = new BigNumber(input);
    const total = maxValue || new BigNumber(0);
    if (amount.isNaN()) amount = new BigNumber(0);

    amount = amount.decimalPlaces(decimals);
    if (amount.isGreaterThan(total)) amount = total;

    onValueChange(amount, input);
  };

  return (
    <BootstrapInput
      {...(other as any)}
      value={value}
      fullWidth={fullWidth}
      onChange={handleInputAmountChange}
      endAdornment={
        <InputAdornment position="end">
          <Button
            variant="text"
            disabled={maxValue === undefined || maxValue.isZero() || disabled}
            sx={{ color: "#EE7180" }}
            onClick={handleMax}
          >
            {t("max")}
          </Button>
        </InputAdornment>
      }
      inputProps={{
        type: "number",
      }}
      disabled={disabled}
    />
  );
}
