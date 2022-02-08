import BigNumber from "bignumber.js";

export function byDecimals(
  number: number | BigNumber | string,
  tokenDecimals = 18,
  decimalPlaces = 18
) {
  const decimals = new BigNumber(10).exponentiatedBy(tokenDecimals);
  return new BigNumber(number).dividedBy(decimals).decimalPlaces(decimalPlaces);
}

export function formatToFit(number: BigNumber) {
  if (number.isLessThan(new BigNumber(2))) {
    return number.decimalPlaces(12, BigNumber.ROUND_DOWN);
  } else if (number.isLessThan(new BigNumber(10000))) {
    return number.decimalPlaces(6, BigNumber.ROUND_DOWN);
  } else {
    return number.decimalPlaces(3, BigNumber.ROUND_DOWN);
  }
}

export function formatPrice(
  value: number | BigNumber | string,
  decimalPlaces = 8,
  showZero = false
) {
  const formatted = new BigNumber(value).decimalPlaces(
    decimalPlaces,
    BigNumber.ROUND_DOWN
  );
  if (!showZero && formatted.isZero()) {
    return "$-";
  }
  return `$${formatted.toFormat()}`;
}

export const INPUT_FORMAT = {
  groupSeparator: "",
  secondaryGroupSize: 0,
  decimalSeparator: ".",
};

export function convertAmountToRawNumber(
  value: number | BigNumber,
  decimals = 18
) {
  return new BigNumber(value)
    .times(new BigNumber("10").pow(decimals))
    .decimalPlaces(0, BigNumber.ROUND_DOWN)
    .toString(10);
}
